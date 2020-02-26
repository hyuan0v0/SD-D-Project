require("dotenv").config();
var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var path2 = __dirname + '/img/';
const mongoose = require("mongoose");
const readline = require("readline");
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
});