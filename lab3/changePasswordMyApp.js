const request = require("request");

const options = {
    method: 'PATCH',
    url: 'https://dev-ciwhcmj0fbgydwdm.us.auth0.com/api/v2/users/auth0|nasa',
    headers: {
        'content-type': 'application/json',
        'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjJ1X1JEcVV6Y2RzSVhJRl9RRmdVOSJ9.eyJpc3MiOiJodHRwczovL2Rldi1jaXdoY21qMGZiZ3lkd2RtLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJLQU9USGJqaE9ENmhYSVhhcXVzbmxuOGZKbGhVNDFxSUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtY2l3aGNtajBmYmd5ZHdkbS51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY3MjQxNDAxMywiZXhwIjoxNjcyNTAwNDEzLCJhenAiOiJLQU9USGJqaE9ENmhYSVhhcXVzbmxuOGZKbGhVNDFxSSIsInNjb3BlIjoicmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.JygXOcQQMTA7rsJxQgL-xmI0WKCkz6iwib4JwjW_OCTAfu87vjln5FXNqV6sgOLk5LbtEkTgvPCXvbPzvMPvrSNuhK1atGzGJunES4aKKyNTAjcJY4VZPQl9_YqaDotBYelbX70mCLwGpmM-uk297gwYAmagwuUsFOfFymQYH_b0hMyycDbzD6DIThoyq28XvEo3kIe28lCr9GV4UYXW1EuhE8zx0S0h3TGl47nZ0ZVaO8eiI9BAoE4QmxyH9Ms18eraM_Cjlhhok5n1w8oI9V8AAx7zsjfMlOm-nKncYg1Civdw1BRkC8QxuWJCpDoGx-cV8flq7o6k6XXqSEFTUw'
    },
    body: JSON.stringify({
        password: 'Anas27121',
        connection: 'Username-Password-Authentication'
    })
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});
