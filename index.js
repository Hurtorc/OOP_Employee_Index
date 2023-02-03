const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const fs = require("fs");
const internal = require("stream");
const Employee = require("./lib/Employee");

const employees = [];
//TODO - write your inquirer app here to gather information about the team members, and generate the HTML file using fs

function newEmployee() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "position",
        message: "What is the position of this employee?",
        choices: ["Manager", "Engineer", "Intern"],
      },
      {
        type: "input",
        name: "name",
        message: "What is the name of this employee?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the email of this employee?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the id of this employee?",
      },
    ])
    .then(({ position, email, id, name }) => {
      switch (position) {
        case "Manager": //TODO - add office number
          inquirer.prompt([
            {
              type: "input",
              name: "officeNumber",
              message: "What is the office number of this employee?",
            },
          ]);
          t.then(({ officeNumber }) => {
            employees.push(new Manager(name, id, email, officeNumber));
          });

        case "Intern": //TODO - add school
          inquirer
            .prompt([
              {
                type: "input",
                name: "school",
                message: "What is the school of this employee?",
              },
            ])
            .then(({ school }) => {
              employees.push(new Intern(name, id, email, school));
            });

        case "Engineer": //TODO - add github username
          inquirer
            .prompt([
              {
                type: "input",
                name: "github",
                message: "What is the Github Usename of this employee?",
              },
            ])
            .then(({ github }) => {
              employees.push(new Engineer(name, id, email, github));
            });

        default: //TODO - add default
      }
      addEmployee();
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "addEmployee",
        message: "Would you like to add another employee?",
      },
    ])
    .then(({ addEmployee }) => {
      if (addEmployee) {
        newEmployee();
      } else {
        renderHTMLFile();
      }
    });
}

function renderHTMLFile() {
  fs.writeFile(
    `./index.html`,
    /*html*/ `
    <ul>
      ${employees.map(
        (employee) => /*html*/ `
        <li>
          <div>
            <h2>${employee.getName()}</h2>
            <p>${employee.getEmail()}</p>
            <p>${employee.getId()}</p>
            <p>${employee.getRole()}</p>
          </div>
        </li>
      `
      )}
    </ul>
  `
  );
}

//addEmployee();

newEmployee();
