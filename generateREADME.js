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
        // if user doesn't exist return empty string
        .catch(error => "")
}

function createTableOfContents(answers, hasProfileInfo) {
    let tableStr = ``;
    const tableHeader = `\n\n<!-- omit in toc -->\n## Table of Contents`;

    if (answers.installation !== "") {
        tableStr += `\n- [Installation](#installation)`;
    }

    if (answers.usage !== "") {
        tableStr += `\n- [Usage](#usage)`;
    }

    if (answers.license !== "") {
        tableStr += `\n- [License](#license)`;
    }
    if (answers.contributing !== "") {
        tableStr += `\n- [Contributing](#contributing)`;
    }
    if (answers.tests !== "") {
        tableStr += `\n- [Tests](#tests)`;
    }
    if (hasProfileInfo) {
        tableStr += `\n- [Questions](#questions)`;
    }
    
    // if all fields are empty there is no table of contents else return table
    return tableStr !== `` ? tableHeader + tableStr : "";   
}

async function createMD(answers) {
    const profileInfo = await getUserInfo(answers.username);

    let readmeStr = `<!-- omit in toc -->\n# ${answers.title}\n![GitHub language count](https://img.shields.io/github/languages/count/${answers.username}/${answers.title})`;

    // if user entered a description section add to readme
    if (answers.description !== "") {
        readmeStr += `\n\n<!-- omit in toc -->\n## Description\n${answers.description}`;
    }

    // add table of contents to readme
    readmeStr += createTableOfContents(answers, profileInfo !== "");

    // if user entered an installation section add to readme
    if (answers.installation !== "") {
        readmeStr += `\n\n## Installation\n${answers.installation}`;
    }

    // if user entered a usage section add to readme
    if (answers.usage !== "") {
        readmeStr += `\n\n## Usage\n${answers.usage}`;
    }

    // if user entered a license section add to readme
    if (answers.license !== "") {
        readmeStr += `\n\n## License\n${answers.license}`;
    }

    // if user entered a contributing section add to readme
    if (answers.contributing !== "") {
        readmeStr += `\n\n## Contributing\n${answers.contributing}`;
    }

    // if user entered a tests section add to readme
    if (answers.tests !== "") {
        readmeStr += `\n\n## Tests\n${answers.tests}`;
    }

    // if user entered a valid github username add questions section to readme
    if (profileInfo !== "") {
        readmeStr += `\n\n## Questions\n![${answers.username} profile pic](${profileInfo[1]})\n\nEmail: ${profileInfo[0]}`;
    }

    return readmeStr;
}

module.exports = {
    createMD
}