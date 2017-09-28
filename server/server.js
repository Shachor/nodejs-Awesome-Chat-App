// REQUIRE PACKAGES
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

// REQUIRE OBJECTS



// SETUP EXPRESS APP
var app = express();
var server = http.createServer(app);
var io = socketIO(server);    // this passes back our web sockets server


// SETUP PATHING VARIABLE FOR PUBLIC DIR
const path = require('path');
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));


// SETUP ENV VARIABLES
const port = process.env.PORT || 3000;



// This lets us listen for a new connection (like a new user connecting)
io.on('connection', (socket) => {
   console.log('New User connected.');

   socket.on('disconnect', () => {
      console.log('Homie left, yo.');
   });
});











// START EXPRESS LISTENER
server.listen(port, () => {   // this actually calls http.createServer(app)
   console.log(`Listening on port: ${port}`);
});
