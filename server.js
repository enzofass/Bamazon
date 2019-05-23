// Dependencies
const express = require("express");

// Set up express app
const app = express();
const PORT = process.env.PORT || 8080;

// Set up express data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.join());

// Serve static directories
app.use(express.static("/public"));

// Routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Start server listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
