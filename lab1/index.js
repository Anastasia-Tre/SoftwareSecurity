const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const auth = require('./auth');
require('dotenv').config();

const port = process.env.PORT;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const users = require('./usersData.json').users;

app.use(auth);

app.get('/', (req, res) => {
    if (req.username) {
        return res.json({
            username: req.username,
            logout: 'http://localhost:3000/logout',
        });
    }
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/logout', (req, res) => {
    res.redirect('/');
});

app.post('/api/login', (req, res) => {
    const { login, password } = req.body;

    const user = users.find(user => {
        if (user.login == login && user.password == password) {
            return true;
        }
        return false;
    });

    if (user) {
        const token = jwt.sign(
            { login: user.login },
            process.env.TOKEN_KEY,
            { expiresIn: "5m" });
        console.log(`Token: ${token}`);

        res.username = user.username;
        res.login = user.login;
        res.json({ token });
    }

    res.status(401).send();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});