const request = require("request");

const options = {
    method: 'POST',
    url: 'https://kpi.eu.auth0.com/oauth/token',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form:
    {
        grant_type: 'refresh_token',
        client_id: 'JIvCO5c2IBHlAe2patn6l6q5H35qxti0',
        client_secret: 'ZRF8Op0tWM36p1_hxXTU-B0K_Gq_-eAVtlrQpY24CasYiDmcXBhNS6IJMNcz1EgB',
        refresh_token: 'kKztAEzvxtHtnlAoFlbExEYhz2uL5KVgRq20NOkPv3mxp'
    }
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});
