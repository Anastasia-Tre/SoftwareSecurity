var request = require("request");

var options = {
    method: 'PATCH',
    url: 'https://kpi.eu.auth0.com/api/v2/users/auth0|nasa',
    headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjVCZTlBZFhrMERaUjhmR1dZYjdkViJ9.eyJpc3MiOiJodHRwczovL2twaS5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8bmFzYSIsImF1ZCI6Imh0dHBzOi8va3BpLmV1LmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjcxMjg2ODgzLCJleHAiOjE2NzEzNzMyODMsImF6cCI6IkpJdkNPNWMySUJIbEFlMnBhdG42bDZxNUgzNXF4dGkwIiwic2NvcGUiOiJyZWFkOmN1cnJlbnRfdXNlciB1cGRhdGU6Y3VycmVudF91c2VyX21ldGFkYXRhIGRlbGV0ZTpjdXJyZW50X3VzZXJfbWV0YWRhdGEgY3JlYXRlOmN1cnJlbnRfdXNlcl9tZXRhZGF0YSBjcmVhdGU6Y3VycmVudF91c2VyX2RldmljZV9jcmVkZW50aWFscyBkZWxldGU6Y3VycmVudF91c2VyX2RldmljZV9jcmVkZW50aWFscyB1cGRhdGU6Y3VycmVudF91c2VyX2lkZW50aXRpZXMgb2ZmbGluZV9hY2Nlc3MiLCJndHkiOiJwYXNzd29yZCJ9.ojcqRgfYE8fcOqaeRzWNQACeQthLR6CHrZAjFvQQbKDKzbNE6-hlkzvA-V8Uuu0Q6cfNomxNq7idnO5trrOXdR6SZp4Rk1NOIn7ucfOblcCkqcqJWplfk0Kp6aimEQPc1JRWBHItJr6GnLy4A4XZajgu-YMlZ0XkgNBrgm0SJcNgUJDcaYX0OXRcmwndpKAKOWXEEYObsT0ZeLOo8P9JpQGr_hO1nJX7gUnOBehjVAqxQQBvEuVdzR4KgcqTNCq8slQeXMTGaYW8z-Y4UqNngsMaEfvE9JbJVGxYNaZ3AdEI_VuRRPVX7hlDRceuaWWka9OUKtCixU1k8KS14lXk6g'
    },
    form: {
        password: 'Anas271201',
        connection: 'Username-Password-Authentication'
    }
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});
