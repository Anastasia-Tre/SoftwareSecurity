const request = require("request");

const options = {
  method: 'POST',
  url: 'https://dev-ciwhcmj0fbgydwdm.us.auth0.com/oauth/token',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  form:
  {
    client_id: 'KAOTHbjhOD6hXIXaqusnln8fJlhU41qI',
    client_secret: 'tw_ASUxC3TGAkTyn0nltRTBoeE5h2R4_WSCe4WI3kgAE6APrGVd2mFQw47RjsNKK',
    audience: 'https://dev-ciwhcmj0fbgydwdm.us.auth0.com/api/v2/',
    grant_type: 'client_credentials'
  }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
