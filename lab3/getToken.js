const request = require("request");

const options = {
    method: 'POST',
    url: 'https://dev-ciwhcmj0fbgydwdm.us.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
        grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
        username: 'anastasiia1@gmail.com',
        password: 'Anas27121',
        audience: 'https://dev-ciwhcmj0fbgydwdm.us.auth0.com/api/v2/',
        scope: 'offline_access',
        realm: 'Username-Password-Authentication',
        client_id: 'KAOTHbjhOD6hXIXaqusnln8fJlhU41qI',
        client_secret: 'tw_ASUxC3TGAkTyn0nltRTBoeE5h2R4_WSCe4WI3kgAE6APrGVd2mFQw47RjsNKK'
    })
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});
