const {application} = require("express");
const server = require('http').createServer(application);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('User connected');
  socket.emit('test event', 'here is some data');
});

server.listen(3000, () => {
  console.log('Socket.io server is listening on port 3000');
})
