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
// This intial connection event will hold other io events in it until disconnect destroys it.
io.on('connection', (socket) => {      // Fires off anytime a web browser connects to io()
   console.log('New User connected.');    // Logs to server console

   // // Emit can have two arguments (emitter, data)
   // // Emitter name needs to match name of client (vice-versa)
   // // Data is not required, but can be anything (usually an object)
   // socket.emit('newEmail', {
   //    from: 'right@ous.com',
   //    text: 'Pop my cherry',
   //    createdAt: 12345
   // });
   //
   // socket.on('createEmail', (newEmail) => {
   //    console.log('Create Email: ', newEmail);
   // });

   socket.emit('newMessage', {
      from: 'Leroy',
      text: 'Jesse is Gay',
      createdAt: 1700
   });

   socket.on('createMessage', (message) => {
      console.log('New Message:', message);
   });

//who
//text
//createdAt       console.log(it);

   socket.on('disconnect', () => {     // Fires off anytime a web browser(client) leaves the server (closes)
      console.log('Homie left, yo.');
   });
});











// START EXPRESS LISTENER
server.listen(port, () => {   // this actually calls http.createServer(app)
   console.log(`Listening on port: ${port}`);
});
