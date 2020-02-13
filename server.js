var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var path2 = __dirname + '/img/';

const bodyParser=require("body-parser");

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
  res.sendFile(path + "test.html");
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

