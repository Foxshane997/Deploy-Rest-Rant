# REST Rant

## Description
REST Rant is a full-stack application built with Express and React, designed to allow users to create, read, update, and delete (CRUD) restaurant reviews. This project leverages various libraries and technologies to provide a smooth user experience and robust backend functionality.

## Demo
[Link to live demo]

## Technologies
- **Backend:**
  - Express
  - Node.js
  - PostgreSQL
  - Sequelize
  - JWT (jsonwebtoken)
  - Bcrypt
  - Body-parser
  - CORS
  - Method-Override
  - Nodemon (development)

- **Frontend:**
  - React
  - React Router
  - React Scripts
  - @testing-library for unit tests

## Technical Information

### Installation Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>

2. Navigate to the backend directory and install dependencies:
    cd backend
    npm install

3. Set up environment variables in a .env file:
    cd backend
npm install

4. Start the backend server:
    npm start

5. Navigate to the frontend directory and install dependencies:
    cd frontend
    npm install

6. Start the frontend server:
    npm start

7. You may need to open 2 separate terminal for this as both servers are required to be running.

## Issues

When clicking into places route the images aren't working & when clicking into each place web page errors out.

# API Documentation

## Types of API Documentation

[API List Docs Here]

# End Points 

*   / or /#
*   /places
*   /places/placeId
*   /users
*   /profile
*   /authentication

# Values Returned 

*  userId
*  firstName
*  lastName
*  email
*  passwordDigest
*  createdAt
*  updatedAt