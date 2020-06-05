const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// const questions =

let profile = []

function managerQuestions() {

    inquirer
        .prompt([

            {
                type: "input",
                message: "What is your role?",
                name: "role"
            },

            {
                type: "input",
                message: "What is your name?",
                name: "name"
            },

            {
                type: "input",
                message: "What is your office number?",
                name: "officeNumber"
            },

            {
                type: "input",
                message: "What is your email address??",
                name: "email"
            },

            {
                type: "list",
                message: `Would you like to add another team member?`,
                name: "addTeam",
                choices: [
                    "Yes",
                    "No"
                ]
            },

        ]).then(function (data) {
            let manager = new Manager(data.role, data.name, data.email, data.officeNumber);
            switch (data.addTeam) {
                case "Yes":
                    employeeRole();
                    profile.push(manager);
                    break;
                case "No":
                    console.log("Ok thanks");
                    console.log(profile);
                    
            }
            
        })
};

function addAnotherTeamMember () {
    inquirer
        .prompt([

            {
                type: "list",
                message: `Would you like to add another team member?`,
                name: "addTeam",
                choices: [
                    "Yes",
                    "No"
                ]
            }, 
        ]).then(function (data) {
            console.log(data.addTeam);
            switch (data.addTeam) {
                case "Yes":
                    employeeRole();
                    break;
                case "No":
                    generateHtml();
                    console.log("Ok thanks")
            }
        })
}

function employeeRole() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What's your employees role?",
                name: "role",
                choices: [
                    "Engineer",
                    "Intern",
                    "None"
                ],

            },
        ]).then(function (data) {
            addEmployee = true;
            switch (data.role) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                case "None":
                    generateHtml();
                    console.log("Ok thanks")
            }
            console.log(data);
        })
}

function addEngineer() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your employees name?",
                name: "name"
            },

            {
                type: "input",
                message: "What is your employees ID number?",
                name: "employeeId"
            },

            {
                type: "input",
                message: "What is your employees email address??",
                name: "email"
            },

            {
                type: "input",
                message: "What is your employees GitHub?",
                name: "GitHub"
            },
        ])
        .then(function (data) {
            let engineer = new Engineer (data.name, data.employeeId, data.email, data.GitHub);
            profile.push(engineer);
            console.log("software engineers are cool");
            console.log(engineer);
            addAnotherTeamMember();
            
        })
}

function addIntern() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your interns name?",
                name: "name"
            },

            {
                type: "input",
                message: "What is your interns ID number?",
                name: "employeeId"
            },

            {
                type: "input",
                message: "What is your interns email address??",
                name: "email"
            },

            {
                type: "input",
                message: "Where did your intern go to school?",
                name: "school"
            }
        ])
        .then(function (data) {
            let intern = new Intern (data.name, data.employeeId, data.email, data.school);
            profile.push(intern);
            console.log("cool you have an intern");
            console.log(intern);
            addAnotherTeamMember();
        })
}

function generateHtml(){
    fs.writeFileSync(outputPath, render(profile), "utf-8")
}

managerQuestions();



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
