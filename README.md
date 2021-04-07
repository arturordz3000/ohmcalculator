# Ohm resistor calculator
Application to calculate ohm values based on resistor color bands. This application consists of 2 projects: a front end app built with ReactJS and a Backend API built with NodeJS and Express. The database used on this project is SQLite.

## Requirements

### Windows
1. NodeJS version 12 or greater.
2. Docker Desktop (optional).
3. WSL (optional - this is used by Docker on Windows, therefore it must be installed if you're planning on running the application with Docker Compose).

### MacOS
1. NodeJS version 12 or greater.
2. Docker Desktop (optional).

### Linux
1. NodeJS version 12 or greater.
2. Docker and Docker Compose (optional).

## Installation with Docker Compose
Using Docker Compose is the most reliable way to run the application. You'll notice a file named `docker-compose.yml` in the root folder. This file is used to run the frontend and backend applications at once. Execute the following command to run the whole environment:

    docker-compose up
    
The frontend application will run on `http://localhost:3001/` and the backend application on `http://localhost:3000/`

## Installation with NodeJS and NPM
The other way to run the environment is using NodeJS and NPM. 

### Running the Backend API
From the root folder, execute the following commands:

    cd ./ohm-calculator-api
    npm install
    
Wait until all the dependecies are installed and then run:

    npm start

The backend api will run on `http://localhost:3000/`

### Running the Frontend App
From the root folder, execute the following commands:

    cd ./ohm-calculator
    npm install
    
Wait until all the dependecies are installed and then run:

    npm start

The frontend application will run on `http://localhost:3001/`

## Database Installation
There's no need to do anything additional to install the database. When the `npm start` command is executed to run the backend application, a script named `db-gen.js` is executed to generate a `default.db` database file which contains the tables and data needed by the application.