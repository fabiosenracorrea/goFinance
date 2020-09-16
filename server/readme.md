## GoFinance Back-end

This backend is structured using SOLID concepts, using:

* Repositories as 'guardians' of the database
* Services as Application Logic handler
* Models as Data definition
* Routes as purely request/response handlers, using services to apply logic if needed
* Postgres database and TypeORM (config file not on remote repo)

Current features:

* A route to list every transaction and current account balance.
* A route to create a transaction (provided there's enough balance for it)
* A route to delete a transaction from the database
* A route to import a CSV file and add all transactions at once.
