// DEPENDENCIES
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

/*******************************************/
// SETTING UP THE EXPRESS APP
var app = express();
var PORT = process.env.PORT || 3000;

// Requiring the models for syncing
var db = require("./models");

// Setting up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Serving static content for the app from the "public" directory in the app directory
app.use(express.static(process.cwd() + "/public"));


// Overriding with POST having ?_method=DELETE
app.use(methodOverride("_method"));

/*******************************************/
// SETTING UP HANDLEBARS
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

/*******************************************/
// ROUTES
// Importing routes and giving the server access to them
require("./controllers/burgers_controller.js")(app);

// Syncing the sequelize models and then starting the express app
db.sequelize.sync({force: true}).then( function() {
	app.listen(PORT, function() {
	  console.log("Listening on PORT " + PORT);
	});
});