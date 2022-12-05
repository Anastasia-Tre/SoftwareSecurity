const jwt = require("jsonwebtoken");
require('dotenv').config();

const verifyToken = (req, res, next) => {

    const token = req.get('Authorization'); //replace to env
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);

        const user = users.find(user => {
            if (user.login == decoded.login) return true;
            return false;
        });

        req.user = user;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};



module.exports = verifyToken;
