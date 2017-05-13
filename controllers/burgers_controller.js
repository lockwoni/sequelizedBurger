// DEPENDENCIES
var path = require("path");
var db = require("../models");

/***************************************/
// ROUTES
module.exports = function(app) {
// Each of the below routes just handles the HTML page that the user gets sent to.

	app.get("/", function(req, res) {
		var query = {};
	    if (req.query.customer_id) {
	      query.CustomerId = req.query.customer_id;
	    }
		// Pulling all of the burger data
		db.Burger.findAll({
			where: query,
			include: [{
				model: db.Customer
			}]
		})
		.then(function(dbBurger) {
			var burgerObj = {
				burger: dbBurger 
			};
			console.log(burgerObj);
			res.render("index", burgerObj);
		});
	});

	app.post("/", function(req, res) {
		// Adding the user-inputed burger to the database
		db.Customer.create({
			customer_name: req.body.customer_name,
			Burger: {
				burger_name: req.body.burger_name
			}
		}, {
			include: [db.Burger]
		})
		.then(function(dbCustomer) {
			 // Redirecting to the home page so that the newly added burger is displayed
			console.log(dbCustomer);

			res.redirect("/");
		});
	});

	app.put("/:id", function(req, res) {
		// Updating the burger that the user "devours"
		var newUpdate = {
			devoured: req.body.devoured
		};

		db.Burger.update(newUpdate, {
			where: {
				id: req.params.id
			}
		}).then(function(dbBurger) {
			console.log(dbBurger);

			res.redirect("/");
		});
	});
};