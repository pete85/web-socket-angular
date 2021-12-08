const {application} = require("express");
const server = require('http').createServer(application);
const io = require('socket.io')(server, {cors: {origin: "*"}});

io.on('connection', (socket) => {
  console.log('User connected');
  // socket.on('message', (message) => {
  //   console.log(message);
  //   io.emit('message', `${socket.id.substr(0,2)} said ${message}`);
  // });
  socket.emit('test event', 'here is some data');
});

server.listen(3000, () => {
  console.log('Socket.io server is listening on port 3000');
})
