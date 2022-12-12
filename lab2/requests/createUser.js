const request = require("request");

const options = {
    method: 'POST',
    url: 'https://kpi.eu.auth0.com/api/v2/users',
    headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjVCZTlBZFhrMERaUjhmR1dZYjdkViJ9.eyJpc3MiOiJodHRwczovL2twaS5ldS5hdXRoMC5jb20vIiwic3ViIjoiSkl2Q081YzJJQkhsQWUycGF0bjZsNnE1SDM1cXh0aTBAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8va3BpLmV1LmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjcwODgyMDk2LCJleHAiOjE2NzA5Njg0OTYsImF6cCI6IkpJdkNPNWMySUJIbEFlMnBhdG42bDZxNUgzNXF4dGkwIiwic2NvcGUiOiJyZWFkOnVzZXJzIGNyZWF0ZTp1c2VycyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.avE50Y35HTK2XNEHgbfRw_isDwz4L4TVSxoGVzWF2zoEPkqqcrcJ8U8N7IsNIqGIQe-i8tbbIQ1T-xK2sE6BS386bwfcE1ghAQVvJelkLKA9KnZ50NGq8eNXXUWb6vig52oYePArTlQTOkTxdO0NOz1uX3XE_kC-GlCbggRz61P3iECK8v4sUyQBHr0BfrAVUSPSgVmbPcld0i4lLGONpgZsG4TTwdzKg6BXRwnTO35jEO0nP2ZjVyOCZ4Ces2ex4-Ly6asGQpqPIETN14qUXWuNcCRe1VnDywH7YhycaU5WpOh8HKXlZTb8dOsNSYclTqxHBsAnPDvyTai_x_fMPw'
    },
    body: JSON.stringify({
        "email": "anastasiia.trembach@gmail.com",
        "user_metadata": {},
        "blocked": false,
        "email_verified": false,
        "app_metadata": {},
        "given_name": "Anastasiia",
        "family_name": "Trembach",
        "name": "Anastasiia Trembach",
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

