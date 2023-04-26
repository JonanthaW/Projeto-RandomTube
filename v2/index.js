const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const fs = require("fs");
const server = require("http").createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
require('dotenv').config()

app.use(express.static(path.join(__dirname, 'public/')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + 'index.html'));
});

class Key {
  constructor(key) {
    this.key = key;
  }
} 
const api_key = new Key(process.env.API_KEY);

io.on("connection", socket => {
  socket.emit("get_key", api_key.key);
});

server.listen(port, () => {
  console.log(`Pagina rodando com sucesso em localhost:${port}.`)
})