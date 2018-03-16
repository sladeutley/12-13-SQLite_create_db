const { Database } = require("sqlite3").verbose(); //verbose is supposed to help with debugging
// const db = new sqlite3.Database("farmEmployees.sqlite");
// don't need sqlite3.Database bc destructured above
const db = new Database("farmEmployees.sqlite");
const { employeesArray } = require("./employees"); //has to be the same name as in employees.js

db.run("DROP TABLE IF EXISTS employees"); //just in case you need to reset database bc 'it exists'

// create tables

db.run(
  "CREATE TABLE IF NOT EXISTS employees (id INTEGER PRIMARY KEY, firstName TEXT, lastName TEXT, jobTitle TEXT, address TEXT, favoriteVeggie TEXT)"
);

// insert data into the tables
employeesArray.forEach(
  ({ id, firstName, lastName, jobTitle, address, favoriteVeggie }) => {
    db.run(
      `INSERT INTO employees VALUES (null, "${firstName}", "${lastName}", "${jobTitle}", "${address}", "${favoriteVeggie}")`
    );
  }
);

// how to enter data into table not from a js file
db.run(
  'INSERT INTO employees VALUES (null, "Stephen", "Stephonius", "farmer4", "333 some place", "green beans")'
);

db.all("SELECT * FROM employees", (err, allEmployees) => {
  if (err) return reject(err);
  console.log("allEmployees", allEmployees);
});

db.all("SELECT * FROM employees", (err, allEmployees) => {
  if (err) return reject(err);
  allEmployees.forEach(employee => {
    console.log("jobTitle: ", employee.jobTitle);
  });
});

db.all("SELECT * FROM employees", (err, allEmployees) => {
  if (err) return reject(err);
  allEmployees.forEach(employee => {
    console.log("first name: " , employee.firstName, "last name: ", employee.lastName, "address: ", employee.address);
  });
});
