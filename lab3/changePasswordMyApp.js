const request = require("request");

const options = {
    method: 'PATCH',
    url: 'https://dev-ciwhcmj0fbgydwdm.us.auth0.com/api/v2/users/auth0|nasa',
    headers: {
        'content-type': 'application/json',
        'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjJ1X1JEcVV6Y2RzSVhJRl9RRmdVOSJ9.eyJpc3MiOiJodHRwczovL2Rldi1jaXdoY21qMGZiZ3lkd2RtLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJLQU9USGJqaE9ENmhYSVhhcXVzbmxuOGZKbGhVNDFxSUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtY2l3aGNtajBmYmd5ZHdkbS51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY3MTMwMjk3NSwiZXhwIjoxNjcxMzg5Mzc1LCJhenAiOiJLQU9USGJqaE9ENmhYSVhhcXVzbmxuOGZKbGhVNDFxSSIsInNjb3BlIjoicmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.jZIikrYJYPjHmQBWbK_eaEnF4TT2tcmvdPmBVUXMnhgpTTrh6kPeNsfw7shianZ6Kuxfrbr-EFguMkhx8hKWu-FTYiwV_ipa_2aTz0eT9TMjIu5KmGzYFkEjRIR7CbltUB54AC1Q0_APIcRY6Ix_UwyT59rvujz6nZuVwKaqRas7d4SF1A4w6AdOOHl8qzVehY1LTHHU8Nz16sRSvZD26xJeo4MmQ3K4plPJtuzfPQGQjT0JK3XFGPqV8a3tlprmk8vrp-8Jeb0Y-DZUDV8qLfZ252rtDy4wX4JT2dYJ_RBsaBsW1OAgQAG2VTtMpNpJrx7B8nHGlHSaiLV3JDtQEw'
    },
    body: JSON.stringify({
        password: 'Anas2712',
        connection: 'Username-Password-Authentication'
    })
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});
