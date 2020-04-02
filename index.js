const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const generateREADME = require("./generateREADME.js");
const writeFileAsync = util.promisify(fs.writeFile);

// ask user questions about project
function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            message: "Enter your GitHub username:",
            name: "username"
        },
        {
            type: "input",
            message: "Project title:",
            name: "title"
        },
        {
            type: "input",
            message: "Description:",
            name: "description"
        },
        {
            type: "input",
            message: "Installation:",
            name: "installation"
        },
        {
            type: "input",
            message: "Usage:",
            name: "usage"
        },
        {
            type: "input",
            message: "License:",
            name: "license"
        },
        {
            type: "input",
            message: "Contributing:",
            name: "contributing"
        },
        {
            type: "input",
            message: "Tests:",
            name: "tests"
        },
    ])
}

promptUser()
    // create md file with user's answers
    .then(answers => generateREADME.makeREADME(answers))
    // write returned md string to file
    .then(readmeStr => writeFileAsync("README.md", readmeStr))
    .catch(error => console.log(error));

