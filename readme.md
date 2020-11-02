# GoFinance

GoFinance is an application designed to track your financial transactions!

You can register for an account to have your own dashboard and start monitoring your transactions, saving them with a Title, it's value, it's type (income | outcome) and category. If you feel like registering old transactions you might have been keeping track of using excel, you can upload a CSV file with all the transactions and the application will load and display them to you on a clean Dashboard.

And even if you've uploaded some incorrect transaction, you can easily delete it from your account. And don't worry about making debts, the application will not let you create an outcome transaction with a value higher than your current balance. Stay financially save guys :)

## Tech

THis application was developed mainly using:

* React JS
* Node JS
* Docker running a Postgres database.
* Typescript

With the main technologies on each being:

1. React JS

* React, obviously.
* Styled Components for styling
* React-Router-Dom for navigating (Routing)
* Yup for form validation
* Unform for form control
* ESLint to enforce and correct code style

2. NodeJS

* NodeJS, obviously
* Express for routing
* Jsonwebtoken for auth signing
* Multer, csv-parse and csvtojson for CSV uploading
* Postgres for database
* TypeORM as a ORM
* bcryptjs as a password encrypt dependency
* uuid as a unique id generator
* ts-node-dev to set up the typescript server
* ESLint to enforce and correct code style

### Constraints (Rules)

* The outcome transaction will only register if the user has enough balance for it;
* The application will redirect the user to the login page if he tries to access any private route while being logged out;
* The application will redirect the user to the dashboard page he tries to access the login/register page while being logged in;
* Only logged in users can create/list/delete transactions
* User's password is encrypted before it's saved onto the database
* User's log token is saved onto the browser's local storage

## Preview

Check out 2 gifs of the application:

![goFinance login-register pages](./project_login.gif)

![goFinance before creation implemented](./project_overview.gif)

![transaction creation done](./project_create.gif)
