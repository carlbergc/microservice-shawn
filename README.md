Login Microservice -Campbell Carlberg to Shawn Singharaj - Communication Contract
Overview
This document provides the communication contract for the simplified Login Microservice designed for Shawn's Calendar/Planner application. The microservice handles user authentication using Node.js's built-in HTTP module and memory storage.
Service Endpoints
1. User Registration
Endpoint: /api/auth/register
Method: POST
Content-Type: application/json
Request Body:
 json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
Success Response (201 Created):
 json
{
  "message": "User registered successfully",
  "userId": "2",
  "token": "eyJpZCI6IjIiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb..."
}
Error Responses:
400 Bad Request: Missing required fields
409 Conflict: User already exists
500 Internal Server Error: Server-side issues
2. User Login
Endpoint: /api/auth/login
Method: POST
Content-Type: application/json
Request Body:
 json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
Success Response (200 OK):
 json
{
  "message": "Logged in successfully",
  "userId": "2",
  "token": "eyJpZCI6IjIiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb..."
}
Error Responses:
400 Bad Request: Missing required fields
401 Unauthorized: Invalid email or password
500 Internal Server Error: Server-side issues
3. Token Verification
Endpoint: /api/auth/verify
Method: GET
Headers:
Authorization: Bearer [token]
Success Response (200 OK):
 json
{
  "message": "Token is valid",
  "user": {
    "id": "2",
    "email": "user@example.com"
  }
}
Error Responses:
401 Unauthorized: No token provided or invalid token
500 Internal Server Error: Server-side issues
4. Get User Profile
Endpoint: /api/auth/profile
Method: GET
Headers:
Authorization: Bearer [token]
Success Response (200 OK):
 json
{
  "id": "2",
  "email": "user@example.com"
}
Error Responses:
401 Unauthorized: No token provided or invalid token
404 Not Found: User not found
500 Internal Server Error: Server-side issues
Authentication
The microservice implements a simplified token-based authentication system. After successful login or registration, the client receives a token that should be included in the Authorization header for subsequent requests:
Authorization: Bearer eyJpZCI6IjIiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb...
Note: In this simplified implementation, tokens are stored in memory and are lost when the server restarts. In a production environment, you would use a proper JWT implementation with secret key verification.
Integration Guide
1. Setup Instructions
Install Node.js (v14 or later recommended)
Copy the server.js file to your project directory
Start the microservice: node server.js
The service will be available at http://localhost:3001
2. Integration with Front-end
Make API calls to the login microservice endpoints from your React front-end
Store the received token in localStorage or sessionStorage
Include the token in the Authorization header for all protected API calls
Redirect to login page when token expires or is invalid
3. Example React Integration Code
javascript
// Example login function in React
const login = async (email, password) => {
  try {
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }
    
    // Store token in localStorage
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('userId', data.userId);
    
    // Redirect to weekly view page
    window.location.href = '/weekly-view';
  } catch (error) {
    console.error('Login error:', error);
    // Handle error (show error message to user)
  }
};
Default Test User
For testing purposes, the microservice comes pre-configured with one test user:
Email: test@example.com
Password: password123
You can use these credentials for initial testing or create new users via the registration endpoint.
Error Handling Strategy
Types of Errors
Validation Errors: Missing or invalid request data
Authentication Errors: Invalid credentials or expired tokens
Server Errors: Internal service failures
Error Handling Recommendations
Front-end Error Handling:
Display user-friendly error messages
Implement token validation on page load
Add appropriate form validation
Retry Strategy:
Implement exponential backoff for temporary server errors
Maximum of 3 retry attempts
Monitoring:
Log all errors with appropriate context
Fallback Plan
If the authentication microservice is unavailable:
Implement a local cache of user authentication state
Allow limited app functionality without requiring fresh authentication
Notify the user of connectivity issues and provide retry options
UML Sequence Diagram
+--------+                   +-------------------+                +-----------------+
| Client |                   | Login Microservice|                | In-Memory Store |
+--------+                   +-------------------+                +-----------------+
    |                                 |                                  |
    | 1. POST /api/auth/login         |                                  |
    | (email, password)               |                                  |
    |-------------------------------->|                                  |
    |                                 | 2. Find user by email/password   |
    |                                 |--------------------------------->|
    |                                 |                                  |
    |                                 | 3. Return user data              |
    |                                 |<---------------------------------|
    |                                 |                                  |
    |                                 | 4. Generate token                |
    |                                 |-------------------+              |
    |                                 |                   |              |
    |                                 |<------------------+              |
    |                                 |                                  |
    |                                 | 5. Store token in memory         |
    |                                 |--------------------------------->|
    |                                 |                                  |
    | 6. Return token and user ID     |                                  |
    |<--------------------------------|                                  |
    |                                 |                                  |
    | 7. Subsequent requests with     |                                  |
    | Authorization: Bearer {token}   |                                  |
    |-------------------------------->|                                  |
    |                                 | 8. Verify token                  |
    |                                 |--------------------------------->|
    |                                 |                                  |
    |                                 | 9. Return token validity         |
    |                                 |<---------------------------------|
    |                                 |                                  |
    | 10. Return requested resource   |                                  |
    |<--------------------------------|                                  |
    |                                 |                                  |
Implementation Notes
This is a simplified implementation intended for demonstration and educational purposes. For production use, consider these enhancements:
Persistent storage for user data
Password hashing

