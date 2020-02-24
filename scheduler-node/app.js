var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");

//connect to the mongoDB
var db = require('mongoskin').db("mongodb://localhost/testdb", { w: 0});
    db.bind('event');

//create express app, use public folder for static files
var app = express();
app.use(express.static(path.join(__dirname, 'public')));

//is necessary for parsing POST request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000);