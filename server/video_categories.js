'use strict';

var express = require("express");

var dbconst = require("./db.js");

var video_categories = express.Router();


//list all video_categories
video_categories.get("/", function(req, res) {
  console.log("GET request for video_categories received");

	dbconst.db.any('select id, name, description from video_categories',[])
		.then(function(data) {
			console.log(data.length + "rows received");
			res.json(data);
		}).catch(function(err) {
			console.log("query error: " + err);			
			res.sendStatus(500);
	});

});



//get video_category by ID
video_categories.get('/:id', function(req, res) {
  console.log("GET request for video_category %s received", req.params.id);

	dbconst.db.any("select name, description from video_categories where id = $1", [req.params.id])
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

//modify video_category
video_categories.put('/:id', function(req, res) {
  console.log("put request for updating the video_category id %s received", req.params.id);

	let name = req.body.name;
	let description = req.body.description;

	dbconst.db.none("update video_categories set name = $1, description = $2 where id = $3",
		[name, description, req.params.id])
	.then(function(data) {
		console.log("update successful");
		res.sendStatus(200);
	}).catch(function(err) {
		console.log("Query error: " + err);
		res.sendStatus(500);
	});

});


//Delete video_category
video_categories.delete('/:id', function(req, res) {
  console.log("DELETE request for updating the video_category id %s received", req.params.id);

	if (req.params.id > 2) {

	    dbconst.db.none("delete from category_video_rel where category_id = $1", [req.params.id])
		   .then(function(data) {
		       dbconst.db.none("delete from video_categories where id = $1", [req.params.id])
		   }).then(function(data) {
		       console.log("delete successful");
		       res.sendStatus(200);
		   }).catch(function(err) {
		       console.log("query error: " + err);
		       res.sendStatus(500);
		   });
	} else {
		res.sendStatus(400);
	}

});



//Add a new video_category
video_categories.post('/', function(req,res) {
  console.log('POST request for creating a video_category received');

	let name = req.body.name;
	let description = req.body.description;

	dbconst.db.none("insert into video_categories(name, description) values($1, $2)", 
		[name, description])
	.then(function(data) {
		console.log("Video category created");
		res.sendStatus(201);
	}).catch(function(err) {
		console.log("Query error: " + err);
		res.sendStatus(500);
	});

});

module.exports = video_categories;
