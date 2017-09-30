//=============================================================================
// VAR DECLARATION
//=============================================================================
var socket = io();    // This initiates a call to the server from the client to keep a connection open



//=============================================================================
// CONNECTION SOCKETS
//=============================================================================
socket.on('connect', function() {     // Will fire off anytime we crete a connection to the server
   console.log('Connected to Server.');   // This logs to the client console
});

socket.on('disconnect', function() {  // Fires off anytime the server goes down
   console.log('Dropped yo connection, dawg.');
});



//=============================================================================
// CLIENT LISTENERS
//=============================================================================
socket.on('newMessage', function(message) {
   console.log(message);
   // We will populate the list items in our <ol> through jQuery
   var li = jQuery('<li></li>');    // creates the li element in the variable
   li.text(`${message.from}: ${message.text}`);    // sets up the format of the message

   jQuery('#messages').append(li);  // appends a new message to the end of the list as new <li>
});


// INSTEAD of creating new sockets for each emit, we send the welcome and
// newUser to newMessage
// socket.on('welcome', function(message) {
//    console.log(message);
// });



//=============================================================================
// CLIENT EMITTERS
//=============================================================================
// This is setting up the event listener for the message form on index.html
// The (e) stands for EVENT
jQuery('#message-form').on('submit', function (e) {
   // We need to prevent the default behavior for form (which is refresh page and send text to url)
   e.preventDefault();

   // Now we apply our own custom behavior to the forms SUBMIT event
   socket.emit('createMessage', {
      from: 'User',
      text: jQuery('[name=message]').val()
   }, function() {

   });
});








// GOODBYE FRANK!
// socket.emit('createMessage', {
//    from: 'Frank',
//    text: 'from Calid'
// }, function (data) {
//    console.log('Got the message', data);
// });
