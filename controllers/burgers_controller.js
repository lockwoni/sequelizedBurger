// DEPENDENCIES
//var express = require("express");
//var router = express.Router();
var path = require("path");
var db = require("../models");

/***************************************/
// ROUTES
module.exports = function(app) {
// Each of the below routes just handles the HTML page that the user gets sent to.

	app.get("/", function(req, res) {
		// Pulling all of the burger data
		db.Burger.findAll()
		.then(function(data) {
			var burgerObj = {
				burger: data 
			};
			console.log(burgerObj);
			res.render("index", burgerObj);
		});
	});

	app.post("/", function(req, res) {
		// Adding the user-inputed burger to the database
		db.Burger.create({
			burger_name: req.body.burger_name
		})
		.then(function(data) {
			 // Redirecting to the home page so that the newly added burger is displayed
			console.log(data);

			res.redirect("/");
		});
	});

	app.put("/:id", function(req, res) {
		// Updating the burger that the user "devours"
		var newBurger = {
			devoured: req.body.devoured
		};

		db.Burger.update(newBurger, {
			where: {
				id: req.params.id
			}
		}).then(function(data) {
			console.log(data);

			res.redirect("/");
		});
	});
};