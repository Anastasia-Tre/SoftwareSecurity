require('dotenv').config();

const tokenOptions = () => ({
    method: 'POST',
    url: `${process.env.MY_URL}/oauth/token`,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form:
    {
        client_id: process.env.MY_CLIENT_ID,
        client_secret: process.env.MY_CLIENT_SECRET,
        audience: `${process.env.MY_URL}/api/v2/`,
        grant_type: 'client_credentials'
    }
});

const createUserOptions = (token, name, familyname, login, password) => ({
    method: 'POST',
    url: `${process.env.MY_URL}/api/v2/users`,
    headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
        "email": login,
        "user_metadata": {},
        "blocked": false,
        "email_verified": false,
        "app_metadata": {},
        "given_name": name,
        "family_name": familyname,
        "name": `${name} ${familyname}`,
        "nickname": name,
        "picture": "https://secure.gravatar.com/avatar/15626c5e0c749cb912f9d1ad48dba440?s=480&r=pg&d=https%3A%2F%2Fssl.gstatic.com%2Fs2%2Fprofiles%2Fimages%2Fsilhouette80.png",
        "user_id": login,
        "connection": "Username-Password-Authentication",
        "password": password,
        "verify_email": false
    })
});

const userTokenOptions = (username, password) => ({
    method: 'POST',
    url: `${process.env.MY_URL}/oauth/token`,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
        grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
        username: username,
        password: password,
        audience: `${process.env.MY_URL}/api/v2/`,
        scope: 'offline_access',
        realm: 'Username-Password-Authentication',
        client_id: process.env.MY_CLIENT_ID,
        client_secret: process.env.MY_CLIENT_SECRET
    })
});

const refreshTokenOptions = (refresh_token) => ({
    method: 'POST',
    url: `${process.env.MY_URL}/oauth/token`,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form:
    {
        grant_type: 'refresh_token',
        client_id: process.env.MY_CLIENT_ID,
        client_secret: process.env.MY_CLIENT_SECRET,
        refresh_token: refresh_token
    }
});

const userTokenByCodeOptions = (code) => ({
    method: 'POST',
    url: `${process.env.MY_URL}/oauth/token`,
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    form: {
        grant_type: 'authorization_code',
        code: code,
        audience: `${process.env.MY_URL}/api/v2/`,
        scope: 'offline_access',
        client_id: process.env.MY_CLIENT_ID,
        client_secret: process.env.MY_CLIENT_SECRET,
        redirect_uri: 'http://localhost:3000/'
    }
});

module.exports = {
    tokenOptions,
    userTokenByCodeOptions,
    createUserOptions,
    userTokenOptions,
    refreshTokenOptions
}
