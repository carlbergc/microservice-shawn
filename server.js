const http = require('http');

// Single hardcoded user
const user = { email: "test@test.com", password: "123" };

const server = http.createServer(async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'POST' && req.url === '/login') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { email, password } = JSON.parse(body);
        
        if (email === user.email && password === user.password) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true }));
        } else {
          res.writeHead(401);
          res.end(JSON.stringify({ error: "Wrong credentials" }));
        }
      } catch {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Bad request" }));
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(5555, () => console.log('Server running on port 5555'));
