//=============================================================================
// VAR DECLARATION
//=============================================================================
var socket = io();    // This initiates a call to the server from the client to keep a connection open
var locationButton = jQuery('#send-location');



//=============================================================================
// FUNTION DECLARATION
//=============================================================================
function scrollToBottom () {
   // This is the AutoScroll function
   // selectors
   var messages = jQuery('#messages');    // selector for messages pane
   var newMessage = messages.children('li:last-child');  // this calls the last <li> in the messages pane
   //heights
   var clientHeight = messages.prop('clientHeight');   //prop is a jQuery method to get object properties
   var scrollTop = messages.prop('scrollTop');
   var scrollHeight = messages.prop('scrollHeight');
   var newMessageHeight = newMessage.innerHeight();     // will give us height of new message including css padding
   var lastMessageHeight = newMessage.prev().innerHeight();  // gives us next to last <li> height

   if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      messages.scrollTop(scrollHeight);
   }
}



//=============================================================================
// CONNECTION SOCKETS
//=============================================================================
socket.on('connect', function() {     // Will fire off anytime we crete a connection to the server
   console.log('Connected to Server.');   // This logs to the client console
   var params = jQuery.deparam(window.location.search);

   socket.emit('join', params, function(err) {
      if (err) {
         alert(err);       // Send the user the error from servers join
         window.location.href = '/';   // On error redirects to index
      } else {
         console.log('No Error, join successful');
      }
   });
});

socket.on('disconnect', function() {  // Fires off anytime the server goes down
   console.log('Dropped yo connection, dawg.');
});



//=============================================================================
// CLIENT LISTENERS
//=============================================================================
socket.on('updateUserList', function (users) {
   var ol = jQuery('<ol></ol>');

   users.forEach(function(user) {
      ol.append(jQuery('<li></li>').text(user));
   });

   jQuery('#users').html(ol);
});


socket.on('newMessage', function(message) {
   var createdAt = moment(message.createdAt).format('h:mm a');
   var template = jQuery('#message-template').html();    // This will return the markup within #message-template
   var html = Mustache.render(template, {    //takes the markup and renders it into a moustache template
      from: message.from,
      text: message.text,
      createdAt
   });
   jQuery('#messages').append(html);   // Appends the template to the messages list
   scrollToBottom();

   //OLD AND BUSTED way of pushing out html - through jQuery manipulation
   // var formattedTime = moment(message.createdAt).format('h:mm a');
   // // We will populate the list items in our <ol> through jQuery
   // var li = jQuery('<li></li>');    // creates the li element in the variable
   // li.text(`${message.from} ${formattedTime}: ${message.text}`);    // sets up the format of the message
   //
   // jQuery('#messages').append(li);  // appends a new message to the end of the list as new <li>
});


// CLIENT LISTENER FOR GEOLOCATION MESSAGES
// The reason we use separate vars instead of template strings is to prevent malicious code from executing
socket.on('newLocationMessage', function(message) {
   var createdAt = moment(message.createdAt).format('h:mm a');
   var template = jQuery('#location-message-template').html();
   var html = Mustache.render(template, {
      from: message.from,
      url: message.url,
      createdAt
   });
   jQuery('#messages').append(html);
   scrollToBottom();

   // var formattedTime = moment(message.createdAt).format('h:mm a');
   // var li = jQuery('<li></li>');
   // var a = jQuery('<a target="_blank">My Current Location</a>');  //target="_blank" opens a new window
   //
   // li.text(`${message.from} ${formattedTime}: `);
   // a.attr('href', message.url);  //.attr() - one arg means GET, two args is NAME of attr and SET attr
   // li.append(a);     // after we set the <a> attribute, we send it to the <li>
   // jQuery('#messages').append(li);     // now we send the <li> to the screen
});


//=============================================================================
// CLIENT EMITTERS
//=============================================================================
// This is setting up the event listener for the message form on index.html
// (The box the user types his message into)
// The (e) stands for EVENT
jQuery('#message-form').on('submit', function (e) {
   // We need to prevent the default behavior for form (which is refresh page and send text to url)
   e.preventDefault();

   var messageTextbox = jQuery('[name=message]');
   // Now we apply our own custom behavior to the forms SUBMIT event
   socket.emit('createMessage', {
      from: 'User',
      text: messageTextbox.val(),
   }, function() {
      messageTextbox.val('');
   });
});


locationButton.on('click', function() {
   if(!navigator.geolocation) {
      return alert('Your browser does not support Geolocation.');
   }

   locationButton.attr('disabled', 'disabled').text('Sending Location...');    // This disables the location button after it's clicked

   navigator.geolocation.getCurrentPosition(function(position) {
      locationButton.removeAttr('disabled').text('Share Your Location');       // After we get the location, we re-enable the button
      socket.emit('createLocationMessage', {
         latitude: position.coords.latitude,
         longitude: position.coords.longitude
      });
   }, function() {
      locationButton.removeAttr('disabled').text('Share Your Location');       // If we fail, we still re-enable to button gor another try
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
