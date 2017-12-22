'use strict';

var express = require("express");

var dbconst = require("./db.js");

var category_video_rel = express.Router();


//list all category_video_rel
category_video_rel.get("/:catId/videos", function(req, res) {
  console.log("GET request for videos in category %s received", req.params.catId);

	dbconst.db.any('select c.id, c.video_id, v.description from category_video_rel c join videos v on c.video_id = v.id  where c.category_id = $1',[req.params.catId])
		.then(function(data) {
			console.log(data.length + "rows received");
			res.json(data);
		}).catch(function(err) {
			console.log("query error: " + err);			
			res.sendStatus(500);
	});

});


//Delete category_video_rel
category_video_rel.delete('/:catId/videos/:id', function(req, res) {
  console.log("DELETE request for removing the video %s from category %s received", req.params.id, req.params.catId);

	dbconst.db.none("delete from category_video_rel where id = $1 and category_id = $2", [req.params.id, req.params.catId])
	.then(function(data) {
		console.log("delete successful");
		res.sendStatus(200);
	}).catch(function(err) {
		console.log("Query error: " + err);
		res.sendStatus(500);
	});

});


//Add a new category_video_rel
category_video_rel.post('/:catId/videos', function(req,res) {
  console.log('POST request for adding new video to a category %s received', req.params.catId);

	let video_id = req.body.video_id;

	dbconst.db.none("insert into category_video_rel(video_id, category_id) values($1, $2)", 
		[video_id, req.params.catId])
	.then(function(data) {
		console.log("Video added to a category");
		res.sendStatus(201);
	}).catch(function(err) {
		console.log("Query error: " + err);
		res.sendStatus(500);
	});

});

module.exports = category_video_rel;
