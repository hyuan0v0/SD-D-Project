var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var path2 = __dirname + '/img/';

const bodyParser=require("body-parser");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/gfg');
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
})

app.use(express.static(__dirname));
app.use('/css',express.static(__dirname +'/css'));
app.use(bodyParser.json());
app.use(express.static('views'));
app.use(bodyParser.urlencoded({
	extended: true
}))

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/img",function(req,res){
  res.sendFile(path2 + "logo.png");
});

router.get("/about",function(req,res){
  res.sendFile(path + "about.html");
});

router.get("/contact",function(req,res){
  res.sendFile(path + "contact.html");
});

router.get("/login",function(req,res){
  res.sendFile(path + "login.html");
});

router.get("/signup",function(req,res){
  res.sendFile(path + "signup.html");
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});

app.post('/sign_up',function(req,res){ 
	var username = req.body.username;
	var pass = req.body.password;

  var data = { 
		"username": username,
		"password":pass,
	}
  db.collection('details').insertOne(data,function(err,collection){ 
    if (err) throw err;
    console.log("Record inserted Successfully");
  });
  return res.redirect('signup_success.html');
})