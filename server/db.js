'use strict';

var pgpromise = require("pg-promise")();

//connection string for Postgres server
var connString = "postgres://video_user:Qwerty123456@localhost:5432/video_db";
exports.sessionConnString = "postgres://user2:Qwerty123456@localhost:5432/video_db";


exports.db = pgpromise(connString);
