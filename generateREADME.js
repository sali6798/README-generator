const axios = require("axios");
require("dotenv").config();
const config = { headers: { accept: "application/json", authorization: "token " + process.env.AUTH_TOKEN }};

function getUserInfo(username) {
    return axios
        // API call to github API using user's name
        .get(`https://api.github.com/users/${username}`, config)
        .then(response => {
            // get email and profile picture
            email = response.data.email;
            profile = response.data.avatar_url;
            return [email, profile];
        })
        // if user doesn't exist return empty string
        .catch(error => "")
}

async function createMD(answers) {
    const profileInfo = await getUserInfo(answers.username);
    let readmeStrBody = ``;
    let readmeStrHeader = `<!-- omit in toc -->\n# ${answers.title}\n![GitHub language count](https://img.shields.io/github/languages/count/${answers.username}/${answers.title})`;
    let tableStr = ``;
    const tableHeader = `\n\n<!-- omit in toc -->\n## Table of Contents`;

    // if user entered a description section add to readme
    if (answers.description !== "") {
        readmeStrHeader += `\n\n<!-- omit in toc -->\n## Description\n${answers.description}`;
    }

    // if user entered an installation section add to readme
    if (answers.installation !== "") {
        tableStr += `\n- [Installation](#installation)`;
        readmeStrBody += `\n\n## Installation\n${answers.installation}`;
    }

    // if user entered a usage section add to readme
    if (answers.usage !== "") {
        tableStr += `\n- [Usage](#usage)`;
        readmeStrBody += `\n\n## Usage\n${answers.usage}`;
    }

    // if user entered a license section add to readme
    if (answers.license !== "") {
        tableStr += `\n- [License](#license)`;
        readmeStrBody += `\n\n## License\n${answers.license}`;
    }

    // if user entered a contributing section add to readme
    if (answers.contributing !== "") {
        tableStr += `\n- [Contributing](#contributing)`;
        readmeStrBody += `\n\n## Contributing\n${answers.contributing}`;
    }

    // if user entered a tests section add to readme
    if (answers.tests !== "") {
        tableStr += `\n- [Tests](#tests)`;
        readmeStrBody += `\n\n## Tests\n${answers.tests}`;
    }

    // if user entered a valid github username add questions section to readme
    if (profileInfo !== "") {
        tableStr += `\n- [Questions](#questions)`;
        readmeStrBody += `\n\n## Questions\n![${answers.username} profile pic](${profileInfo[1]})\n\nEmail: ${profileInfo[0]}`;
    }

    // if no answers to any of the sections there is no table of contents
    const toc = tableStr !== `` ? tableHeader + tableStr : "";

    return readmeStrHeader + toc + readmeStrBody;
}

module.exports = {
    createMD
}