# Project Web and Mobile

### Creating database and tables with dummy data
For this project we will use a database consisting out of rooms, assets and tickets. This database will be created as follows:

In your VM log into your MySql server (username and password may vary) 

![alt text][img_LogIntoMySql]

Create the database name (asset-management-tool) and use it

![alt text][img_CreateDatabase]

Create the tables and dummy data with the following command (path to .sql file may vary)

![alt text][img_CreateTablesAndInsert]

If there were no errors your output and tables should look like this

![alt text][img_SuccesQuery]
![alt text][img_SuccesCreatingDatabaseAndTables]

### Preventing SQL-injection

By using prepared statements in the backend SQL-injection is prevented. When using prepared statements user input is converted
into string literals. This prevents code from being injected and executed into queries that might be used for malpractice.  

### Implementation of CSRF

https://symfony.com/doc/current/security/csrf.html

### Credits

Peter Janssen & Ben Merken @ Hogeschool PXL, Hasselt, 2019.

[img_LogIntoMySql]:ImagesReadme/Logging%20into%20MySql.PNG "Logging into MySql"
[img_CreateDatabase]:ImagesReadme/Create%20database.PNG "Create database"
[img_CreateTablesAndInsert]:ImagesReadme/Creating%20tables%20and%20inserting%20dummydata.PNG "Create tables and Insert"
[img_SuccesQuery]:ImagesReadme/Succes%20Query.PNG "Every Query succeeded"
[img_SuccesCreatingDatabaseAndTables]:ImagesReadme/Succes%20Creating%20Database%20and%20Tables.PNG "Succes creating database and tables"