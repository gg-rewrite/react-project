'use strict';
var express = require("express");

var dbconst = require("./db.js");

var auth = express.Router();

//auth
auth.post('/' ,function(req, res){
	console.log("Authorization request received");
	let login = req.body.login;
	let password = req.body.password;
	console.log("Credentials are: " + login + " " + password);

	dbconst.any("select id from users where name = $1 and password = $2", [login, password])
		.then(function(data) {
			console.log(data.length + " rows returned");
			if (data.length > 0) {
				console.log("Authorized");
				req.session.user = data[0].id;
				res.sendStatus(200);
			} else {
				res.sendStatus(401);
			}
		}).catch(function(err) {
			console.log("Query error: " + err);
			res.sendStatus(500);
		});	

});


module.exports = auth;
