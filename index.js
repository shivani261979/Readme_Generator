const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

const axios = require("axios");

require("dotenv").config();   // loads key/values from .env into process.env

const markdownModule = require("./markdownModule");

const questions = [
    {
        type: "input",
        name: "github_username",
        message: "What is your GitHub username?"
    },
    {
        type: "input",
        name: "project_title",
        message: "What is your project's title?"
    },
    {
        type: "input",
        name: "project_description",
        message: "Briefly describe your project?"
    },
    {
        type: "input",
        name: "installation",
        message: "How to install project and dependencies?",
        default: "npm install"
    },
    {
        type: "input",
        name: "usage",
        message: "How to use this project?",
    },
    {
        type: "list",
        name: "project_license",
        message: "What kind of license applies to your project?",
        choices: [  "MIT", 
                    "LGPL",
                    "GPL", 
                    "BSD 3", 
                    "BSD 2", 
                    "APACHE 2.0", 
                    "None"
                ]
    },
    {
        type: "input",
        name: "tests",
        message: "How to test?"
    },
    {
        type: "input",
        name: "contributing",
        message: "How can users contribute to this project?",
    }
];


function getUser(username) {

    const myUsername = process.env.CLIENT_ID;
    const myPassword = process.env.CLIENT_SECRET;

    const url = "https://api.github.com/users/" + username + "?client_id=" + myUsername + "&client_secret=" + myPassword;

    return axios
        .get( url )
        .catch(err => {
        console.log("User not found");
        process.exit(1);
        });
}



function writeToFile(fileName, data) {

    const fileWithPath = path.join(process.cwd(), fileName);
    return fs.writeFileSync(fileWithPath, data);
}

function mainApp() {

    console.log("Tell us about your Project (Guided):");

    inquirer.prompt(questions).then((inquirerResponses) => {

        console.log("Creating Readme.md...");

        getUser(inquirerResponses.github_username)
        .then(({ data }) => {

            writeToFile("README.md", markdownModule.generateMarkdown({ ...inquirerResponses, ...data }));
        })

    })
}

mainApp();