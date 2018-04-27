'use strict';

var express = require("express");
var multer = require("multer");

var dbconst = require("./db.js");

var videos = express.Router();
var upload = multer({dest: 'videos/'});



//list all videos
videos.get("/", function(req, res) {
  console.log("GET request for videos received");

	dbconst.db.any('select id, description, location, views from videos',[])
		.then(function(data) {
			console.log(data.length + "rows received");
			res.json(data);
		}).catch(function(err) {
			console.log("query error: " + err);			
			res.sendStatus(500);
	});

});



//get video by ID
videos.get('/:id', function(req, res) {
  console.log("GET request for video %s received", req.params.id);

	dbconst.db.any("select id, description, location, views from videos where id = $1", [req.params.id])
	.then(function(data) {
		console.log(data.length + " rows received");
		if (data.length > 0) {
			res.json(data[0]);
			let views = data[0].views;
			views++;
			let id = data[0].id;
			
			console.log("ID: " + id + ", views: " + views);

			dbconst.db.none("update videos set views = $1 where id=$2",
				[views, id]
			).then(function(data) {
				console.log("Views updated");	
			}).catch(function(err) {
				console.log("unable to update the views for this video");
			});

		} else {
			res.sendStatus(404);
		}
	}).catch(function(err) {
		console.log("Query error: " + err);
		res.sendStatus(500);
	});


});

//get video categories by ID
videos.get('/:id/categories', function(req, res) {
    console.log("GET request for video %s 's categories received", req.params.id);

    dbconst.db.any("select vc.category_id,c.name from category_video_rel vc left join video_categories c on (vc.category_id = c.id) where video_id=$1", req.params.id)
	   .then(function(data) {
	       console.log(data.length + " rows received");
	       res.json(data);
	   }).catch(function(err) {
	       console.log("Query error: " + err);
	       res.sendStatus(500);
	   });


});

//get video playlists by ID
videos.get('/:id/playlists', function(req, res) {
    console.log("GET request for video %s 's playlists received", req.params.id);

    dbconst.db.any("select vp.playlist_id, p.name from playlist_video_rel vp left join playlists p on (vp.playlist_id = p.id) where video_id = $1", req.params.id)
	   .then(function(data) {
	       console.log(data.length + " rows received");
	       res.json(data);
	   }).catch(function(err) {
	       console.log("Query error: " + err);
	       res.sendStatus(500);
	   });


});



//modify video
videos.put('/:id', function(req, res) {
  console.log("put request for updating the video id %s received", req.params.id);

	dbconst.db.none("update videos set description = $1 where id =$2",
		[req.body.description, req.params.id])
	.then(function(data) {
		console.log("update successful");
		res.sendStatus(200);
	}).catch(function(err) {
		console.log("Query error: " + err);
		res.sendStatus(500);
	});

});


//Delete video
videos.delete('/:id', function(req, res) {
    console.log("DELETE request for updating the video id %s received", req.params.id);
    dbconst.db.none("delete from comments where video_id = $1", [req.params.id])
	   .then(function(data) {
	       dbconst.db.none("delete from likes where video_id = $1", [req.params.id])
	   }).then(function(data) {
	       dbconst.db.none("delete from playlist_video_rel where video_id = $1", [req.params.id])
	   }).then(function(data) {
	       dbconst.db.none("delete from category_video_rel where video_id = $1", [req.params.id])
	   }).then(function(data) {
	       dbconst.db.none("delete from videos where id = $1", [req.params.id])
	   }).then(function(data) {
	       console.log("delete successful");
	       res.sendStatus(200);
	   }).catch(function(err) {
	       console.log("Query error: " + err);
	       res.sendStatus(500);
	   });

});

//Add a new video
videos.post('/', upload.single("videoToUpload"), function(req,res) {
    console.log('POST request for creating a video received');

    dbconst.db.none("insert into videos(description, location, views) values($1, $2, 0)",
		    [req.body.description, req.file.filename])
   .then(function(data) {
       console.log("Video uploaded");
       res.sendStatus(201);
   }).catch(function(err) {
       console.log("Query error: " + err);
       res.sendStatus(500);
   });
});





module.exports = videos;
