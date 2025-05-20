Login Microservice -Campbell Carlberg to Shawn Singharaj - Communication Contract

Overview:
This document provides the communication contract for the simplified Login Microservice designed for Shawn's Calendar/Planner application. The microservice handles user authentication using Node.js's built-in HTTP module and memory storage.


Request Data
Endpoint: `POST http://localhost:5555/login`

example call:
fetch('http://localhost:5555/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    email: 'test@test.com',  // Test user
    password: '123'          // Case-sensitive
  })
})
Receive Data
Successful response (200 OK):


{ "success": true }
Error responses:
400: { "error": "Bad request" }
401: { "error": "Wrong credentials" }
500: { "error": "Server error" }
UML Sequence Diagram

UML Sequence Diagram:




