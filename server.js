require("dotenv").config();
var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var path2 = __dirname + '/img/';
const mongoose = require("mongoose");
const readline = require("readline");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.urlencoded({
  extended: true
}));
//set up readline variable
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

//exit on enter
rl.on("line",(line)=>{
  if (line === ""){
    console.log("Goodbye");
    process.exit(0);
  }
})
//create user schema
var UserSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String
});

UserSchema.pre("save", function(next) {
  console.log(this);
  var user = this;
  console.log(user.password)
  bcrypt.hash(user.password,10,(err,hash)=>{
    if (err){
      console.log(err);
      return err;
    }
    user.password = hash;
    next();
  });
});

//authenticate user log in
UserSchema.statics.authenticate = (email,password,callback) => {
  User.findOne({ email: email})
    .exec((err,user)=>{
      if (err){
        return callback(err);
      } else if (!user) {
        var err = new Error("User not found");
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password,user.password,(err,result) => {
        if (result === true){
          return callback(null,user);
        } else {
          return callback();
        }
      });
    });
}

//create user model
var User = mongoose.model("User", UserSchema);

var db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error"));
db.once("open",()=>{
  console.log("successfully connected");
})

//site navigation
router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});
router.get("/logoimg",function(req,res){});

router.get("/img",function(req,res){
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
router.get("/signup_success",function(req,res){
  res.sendFile(path+"signup_success.html");
})

router.get("/signup",function(req,res){
  res.sendFile(path + "signup.html");
});

router.get("/creategroup",function(req,res){
  res.sendFile(path + "createGroup.html");
});

router.get("/getClass",function(req,res){
  console.log("Creating Group")
  res.sendFile(path + "createGroup.html");
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

//local host running message
app.listen(3000,function(){
  console.log("Live at Port 3000");
});

//registring an account
router.post("/signup",(req,res) => {
  console.log(req.body);
  if (req.body.password[0] === req.body.password[1]){
    console.log("password good");
  }
  var userData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password[0]
  }
  User.create(userData, (err,user) => {
    if (err){
      console.log(err);
    } else {
      return res.redirect("signup_success");
    }
  });
});