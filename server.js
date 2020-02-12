var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var path2 = __dirname + '/img/';

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});
router.get("/logoimg",function(req,res){
  res.sendFile(path2 + "logo.png");
});
router.get("/loginimg",function(req,res){
  res.sendFile(path2 + "loginimg.png");
});
router.get("/greytrees",function(req,res){
  res.sendFile(path2 + "greytrees.jpg");
});
router.get("/signupbackground",function(req,res){
  res.sendFile(path2 + "signupbackground.jpg");
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