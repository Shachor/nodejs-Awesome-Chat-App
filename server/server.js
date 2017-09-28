// REQUIRE PACKAGES
const express = require('express');


// REQUIRE OBJECTS



// SETUP EXPRESS APP
var app = express();


// SETUP PATHING VARIABLE FOR PUBLIC DIR
const path = require('path');
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));


// SETUP ENV VARIABLES
const port = process.env.PORT || 3000;











// START EXPRESS LISTENER
app.listen(port, () => {
   console.log(`Listening on port: ${port}`);
});
