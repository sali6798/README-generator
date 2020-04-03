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

    const keys = Object.keys(answers);
    // loops through all the keys
    for (let i = 3; i < keys.length; i++) {
        // checks if the user provided a response
        if (answers[keys[i]] !== "") {
            // makes the key start with a capital letter
            const capitalizedKey = keys[i][0].toUpperCase() + keys[i].substring(1)
            // adds section to table of content
            tableStr += `\n- [${capitalizedKey}](#${keys[i]})`;
            // adds section to README
            readmeStrBody += `\n\n## ${capitalizedKey}\n${answers[keys[i]]}`;
        }
    }

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