const jwt = require("jsonwebtoken");
const users = require('./usersData.json').users;
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.get(process.env.SESSION_KEY);

    let data;
    try {
        data = jwt.verify(token, process.env.TOKEN_KEY);
    } catch (e) { }

    if (data) {
        const user = users.find(u => u.login == data.login);
        if (user) {
            req.username = user.username;
            req.sessionId = token;
        }
    }

    next();
};

module.exports = verifyToken;
