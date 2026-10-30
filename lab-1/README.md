
# Lab 1: Node.js and Express Server

## Student Details

- Name: BATCHU VENKATA MANI SAI
- Registration Number: 252U1R1029
- Section: CSE-2A(S-15)
- Course: B.Tech CSE

## Live Deployment

Not deployed yet.

## Project Description

This project demonstrates how to create a web server
using Node.js and Express.js.

It includes a basic HTTP server, Express routes,
JSON responses and 404 error handling.

## Technologies Used

- Node.js
- Express.js
- JavaScript
- npm

## Installation

1. Clone the repository.
2. Navigate to the lab-01 folder.
3. Install dependencies.

```bash
npm install
```

## How to Run

Start the Express server:

```bash
npm start
```

Start the basic HTTP server:

```bash
node http-server.js
```

Server URL: http://localhost:3000

## API Endpoints

| Method | Endpoint | Description | Status |
|---|---|---|---|
| GET | / | Welcome message | 200 |
| GET | /about | Student details | 200 |
| GET | /time | Current date and time | 200 |
| GET | /unknown | Not found response | 404 |

## Screenshots

### Home
![Home](screenshots/home.png)

### About
![About](screenshots/about.png)

### Time
![Time](screenshots/time.png)

### 404 Error
![Not Found](screenshots/not-found.png)

## Notes

Created a basic HTTP server using Node.js
and implemented API routes using Express.js.

Tested all endpoints and verified their
HTTP status codes.
