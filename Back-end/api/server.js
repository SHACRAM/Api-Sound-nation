const http = require('http');
const https = require('https');
const fs = require('fs');
const app = require('./app');

// Charger les certificats SSL
const sslOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/soundnation.duckdns.org/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/soundnation.duckdns.org/fullchain.pem'),
};

const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '443'); // Port HTTPS par défaut
app.set('port', port);

const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Serveur HTTPS
const httpsServer = https.createServer(sslOptions, app);

httpsServer.on('error', errorHandler);
httpsServer.on('listening', () => {
  const address = httpsServer.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening securely on ' + bind);
});

// Redirection HTTP → HTTPS
const httpServer = http.createServer((req, res) => {
  res.writeHead(301, { Location: 'https://' + req.headers.host + req.url });
  res.end();
});

httpServer.listen(80, () => {
  console.log('Redirection HTTP to HTTPS enabled on port 80');
});

httpsServer.listen(port);
