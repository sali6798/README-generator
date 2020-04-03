# README-generator

## Description
Generate a README.md file without needing to know anything about Markdown syntax. All that has to be done is to run the application using Node.js, answer the prompts given and voila a README.md has been created. The README sections includes Project Title, Description, Table of Contents, Installation (how to install project), Usage (how to use the project), License, Contributing (how other developers can contribute to the project), Tests (how to run tests) and Questions (which displays the user's Github profile pic and public email). The user will first be prompted for their GitHub username to gather their profile picture and public email, then be prompted to give an answer for the sections mentioned before. A user is not required to provide an answer for all of these sections if they do not feel it is necessary, they can just press enter to move onto the next prompt. If an answer is not provided for a prompt, that section will not be included in the README. If an invalid GitHub username is provided, the questions section will not be included. The README also includes a badge at the top that displays how many languages are used in the project. If a valid GitHub username is given it will display for example: languages 3. If username is invalid, the badge will display some sort of error message.

## Installation
Node.js is required to run this application. 

1. Check if Node.js is installed by entering `node --version` into the command line. If it is installed, a version number should be displayed. 
   - If not, it can be [downloaded from their website](https://nodejs.org/en/download/), then check if it was installed properly by performing `node --version`
2. Clone this repo into desired destination
3. Change into directory of cloned repo in the command line
4. Run `npm install` in the command line to install all dependencies
5. Create own GitHub personal access token
   1. Login into GitHub in your browser
   2. click profile picture in upper right corner
   3. click on 'Settings'
   ![GitHub screenshot for step 3](assets/Step&#32;3.png)

   4. click 'Developer settings' on the left at the bottom
   ![GitHub screenshot for step 4](assets/Step&#32;4.png)

   5. click 'Personal access tokens' on the left
   6. click 'Generate new token' button
   ![GitHub screenshot for steps 5 and 6](assets/Step&#32;5+6.png)

   7. provide token description
   ![GitHub screenshot for step 7](assets/Step&#32;7.png)

   8. scroll down the page and select read:user and user:email options
   9.  scroll down the page and click 'Generate token' button
   ![GitHub screenshot for steps 8 and 9](assets/Step&#32;8+9.png)

   10.  Copy token by clicking the clipboard icon or any other way you can copy
   ![GitHub screenshot for step 10](assets/Step&#32;10.png)

6. Open `.env` file and replace the _REPLACE_WITH_TOKEN_ placeholder with the token just created above
   
![Screenshot of .env file](assets/env&#32;file.png)

  > If you clone this repo and push your own version on your git remember not to push your `.env` file, add `.env` to `.gitignore` to be safe!

7. Run application by entering `node index.js` in the command line

## Usage
Run the app and answer the prompts. If the prompt is for a section not wanted/needed just press enter to move on to the next prompt. A success message will be displayed when the README.md file has been created.





