SQL Query Executor with CSV Export
Project Overview

This project allows users to execute SQL SELECT queries on a database and export the results in CSV format. The system ensures database safety by restricting users to only SELECT operations, preventing accidental changes or deletions. This tool is useful for team members who need database access but should not modify the data.
Features

    SQL Query Execution: Users can write and execute SQL SELECT queries.
    CSV Export: Query results can be downloaded in CSV format for offline analysis.
    Database Security: Only SELECT operations are allowed, preventing accidental database changes.
    Pagination: Manage large datasets by displaying results in paginated views.
    Frontend: Built with Angular for a modern, responsive user interface.
    Backend: Built with Spring Boot and JDBC Template for efficient database interaction.


Technologies Used
Backend

    Spring Boot: For building the backend REST API.
    JDBC Template: For executing SQL queries on the database.
    Pagination: To handle large result sets efficiently.

Frontend

    Angular: For building a dynamic and responsive user interface.

Database

    JPA (Java Persistence API) for ORM (Object-Relational Mapping).
    MySQL/PostgreSQL: Can be used as the database (or any supported by Spring Boot).

Project Setup
Prerequisites

    Java 17+
    Node.js (For Angular frontend)
    MySQL/PostgreSQL database
    Maven (for building the Spring Boot project)

Steps to Run the Project

1.Clone the Repository:

git clone https://github.com/Parikshit9112/query.git

2.Backend Setup:

Navigate to the backend directory:

cd backend

Configure your database connection in the application.properties  file:

properties

spring.datasource.url=jdbc:mysql://localhost:3306/your-database
spring.datasource.username=your-username
spring.datasource.password=your-password

spring.jpa.properties.hibernate.connection.readOnly=true

Build the project using Maven:

mvn clean install

Run the backend:

mvn spring-boot:run

3.Frontend Setup:

Navigate to the frontend directory:


cd frontend

Install the required dependencies:

npm install

Run the Angular app:

ng serve

Visit http://localhost:4200 in your browser to access the frontend.

Usage

    Enter your SQL SELECT query in the provided input field.
    Click on Execute to run the query.
    View the paginated results below the query box.
    Click Download CSV to export the results.

Security

To ensure that only SELECT operations are performed, queries are parsed and validated before execution. Any non-SELECT statement is rejected to protect the database from accidental modification or deletion.
