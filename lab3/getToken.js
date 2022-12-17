const request = require("request");

const options = {
    method: 'POST',
    url: 'https://kpi.eu.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
        grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
        username: 'anastasiia.trembach@gmail.com',
        password: 'Anas2712',
        audience: 'https://kpi.eu.auth0.com/api/v2/',
        scope: 'offline_access',
        realm: 'Username-Password-Authentication',
        client_id: 'JIvCO5c2IBHlAe2patn6l6q5H35qxti0',
        client_secret: 'ZRF8Op0tWM36p1_hxXTU-B0K_Gq_-eAVtlrQpY24CasYiDmcXBhNS6IJMNcz1EgB'
    })
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});
