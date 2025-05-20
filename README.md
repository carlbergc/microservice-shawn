Login Microservice -Campbell Carlberg to Shawn Singharaj - Communication Contract
Overview
This document provides the communication contract for the simplified Login Microservice designed for Shawn's Calendar/Planner application. The microservice handles user authentication using Node.js's built-in HTTP module and memory storage.
Version: Simplified Implementation
Service URL: http://localhost:5555

1. User Login
Endpoint: /login
Method: POST
Headers:

http
Content-Type: application/json
Request Body:

json
{
  "email": "test@test.com",
  "password": "123"
}
Success Response (200 OK):

json
{
  "success": true
}
Error Responses:

Status Code	Response Body	Condition
400	{ "error": "Bad request" }	Missing email/password or invalid JSON
401	{ "error": "Wrong credentials" }	Incorrect email/password
500	{ "error": "Server error" }	Backend failure
2. Default Test User
The service includes one hardcoded user for testing:

json
{
  "email": "test@test.com",
  "password": "123"
}
3. Integration Guide
Frontend (React) Example:
javascript
const handleLogin = async (email, password) => {
  try {
    const response = await fetch('http://localhost:5555/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Login failed');
    
    alert('Success!'); // Replace with your app logic
  } catch (err) {
    alert(err.message); // Show error to user
  }
};
Key Notes:
No tokens or sessions (stateless).

CORS is enabled for all origins (Access-Control-Allow-Origin: *).

4. Error Handling
Error Type	Action
400 Bad Request	Validate inputs before sending
401 Unauthorized	Check credentials and retry
500 Server Error	Retry or show maintenance message
5. Sequence Diagram
Diagram
Code
6. Setup Instructions
Run the backend:

bash
node server.js
Output: Server running on port 5555

Test manually:

bash
curl -X POST http://localhost:5555/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123"}'

Implementation Notes
This is a simplified implementation intended for demonstration and educational purposes. For production use, consider these enhancements:
Persistent storage for user data
Password hashing

