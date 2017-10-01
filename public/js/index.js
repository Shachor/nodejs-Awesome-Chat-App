//=============================================================================
// VAR DECLARATION
//=============================================================================
var socket = io();    // This initiates a call to the server from the client to keep a connection open
var locationButton = jQuery('#send-location');



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

// CLIENT LISTENER FOR GEOLOCATION MESSAGES
// The reason we use separate vars instead of template strings is to prevent malicious code from executing
socket.on('newLocationMessage', function(message) {
   var li = jQuery('<li></li>');
   var a = jQuery('<a target="_blank">My Current Location</a>');  //target="_blank" opens a new window

   li.text(`${message.from}: `);
   a.attr('href', message.url);  //.attr() - one arg means GET, two args is NAME of attr and SET attr
   li.append(a);     // after we set the <a> attribute, we send it to the <li>
   jQuery('#messages').append(li);     // now we send the <li> to the screen
});


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


locationButton.on('click', function() {
   if(!navigator.geolocation) {
      return alert('Your browser does not support Geolocation.');
   }

   navigator.geolocation.getCurrentPosition(function(position) {
      socket.emit('createLocationMessage', {
         latitude: position.coords.latitude,
         longitude: position.coords.longitude
      });
   }, function() {
      alert('Unable to fetch location.');
   });
});





// GOODBYE FRANK!
// socket.emit('createMessage', {
//    from: 'Frank',
//    text: 'from Calid'
// }, function (data) {
//    console.log('Got the message', data);
// });
