//Modules import
"use strict"; 

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

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
app.use(session({
    secret: "fv'eklm'llkndf",
    resave: false,
    cookie: {maxAge: 5 * 60 * 1000},
    store: new pgSession({
	conString: db.sessionConnString
    }),
    saveUninitialized: true
}));

//Video views counter middleware
app.use(function(req, res, next) {
    if (!req.session.views) {
	console.log("nope nope nope");
	req.session.views++;
    }
    if (/^\/api\/videos\/\d+$/.test(req.originalUrl)) {
	if (!req.session.user) {
	    if (req.session.views === NaN)
		req.session.views = 0;
	    req.session.views++;
	    console.log("Already viewed: " + req.session.views);
	    if (req.session.views >= 9) {
		console.log("More than 9 views, nuh-uh");
		req.session.views = 9;
		res.sendStatus(401);
	    }
	}
    }
    next();
});

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

//Video file link
app.get("/api/content/:contentId", function(req, res) {
    console.log("Content request for " + req.params.contentId);
    res.sendFile(__dirname + "/videos/" + req.params.contentId);
});

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

