'use strict';

var express = require("express");

var dbconst = require("./db.js");

var comments = express.Router();


//list all comments
comments.get("/:videoId/comments", function(req, res) {
  console.log("GET request for comments to video %s received", req.params.videoId);

	dbconst.db.any('select c.id, c.user_id, u.name, c.text  from comments c join users u on (u.id = c.user_id) where c.video_id = $1 order by c.id desc',[req.params.videoId])
		.then(function(data) {
			console.log(data.length + " rows received");
			res.json(data);
		}).catch(function(err) {
			console.log("query error: " + err);			
			res.sendStatus(500);
	});

});



//get comment by ID
comments.get('/:videoId/comments/:id', function(req, res) {
  console.log("GET request for comment %s received", req.params.id);

	dbconst.db.any("select c.id, c.user_id, u.name, c.text  from comments c join users u on (u.id = c.user_id) where c.video_id = $1 and c.id = $2", [req.params.videoId, req.params.id])
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

//Delete comment
comments.delete('/:videoId/comments/:id', function(req, res) {
  console.log("DELETE request for deleting the comment %s for video %s received", req.params.id, req.params.videoId);

	dbconst.db.none("delete from comments where id = $1 and video_id = $2", [req.params.id, req.params.videoId])
	.then(function(data) {
		console.log("delete successful");
		res.sendStatus(200);
	}).catch(function(err) {
		console.log("Query error: " + err);
		res.sendStatus(500);
	});

});



//Add a new comment
comments.post('/:videoId/comments', function(req,res) {
  console.log('POST request for adding a comment to video %s received', req.params.videoId);

	let userId = req.body.userId;
	let text = req.body.text;

	dbconst.db.none("insert into comments(user_id, video_id, text) values($1, $2, $3)", 
		[userId, req.params.videoId, text])
	.then(function(data) {
		console.log("Comment added");
		res.sendStatus(201);
	}).catch(function(err) {
		console.log("Query error: " + err);
		res.sendStatus(500);
	});

});

module.exports = comments;
