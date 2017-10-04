// REQUIRE PACKAGES
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

// REQUIRE OBJECTS
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');


// SETUP EXPRESS APP
var app = express();
var server = http.createServer(app);
var io = socketIO(server);    // this passes back our web sockets server
var users = new Users();      // this instances a class of Users so we can call it throughout the program


// SETUP PATHING VARIABLE FOR PUBLIC DIR
const path = require('path');
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));


// SETUP ENV VARIABLES
const port = process.env.PORT || 3000;




//=============================================================================
// CONNECT/DISCONNECT
//=============================================================================
// This lets us listen for a new connection (like a new user connecting)
// This intial connection event will hold other io events in it until disconnect destroys it.
io.on('connection', (socket) => {      // Fires off anytime a web browser connects to io()
   console.log('New User connected.');    // Logs to server console



   // Disconnect user from server when user closes browser connection
   socket.on('disconnect', () => {     // Fires off anytime a web browser(client) leaves the server (closes)
      console.log('Homie left, yo.');
      // If user was in a room, remove him from the user list and update everyone
      var user = users.removeUser(socket.id);
      if (user) {
         io.to(user.room).emit('updateUserList', users.getUserList(user.room));
         io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the building.`));
      }
   });
//=============================================================================





   //=============================================================================
   // LISTENER/EMITTERS
   //=============================================================================

   // Sets up user and room information on Join
   socket.on('join', (params, callback) =>{
      // Validate params
      if (!isRealString(params.name) || !isRealString(params.room)) {
         return callback('Name and Room Name are required!');
      }
      // Join the room
      socket.join(params.room);     //create the room connection
      // socket.leave('Room name');
      users.removeUser(socket.id);     // this removes the user from any previous rooms. Cleanup
      users.addUser(socket.id, params.name, params.room);   // add the user to the room

      // send broadcast to room - emitting the user list for params.room to the updateUserList client listener
      io.to(params.room).emit('updateUserList', users.getUserList(params.room));
      socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));  // Welcome new user to room
      socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));  // Inform all other users that a new user has joined room
      callback();    // Leave this empty, err handled above, and this callback is for err condition
   });

   // This will receive a user message and rebroadcast it to all users
   socket.on('createMessage', (message, callback) => {
      console.log('New Message:', message);
      io.emit('newMessage', generateMessage(message.from, message.text));

      // This callback sends a response back to the emitter who called createMessage (Message received)
      // We can send data back to the emitter in the callback
      callback();

   // THIS IS EMITTER WITHOUT EVENT ACKNOWLEDGE
   // socket.on('createMessage', (message) => {
   //    console.log('New Message:', message);
   //    io.emit('newMessage', generateMessage(message.from, message.text));

      //                      {       // io.emit will broadcast to ALL connected clients
      //    from: message.from,
      //    text: message.text,
      //    createdAt: new Date().getTime(),
      // });

      // // This will fire off an emit to everyone BUT the person who called the 'createMessage'
      // socket.broadcast.emit('newMessage', {
      //    from: message.from,
      //    text: message.text,
      //    createdAt: new Date().getTime(),
      // });
   });


   // This recieves a users location data and rebroadcasts it to everyone else
   socket.on('createLocationMessage', (coords) => {
      io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
   });
   //=============================================================================



});   // closes out the io.on('connect') call











// START EXPRESS LISTENER
server.listen(port, () => {   // this actually calls http.createServer(app)
   console.log(`Listening on port: ${port}`);
});





//=============================================================================
// MISC
//=============================================================================
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

   // socket.emit('newMessage', {      //socket.emit will send to specific connection
   //    from: 'Leroy',
   //    text: 'Jesse is Gay',
   //    createdAt: 1700
   // });


   //=============================================================================
   // Welcome the new user to the Chat App
   // OLD AND BUSTED
   // socket.emit('newMessage', {
   //    from: 'Admin',
   //    text: 'Welcome to the Chat App',
   //    createdAt: new Date().getTime(),
   // });

   //NEW HOTNESS
   // socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));


   // *************** ROOM EMITTING ******************************
   // io.emit    --> io.to(params.room).emit()  WILL SEND TO EVERYONE IN ROOM
   // socket.broadcast.emit   --> socket.broadcast.to(params.rooms).emit() WILL SEND TO EVERYONE BUT SENDER
   // socket.emit    --> SENDS TO SPECIFIC USER
