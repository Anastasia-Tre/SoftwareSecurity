const request = require("request");

const options = {
    method: 'POST',
    url: 'https://dev-ciwhcmj0fbgydwdm.us.auth0.com/api/v2/users',
    headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjJ1X1JEcVV6Y2RzSVhJRl9RRmdVOSJ9.eyJpc3MiOiJodHRwczovL2Rldi1jaXdoY21qMGZiZ3lkd2RtLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJLQU9USGJqaE9ENmhYSVhhcXVzbmxuOGZKbGhVNDFxSUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtY2l3aGNtajBmYmd5ZHdkbS51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY3MDg4NDc4MiwiZXhwIjoxNjcwOTcxMTgyLCJhenAiOiJLQU9USGJqaE9ENmhYSVhhcXVzbmxuOGZKbGhVNDFxSSIsInNjb3BlIjoicmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgY3JlYXRlOnVzZXJzIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.pcotuODJ7JlNTHI375HrpAEpQjpqpszJof3Prayf-S1HBOkJHJ7tj-ELIcAM9tRQzNBe8MOhphmY_8kdiWiYx4Kwf9SihMRq6QoHaVyIFcxHBQIqEH4QmcDRaFjyPQ_Za16WPMYoL6B4ILp6pUzdb2ntGmuC_rPrfELOFk-VoNldpcg8MKQn63tnGiUypttiJSV75KmqdHY5Q55-pvK4pVD6J4TeZdt4aG0EFbGdgK5jZF0CmvIU_C82LofulVkFw9_sythKjOxvrmoyt-QqV-qcV7RTd6dxqbshTldbJUCr3vcmTqTFDvmMYPByb-LfQk09iaujECxAmFpcPsbzwg'
    },
    body: JSON.stringify({
        "email": "anastasiia1@gmail.com",
        "user_metadata": {},
        "blocked": false,
        "email_verified": false,
        "app_metadata": {},
        "given_name": "Anastasiia1",
        "family_name": "1",
        "name": "Anastasiia 11",
        "nickname": "NASA",
        "picture": "https://secure.gravatar.com/avatar/15626c5e0c749cb912f9d1ad48dba440?s=480&r=pg&d=https%3A%2F%2Fssl.gstatic.com%2Fs2%2Fprofiles%2Fimages%2Fsilhouette80.png",
        "user_id": "nasa",
        "connection": "Username-Password-Authentication",
        "password": "Anas2712",
        "verify_email": false
    })
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});

