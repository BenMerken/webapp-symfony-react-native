# Project Web and Mobile: WP1

## Symfony

### Testing the app with postman
In this repo we have provided a postman collection (Web & Mobile- WP1.postman_collection.json) which you can import into your postman locally.
You only need to edit the collection variable from symfony01.local to the url you use to host the api.

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

CSRF - or Cross-site request forgery - is a method by which a malicious user attempts to make your legitimate users unknowingly submit data that they don't intend to submit.

Before we can use CSRF protection we have to install it in our project
![alt text][img_CSRFInstall]

After this we have to enable CSRF protection in the framework.yaml in the config/packages directory

![alt text][img_EnablingCSRF]


### Code coverage

Code is being covered by writing PHPUnit tests. By using this command, coverage gets exported to html in the "Coverage" directory

![alt text][img_CodeCoverage]

## React Native

### Allow CORS



### Credits

Peter Janssen & Ben Merken @ Hogeschool PXL, Hasselt, 2019.

[img_LogIntoMySql]:ImagesReadme/Logging%20into%20MySql.PNG "Logging into MySql"
[img_CreateDatabase]:ImagesReadme/Create%20database.PNG "Create database"
[img_CreateTablesAndInsert]:ImagesReadme/Creating%20tables%20and%20inserting%20dummydata.PNG "Create tables and Insert"
[img_SuccesQuery]:ImagesReadme/Succes%20Query.PNG "Every Query succeeded"
[img_SuccesCreatingDatabaseAndTables]:ImagesReadme/Succes%20Creating%20Database%20and%20Tables.PNG "Succes creating database and tables"
[img_CodeCoverage]:ImagesReadme/Code%20coverage.PNG "Code coverage"
[img_CSRFInstall]:ImagesReadme/CSRF%20install.PNG "CSRF Install"
[img_EnablingCSRF]:ImagesReadme/Enabling%20CSRF.PNG "CSRF Enabled"
