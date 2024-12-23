const express = require('express');
const { createServer } = require('http');
const { Server } = require('ws');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors()); // Thêm cấu hình CORS

const server = createServer(app);
const wss = new Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('received: %s', message);
    ws.send(`Server received: ${message}`);
  });

  ws.send('Welcome to the WebSocket server!');
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
