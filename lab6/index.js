const express = require('express');
const onFinished = require('on-finished');
const bodyParser = require('body-parser');
const path = require('path');
const requestCallback = require("request");
const { promisify } = require('util');
const request = promisify(requestCallback);
const httpConstants = require('http-constants');
const jwt = require("jsonwebtoken");

const { createUserOptions, tokenOptions, refreshTokenOptions, 
    userTokenOptions, userTokenByCodeOptions, userOptions } = require('./requests');
const { jwtCheck, isTokenExpired } = require('./utils');

const fs = require('fs');
const set_token_response_template = fs.readFileSync('./response.html', 'utf8');
const set_token_response = (session) => set_token_response_template.replace('REPLACE_SESSION', session);


const port = process.env.PORT;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Session = require('./Session');
const sessions = new Session();

app.use(async (req, res, next) => {
    let currentSession = {};
    let sessionId = req.get(process.env.SESSION_KEY);
    if (sessionId) {
        currentSession = sessions.get(sessionId);
        if (!currentSession) {
            currentSession = {};
            sessionId = sessions.init(res);
        } else if (currentSession.username &&
            isTokenExpired(currentSession.accessToken)) {
            const response = await request(refreshTokenOptions(currentSession.refreshToken));

            if (response.statusCode != httpConstants.codes.OK) {
                console.log(`Could not refresh token: ${currentSession.refreshToken}`);
            }
            else {
                currentSession.accessToken = JSON.parse(response.body).access_token
                console.log(`New Token: ${currentSession.accessToken}`);
            }
        }
        
    } else {
        sessionId = sessions.init(res);
    }

    req.session = currentSession;
    req.sessionId = sessionId;
    onFinished(req, () => {
        const currentSession = req.session;
        const sessionId = req.sessionId;
        sessions.set(sessionId, currentSession);
    });
    next();
});

app.get('/', async (req, res) => {
    if (req.session.username) {
        return res.json({
            username: req.session.username,
            logout: 'http://localhost:3000/logout'
        })
    } else if (req.query.code) {
		try {
			const response = await request(userTokenByCodeOptions(req.query.code));
            const { access_token, refresh_token, expires_in } = JSON.parse(response.body);
            
            console.log({ access_token, refresh_token, expires_in });

            const payload = jwt.decode(access_token);
			const user_id = payload.sub;
            const tokenResponse = await request(tokenOptions());
            const appToken = JSON.parse(tokenResponse.body).access_token;
            const userResponse = await request(userOptions(appToken, user_id));
            const { nickname } = JSON.parse(userResponse.body);
            console.log(nickname);

			if (access_token) {
				const data = { accessToken: access_token, username: nickname };
				return res.send(set_token_response(JSON.stringify(data)));
			}
		} catch (e) {
			console.log(e);
		}
		return res.status(401).send();
	}
    else {
        res.sendFile(path.join(__dirname, '/index.html'));
    }
})

app.get('/logout', (req, res) => {
    sessions.destroy(req, res);
    res.redirect('/');
});

app.post('/api/login', async (req, res) => {
    const { login, password } = req.body;

    const response = await request(userTokenOptions(login, password));
    if (response.statusCode == httpConstants.codes.OK) {
        const auth = JSON.parse(response.body);
        req.session.username = login;
        req.session.accessToken = auth.access_token;
        req.session.refreshToken = auth.refresh_token;

        console.log(`User ${login} login`)
        console.log(`Access Token: ${auth.access_token}`);
        console.log(`Token expire in: ${auth.expires_in}`)
        console.log(`Refresh Token: ${auth.refresh_token}`);

        res.json({ 
            accessToken: auth.access_token,
            refreshToken: auth.refresh_token,
            token: req.sessionId
        });
    } else {
        const error = JSON.parse(response.body);;
        console.log(`Login failed: ${error}`);
        res.status(401).send(error);
    }
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/register.html'));
});

app.post("/api/register", async (req, res) => {
    const { name, familyname, login, password } = req.body;
    
    const tokenResponse = await request(tokenOptions());
    const accessToken = JSON.parse(tokenResponse.body).access_token;
    console.log(`App Token: ${accessToken}`);

    const response = await request(createUserOptions(accessToken, name, familyname, login, password));
    if (response.statusCode == httpConstants.codes.CREATED) {
        console.log(`User ${login} registered`);
        req.session.username = login;
        res.json({ redirect: '/' });
    }
    else {
        const error = JSON.parse(response.body);;
        console.log(`Register failed: ${error}`);
        res.status(401).send(error);
    }
});

app.get('/secret', jwtCheck, (req, res) => {
    console.log(`It is a secret page`);
    res.send(`It is very secret page!!!`);
});

app.get('/login-idp', (req, res) => {
	res.redirect(
		`${process.env.MY_URL}/authorize?`+
		`audience=${process.env.MY_URL}/api/v2/&`+
		`scope=offline_access&`+
		`response_type=code&`+
		`client_id=${process.env.MY_CLIENT_ID}&`+
		`redirect_uri=http://localhost:3000/&`+
		`response_mode=query`
	);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

