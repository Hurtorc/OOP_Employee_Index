const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const fs = require("fs");

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
    .then(({ position, name, email, id }) => {
      switch (position) {
        case "Manager": //TODO - add office number
          inquirer
            .prompt([
              {
                type: "input",
                name: "officeNumber",
                message: "What is the office number of this employee?",
              },
            ])
            .then(({ officeNumber }) => {
              employees.push(new Manager(name, email, id, officeNumber));
              addEmployee();
            });
          break;
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
              employees.push(new Intern(name, email, id, school));
              addEmployee();
            });
          break;
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
              employees.push(new Engineer(name, email, id, github));
              addEmployee();
            });
          break;
        default: //TODO - add default
      }
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
  function renderHTMLFile() {
    fs.writeFileSync(
      `./index.html`,
      /*html*/ `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Bootstrap CSS -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
      crossorigin="anonymous"
    />
    <title>Employee Index</title>
  </head>
  <body> 
  <div class="jumbotron jumbotron-fluid bg-dark-subtle" style="text-align: center; background-size: cover; background-position: center;">
    <h1 class="display-4">Employee Index</h1>
    <p class="lead">Below is a list of Employees.</p>
</div>
  
    ${employees.map(
      (employee) => /*html*/ `
  <div class="container">
  <div class="row">
  <div class="col-md-4 text-dark bg-gradient border border-dark rounded-2" style="box-shadow: 5px 5px 5px">
    <h5 class="card-title">${employee.getName()}</h5>
    <p>${employee.getRole()}</p>
    <p>${employee.getId()}</p>
    <p>${specificRole(employee)}</p>
    <p><a href="mailto:${employee.getEmail()}"></a>${employee.getEmail()}</p>
  </div>
  </div>
  </div>

  `
    )}
  </div>
 </body>
</html>


   
`
    );
  }
}

function specificRole(employee) {
  switch (employee.getRole()) {
    case "Manager":
      return `Office Number: ${employee.getOfficeNumber()}`;
    case "Engineer":
      return `<a href="https://github.com/${employee.getGithub()}">Github</a>`;
    case "Intern":
      return `Student at: ${employee.getSchool()}`;
  }
}

//addEmployee();
newEmployee();
