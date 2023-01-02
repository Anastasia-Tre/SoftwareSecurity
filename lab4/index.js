const express = require('express');
const onFinished = require('on-finished');
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require("jsonwebtoken");
const requestCallback = require("request");
const { promisify } = require('util');
const request = promisify(requestCallback);
const httpConstants = require('http-constants');

const { createUserOptions, tokenOptions, refreshTokenOptions, userTokenOptions } = require('./requests');

const port = process.env.PORT;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Session = require('./Session');
const sessions = new Session();

const isTokenExpired = (token, delay = 86400 - 5) => {
    const { exp } = jwt.decode(token);
    const now = Math.floor(Date.now() / 1e3);
    return exp - now < delay;
}

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

app.get('/', (req, res) => {
    if (req.session.username) {
        return res.json({
            username: req.session.username,
            logout: 'http://localhost:3000/logout'
        })
    }
    res.sendFile(path.join(__dirname, '/index.html'));
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

        res.json({ token: req.sessionId });
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

