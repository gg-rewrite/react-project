'use strict';

var express = require("express");

var dbconst = require("./db.js");

var users = express.Router();


//list all users
users.get("/", function(req, res) {
  console.log("GET request for users received");

	dbconst.db.any('select id, name from users',[])
		.then(function(data) {
			console.log(data.length + "rows received");
			res.json(data);
		}).catch(function(err) {
			console.log("query error: " + err);			
			res.sendStatus(500);
	});

});



//get user by ID
users.get('/:id', function(req, res) {
  console.log("GET request for user %s received", req.params.id);

	dbconst.db.any("select name,role_id from users where id = $1", [req.params.id])
	.then(function(data) {
		console.log(data.length + " rows received");
		if (data.length > 0) {
			res.json(data[0]);
		} else {
			res.sendStatus(404);
		}
	}).catch(function(err) {
		console.log("Query error: " + err);
		res.sendStatus(500);
	});


});

//modify user
users.put('/:id', function(req, res) {
  console.log("put request for updating the user id %s received", req.params.id);

	let login = req.body.login;
	let password = req.body.password;
	let role = req.body.role;

	dbconst.db.none("update users set name = $1, password = $2, role_id = $3 where id = $4",
		[login, password, role, req.params.id])
	.then(function(data) {
		console.log("update successful");
		res.sendStatus(200);
	}).catch(function(err) {
		console.log("Query error: " + err);
		res.sendStatus(500);
	});

});


//Delete user
users.delete('/:id', function(req, res) {
  console.log("DELETE request for updating the user id %s received", req.params.id);

	dbconst.db.none("delete from users where id = $1", [req.params.id])
	.then(function(data) {
		console.log("delete successful");
		res.sendStatus(200);
	}).catch(function(err) {
		console.log("Query error: " + err);
		res.sendStatus(500);
	});

});



//Add a new user
users.post('/', function(req,res) {
  console.log('POST request for creating a user received');

  let  login = req.body.login;
	let password = req.body.password;
	console.log(login + " " + password);

	dbconst.db.none("insert into users(name, password, role_id) values($1, $2, 2)", 
		[login, password])
	.then(function(data) {
		console.log("User created");
		res.sendStatus(201);
	}).catch(function(err) {
		console.log("Query error: " + err);
		res.sendStatus(500);
	});

});

module.exports = users;
