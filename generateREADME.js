const axios = require("axios");
const config = { headers: { accept: "application/json" } };

function getUserInfo(username) {
    return axios
        // API call to github API using user's name
        .get(`https://api.github.com/users/${username}/events/public`, config)
        .then(response => {
            // get email and profile picture
            email = response.data[0].payload.commits[0].author.email;
            profile = response.data[0].actor.avatar_url;
            return [email, profile];
        })
}

const makeREADME = answers => {
    return getUserInfo(answers.username)
        .then(arr => { 
            // create readme content using user's answers
            return `
<!-- omit in toc -->
# ${answers.title}

![GitHub language count](https://img.shields.io/github/languages/count/${answers.username}/${answers.title})

<!-- omit in toc -->
## Description
${answers.description}

<!-- omit in toc -->
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
${answers.license}

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
![${answers.username} profile pic](${arr[1]})

Email: ${arr[0]}`});     
}

module.exports = {
    makeREADME
}