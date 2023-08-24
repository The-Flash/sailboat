# Full Stack Javascript Test

## Tech Stack

* NodeJS
* TypeScript
* Next JS
* React JS
* Firebase
* Cloud Firestore
* Chakra UI

## Setup

1. In the root directory, run ```npm install```
2. Frontend: ```cd frontend```, run ```npm install```
3. Backend: ```cd backend```, run ```npm install```

### Running Backend and Frontend individually

* Frontend: ```cd frontend```, run ```npm run dev``` or ```npm run build && npm start```
* Backend: ```cd backend```, run ```npm run dev``` or ```npm start```

### Running Backend and Frontend concurrently

The project uses the "concurrently" library to execute the backend and frontend concurrently

In the root folder, run ```npm run dev```.

## Running Tests

In the root directory, execute this command

```shell
npm test
```

This will display a test coverage report after the tests have completed

## Seeding the Database

Run the script below in either the root folder or the backend folder

```shell
npm run seed
```

This will seed the Firestore Database with 

## API Documentation 5 tasks each with a single subtask

Follow the steps above to run the backend

Checkout the Swagger Docs at [http://localhost:8000/docs](http://localhost:8000/docs)