require('dotenv').config();
const jwt = require("jsonwebtoken");
const requestCallback = require("request");
const { promisify } = require('util');
const request = promisify(requestCallback);

const isTokenExpired = (token, delay = 100) => {
    const { exp } = jwt.decode(token);
    const now = Math.floor(Date.now() / 1e3);
    return exp - now < delay;
}

const jwtCheck = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer')) {
        res.send("Unauthorized");
    }

    const accessToken = authorization.split(' ')[1];
    const payload = await verifyToken(accessToken);
    if (payload == null) {
        res.send("Unauthorized");
    }
    else {
        req.payload = payload;
        next();
    }
}

const getPublicKey = async () => {
    const response = await request(`${process.env.MY_URL}/pem`)
    return response.body;
}

const verifyToken = async (accessToken) => {
    const publicKey = await getPublicKey();
    try {
        return jwt.verify(accessToken, publicKey, {
            audience: `${process.env.MY_URL}/api/v2/`,
            issuer: `${process.env.MY_URL}/`,
            algorithms: ['RS256']
        });
    } catch (err) {
        return null;
    }
}

module.exports = {
    jwtCheck,
    isTokenExpired
};
