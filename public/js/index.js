


//=============================================================================
// INDEX.HTML SOCKET Calls
//=============================================================================
var socket = io();    // This initiates a call to the server from the client to keep a connection open

socket.on('connect', function() {     // Will fire off anytime we crete a connection to the server
   console.log('Connected to Server.');   // This logs to the client console

//    socket.emit('createEmail', {     // We put the emitter inside the connect so it doesn't fire beforehand
//       to: 'right@ous.com',
//       text: 'Name the time and place, and wear something sexy.'
//    });

   // socket.emit('createMessage', {
   //    from: 'Jesse',
   //    text: 'You know it!'
   // });
});

socket.on('disconnect', function() {  // Fires off anytime the server goes down
   console.log('Dropped yo connection, dawg.');
});

// socket.on('newEmail', function(email) {
//    console.log("You've got Mail!", email);
// });

socket.on('newMessage', function(message) {
   console.log(message);
});


// INSTEAD of creating new sockets for each emit, we send the welcome and
// newUser to newMessage
// socket.on('welcome', function(message) {
//    console.log(message);
// });
//
// socket.on('newUser', function(message) {
//    console.log(message);
// });
