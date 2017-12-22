'use strict';

var express = require("express");

var dbconst = require("./db.js");

var playlists = express.Router();


//list all playlists
playlists.get("/:userId/playlists", function(req, res) {
  console.log("GET request for playlists for user %s  received", req.params.userId);

	dbconst.db.any('select id, name from playlists where user_id = $1',[req.params.userId])
		.then(function(data) {
			console.log(data.length + "rows received");
			res.json(data);
		}).catch(function(err) {
			console.log("query error: " + err);			
			res.sendStatus(500);
	});

});



//get playlist by ID
playlists.get('/:userId/playlists/:id', function(req, res) {
  console.log("GET request for playlist %s for user %s received", req.params.userId, req.params.id);

	dbconst.db.any("select id, name, description from playlists where id = $1 and user_id = $2", [req.params.id, req.params.userId])
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

//modify playlist
playlists.put('/:userId/playlists/:id', function(req, res) {
  console.log("put request for updating the playlist id %s for user %s received", req.params.id, req.params.userId);

	let name = req.body.name;
	let description = req.body.description;

	dbconst.db.none("update playlists set name = $1, description = $2 where id = $3 and user_id = $4",
		[name, description, req.params.id, req.params.userId])
	.then(function(data) {
		console.log("update successful");
		res.sendStatus(200);
	}).catch(function(err) {
		console.log("Query error: " + err);
		res.sendStatus(500);
	});

});


//Delete playlist
playlists.delete('/:userId/playlists/:id', function(req, res) {
  console.log("DELETE request for updating the playlist id %s for user %s received", req.params.id, req.params.userId);

	dbconst.db.none("delete from playlists where id = $1 and user_id = $2", [req.params.id, req.params.userId])
	.then(function(data) {
		console.log("delete successful");
		res.sendStatus(200);
	}).catch(function(err) {
		console.log("Query error: " + err);
		res.sendStatus(500);
	});

});



//Add a new playlist
playlists.post('/:userId/playlists', function(req,res) {
  console.log('POST request for creating a playlist for user %sreceived', req.params.userId);

	let name = req.body.name;
	let description = req.body.description;

	dbconst.db.none("insert into playlists(user_id, name, description) values($1, $2, $3)", 
		[req.params.userId, name, description])
	.then(function(data) {
		console.log("Playlist created");
		res.sendStatus(201);
	}).catch(function(err) {
		console.log("Query error: " + err);
		res.sendStatus(500);
	});

});

module.exports = playlists;
