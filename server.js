require("dotenv").config();
var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var path2 = __dirname + '/img/';
const mongoose = require("mongoose");
const readline = require("readline");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(session({
  key: "user_sid",
  secret: "3214124312",
  resave: true,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie('user_sid');        
  }
  next();
});
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


//create user model
var User = mongoose.model("User", UserSchema);

var db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error"));
db.once("open",()=>{
  console.log("successfully connected");
})


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

router.get("/dashboard",function(req,res){
  res.sendfile(path+"dashboard.html");
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

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});

router.post("/login", (req,res)=>{
  console.log(req.body);
  
  User.findOne({ email: req.body.inputEmail})
    .exec((err,user)=>{
      if (err){
        console.log(err);
      } else if (!user) {
        var err = new Error("User not found");
        err.status = 401;
        console.log(err);
      }
      bcrypt.compare(req.body.password,user.password,(err,result) => {
        if (result === true){
          console.log(user)
          req.session.user = user._id;
          res.redirect("dashboard")
        } else {
          var err = new Error("Incorrect password");
        }
      });
    });
})

//registring an accoutn
router.post("/signup",(req,res) => {
  
  console.log(req.body);
  if (req.body.password[0] === req.body.password[1]){
    console.log("password good");
  }
  var userData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.inputEmail,
    password: req.body.password[0]
  }
  User.create(userData, (err,user) => {
    if (err){
      console.log(err);
    } else {
      console.log("sent:");
      console.log(userData);
      return res.redirect("signup_success");
    }
  });
});