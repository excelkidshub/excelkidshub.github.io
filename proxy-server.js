const http = require('http');
const https = require('https');

const PORT = 3000;
const TARGET_API = 'https://api.excelkidshub.in/api';

const server = http.createServer((req, res) => {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Proxy the request to the target API
  const targetUrl = TARGET_API + req.url;
  console.log(`Proxying: ${req.method} ${req.url} -> ${targetUrl}`);
  
  const proxyReq = https.request(targetUrl, {
    method: req.method,
    headers: {
      ...req.headers,
      host: 'api.excelkidshub.in',
    }
  }, (proxyRes) => {
    // Forward status code and headers
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    
    // Forward the response body
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    console.error('Proxy error:', err);
    res.writeHead(500);
    res.end('Proxy error');
  });

  // Forward the request body if present
  req.pipe(proxyReq);
});

server.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
  console.log(`Proxying requests to ${TARGET_API}`);
  console.log(`\nTo use this proxy, update config.js API_BASE_URL to: http://localhost:${PORT}`);
});
