//Modules import
"use strict"; 


var https = require("https");
var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var pg = require("pg");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var pgSession = require("connect-pg-simple")(session);

const db = require("./server/db.js");

//Main app declaration
var app = express();

//app configuration
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.static("public/dashboard"));
app.use(express.static("public/categories"));
app.use(session({
	secret: "fv'eklm'llkndf",
	resave: false,
	cookie: {maxAge: 5 * 60 * 1000},
	store: new pgSession({
		conString: db.sessionConnString
	}),
	saveUninitialized: true
}));

//====Routing and request processing=======

//authorization
var auth = require("./server/auth.js");
app.use('/api/auth', auth);

//users
var users = require("./server/users.js");
app.use('/api/users', users);

//plalists
var playlists = require("./server/playlists.js");
app.use('/api/users', playlists);

//videos in a playlist
var playlist_video_rel = require("./server/playlist_video_rel.js");
app.use('/api/users', playlist_video_rel);

//videos
var videos = require("./server/videos.js")
app.use('/api/videos', videos);

//likes
var likes = require("./server/likes.js");
app.use("/api/videos", likes);

//comments
var comments = require("./server/comments.js");
app.use("/api/videos", comments);

//video categories
var video_categories = require("./server/video_categories.js");
app.use('/api/video_categories', video_categories);

//videos in a category
var category_video_rel = require("./server/category_video_rel.js");
app.use('/api/video_categories/', category_video_rel);

//Default routing
app.get('/*', function(req, res) {

  console.log("GET request for /*");

	res.sendFile(__dirname + "/public/index.html");

});


https.createServer(
	{
		key: fs.readFileSync(__dirname + "/cert/key.pem"),
		cert: fs.readFileSync(__dirname +  "/cert/cert.pem")
	},
		app
).listen(8081, function() {

  var host = this.address().address;
  var port = this.address().port;

  console.log("Server started at %s:%s", host, port);

});

