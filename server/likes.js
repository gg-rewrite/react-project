'use strict';

var express = require("express");

var dbconst = require("./db.js");

var likes = express.Router();


//list all likes
likes.get("/:videoId/likes", function(req, res) {
  console.log("GET request for likes for video %s received", req.params.videoId);

	dbconst.db.any('select l.user_id from likes l join users u on u.id = l.user_id where video_id = $1',[req.params.videoId])
		.then(function(data) {
			console.log(data.length + "rows received");
			res.json(data);
		}).catch(function(err) {
			console.log("query error: " + err);			
			res.sendStatus(500);
	});

});



//get like by ID
likes.get('/:videoId/likes/:userId', function(req, res) {
  console.log("GET request for a like of the video %s by user %s received", req.params.videoId, req.params.userId);

	dbconst.db.any("select user_id from likes where video_id = $1 and user_id = $2", [req.params.videoId, req.params.userId])
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


//Delete like
likes.delete('/:videoId/likes/:userId', function(req, res) {
  console.log("DELETE request for deleting a like for video %s by user %s received", req.params.videoId, req.params.userId);

	dbconst.db.none("delete from likes where video_id = $1 and user_id = $2", [req.params.videoId, req.params.userId])
	.then(function(data) {
		console.log("delete successful");
		res.sendStatus(200);
	}).catch(function(err) {
		console.log("Query error: " + err);
		res.sendStatus(500);
	});

});



//Add a new like
likes.post('/:videoId/likes/', function(req,res) {
  console.log('POST request for adding a like to the video %s by user %s received', req.params.videoId, req.body.userId);

	let userId = req.body.user_id;
	dbconst.db.none("insert into likes(video_id, user_id) values($1, $2)", 
		[req.params.videoId, req.body.userId])
	.then(function(data) {
		console.log("Like added");
		res.sendStatus(201);
	}).catch(function(err) {
		console.log("Query error: " + err);
		res.sendStatus(500);
	});

});

module.exports = likes;
