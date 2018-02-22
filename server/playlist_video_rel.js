'use strict';

var express = require("express");

var dbconst = require("./db.js");

var playlist_video_rel = express.Router();


//list all playlist_video_rel
playlist_video_rel.get("/:userId/playlists/:playlistId/videos", function(req, res) {
  console.log("GET request for videos in playlist %s for user %s received", req.params.playlistId, req.params.userId);

	dbconst.db.any('select p.id, p.video_id, v.description  from playlist_video_rel p join videos v on p.video_id = v.id where p.playlist_id = $1',[req.params.playlistId])
		.then(function(data) {
			console.log(data.length + "rows received");
			res.json(data);
		}).catch(function(err) {
			console.log("query error: " + err);			
			res.sendStatus(500);
	});

});


//Delete playlist_video_rel
playlist_video_rel.delete('/:userId/playlists/:playlistId/videos/:id', function(req, res) {
  console.log("DELETE request for removing the video %s from playlist %s received for user %s", req.params.id, req.params.playlistId, req.params.userId);

    dbconst.db.none("delete from playlist_video_rel where video_id = $1 and playlist_id = $2", [req.params.id, req.params.playlistId])
	.then(function(data) {
		console.log("delete successful");
		res.sendStatus(200);
	}).catch(function(err) {
		console.log("Query error: " + err);
		res.sendStatus(500);
	});

});


//Add a new playlist_video_rel
playlist_video_rel.post('/:userId/playlists/:playlistId/videos', function(req,res) {
  console.log('POST request for adding new video to a playlist %s for user %s received', req.params.playlistId, req.params.userId);

	let video_id = req.body.video_id;

	dbconst.db.none("insert into playlist_video_rel(video_id, playlist_id) values($1, $2)", 
		[video_id, req.params.playlistId])
	.then(function(data) {
		console.log("Video added to a playlist");
		res.sendStatus(201);
	}).catch(function(err) {
		console.log("Query error: " + err);
		res.sendStatus(500);
	});

});

module.exports = playlist_video_rel;
