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
            message: "Enter the Project title:",
            name: "title"
        },
        {
            type: "input",
            message: "Enter a Description of the project:",
            name: "description"
        },
        {
            type: "input",
            message: "Enter step-by-step guide for Installation of project (if needed):",
            name: "installation"
        },
        {
            type: "input",
            message: "Enter info for Usage of project (if needed):",
            name: "usage"
        },
        {
            type: "input",
            message: "Enter License (if any):",
            name: "license"
        },
        {
            type: "input",
            message: "Enter info for others Contributing to project (if applicable):",
            name: "contributing"
        },
        {
            type: "input",
            message: "Enter info on how to run Tests (if any):",
            name: "tests"
        },
    ])
}

promptUser()
    // create md file with user's answers
    .then(answers => generateREADME.createMD(answers))
    // write returned md string to file
    .then(readmeStr => writeFileAsync("README.md", readmeStr))
    // print statement when file successfully created
    .then(() => console.log("README.md created!"))
    .catch(error => console.log(error));

