require("dotenv").config();
var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var path2 = __dirname + '/img/';
var path3 = __dirname + '/js/';
var path4 = __dirname + '/css/';

//various dependencies
const fs = require("fs");
const mongoose = require("mongoose");
const readline = require("readline");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const User = require("./user.js");
const Schema = mongoose.Schema;
const requireLogin = require("./middleware/requireLogin.js");
var bodyParser = require('body-parser');

//connecting to the database
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

//setting up the rendering engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//middleware
app.use(express.urlencoded({
    extended: true
}));

app.use(cookieParser());
//middleware to set up sessions for logging in
app.use(session({
    key: "user_sid",
    secret: "3214124312",
    resave: true,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

//custom middleware to clear out the users log in status
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

//more middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//creating the groups in the database
app.post("/makegroup", requireLogin, (req, res, next) => {
  var userName = req.session.firstname;
  userName.concat(" ");
  userName.concat(req.session.lastname);

  var groupData = {
        classname: req.body.classpicker,
        meetingday: req.body.daypicker,
        meetingtime: req.body.timepicker,
        members: [userName]
    }
    Group.create(groupData, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Adding group to the database:");
            console.log(groupData);
            res.redirect("/dashboard");
        }
    });
});

//adding to a group
app.post("/addgroup", requireLogin, (req, res, next) => {
	var userid = req.session.user;
	
	User.update({"_id":userid},{$set:{"groups": req.body.classpicker}},function(err, item) {
		
    })
	User.find({"_id":userid},function(err, item) {
      console.log(item)
    })
	res.redirect("/");


  
});

app.get("/group",function (req, res) {
	//TODO: set up group page
	
});
//set up readline variable
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

//exit on enter
rl.on("line", (line) => {
    if (line === "") {
        console.log("Goodbye");
        process.exit(0);
    }
})

//connect to the database
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("successfully connected");
})


//------------------------Start of Routing--------------------------------//

router.use(function (req, res, next) {
    console.log("/" + req.method);
    next();
});

//loading the default page
router.get("/", function (req, res) {
    if (req.session.user && req.cookies.user_sid){
        //TODO: replace this with rendering stuff instead
        let html = fs.readFileSync(path+"index.html","utf8");
        html = html.replace(`<ul class="nav navbar-nav navbar-right">
        <li class="nav-item">
          <a class="nav-link" href="/login"><span>Login</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/signup"><span>Sign Up</span></a>
        </li>
      </ul>`,`<ul class="nav navbar-nav navbar-right">
        <li class="nav-item">
          <a class="nav-link" href="/dashboard"><span>My Dashboard</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/logout"><span>Log out</span></a>
        </li>
      </ul>`);
        res.send(html);
    } else {
        res.render("index.html");
    }
});


//various pages scripts and images
router.get("/cal", function (req, res) {
    res.sendFile(path3 + "calendar.js");
});
router.get("/calcss", function (req, res) {
    res.sendFile(path4 + "calendar.css");
});

router.get("/logoimg", function (req, res) { });

router.get("/img", function (req, res) {
    res.sendFile(path2 + "logo.png");
});
router.get("/loginimg", function (req, res) {
    res.sendFile(path2 + "loginimg.png");
});
router.get("/greytrees", function (req, res) {
    res.sendFile(path2 + "greytrees.jpg");
});
router.get("/signupbackground", function (req, res) {
    res.sendFile(path2 + "signupbackground.jpg");
});

router.get("/about", function (req, res) {
    res.render("about");
});

router.get("/contact", function (req, res) {
    res.render("contact");
});

//the dashboard page, with custom middleware requirign the user
//to be logged in
router.get("/dashboard", requireLogin, function (req, res,next) {
    let html = fs.readFileSync(path+"dashboard.html","utf8");
    html = html.replace("$USER", req.session.firstname);
    res.send(html);
});
//more pages and css
router.get("/dashcss", function (req, res) {
    res.sendFile(path4 + "dashboard.css");
});

router.get("/tutorial", function (req, res) {
    res.sendFile(path + "tutorial.html");
});
router.get("/addgoals", function (req, res) {
    res.sendFile(path2 + "addgoals.png");
});
router.get("/deletegoal", function (req, res) {
    res.sendFile(path2 + "deletegoal.png");
});
router.get("/scheduled", function (req, res) {
    res.sendFile(path2 + "scheduledevents.png");
});
router.get("/creategimg", function (req, res) {
    res.sendFile(path2 + "createg.jpg");
});
router.get("/login", function (req, res) {
    res.render("login.html");
});

router.get("/logincss", function (req, res) {
    res.sendFile(path4 + "login.css");
});
//logout page
router.get("/logout", function(req,res) {
    req.session.user = null;
    req.session.firstname = null;
    res.clearCookie("user_id");
    res.redirect("/");
})

router.get("/signup", function (req, res) {
    res.render("signup");
});

router.get("/signupcss", function (req, res) {
    res.sendFile(path4 + "signup.css");
});

router.get("/calendar", function (req, res) {
    res.render("calendar");
});
router.get("/signup_success", function (req, res) {
    res.render("signup_success");
})

//renders the create groups page + pulls class list from database
router.get("/creategroup",function(req,res){
  Class.find({},function(err, item) {
      console.log(item[0]);
      console.log(item.length);
      console.log(item[0].classname);
      var x = 0;
      let name = [];
      
      while(x<item.length){
         name.push(item[x].classname);
         x+=1;
      }
      res.render("creategroup",{item: name});
    })
});
//renders find groups and pulls  groups from the database
router.get("/findgroup",function(req,res){
    
    Group.find({},function(err, item) {
      console.log(item); console.log(item.length);
      console.log(item[0].classname);
      var x = 0;
      let ids = []
      let name = [];
      let day = [];
      let time = [];
      
      
      while(x<item.length){
         ids.push(item[x].id);
         name.push(item[x].classname);
         day.push(item[x].meetingday);
         time.push(item[x].meetingtime);
         time
         x+=1;
      }
      res.render("findgroup",{item: name, day:day,time:time, ids:ids});
    })
    
});


app.use("/", router);

//404 if the any page is accessed that doesnt exist
app.use("*", function (req, res) {
    res.sendFile(path + "404.html");
});

app.listen(3000, function () {
    console.log("Live at Port 3000");
});

//login page
router.post("/login", (req, res) => {
    console.log(req.body);

    User.authenticate(User, req.body.inputEmail, req.body.password, (err, user) => {
        if (err) {
            html = fs.readFileSync(path+"login.html","utf8");
            html = html.replace(`<label for="ERROR"></label>`,`<label for="ERROR">${err}</label>`)
            res.send(html);
        } else {
            req.session.user = user._id;
            req.session.firstname = user.firstname;
            res.redirect("dashboard");
        }
    });
});

//registring an account
router.post("/signup", (req, res) => {

    console.log(req.body);
    if (req.body.password[0] === req.body.password[1]) {
        console.log("password good");
    }
    var userData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.inputEmail,
        password: req.body.password[0]

    }
    User.init().then(() => {
        User.create(userData, (err, user) => {
            if (err) {
                if (err.code === 11000) {
                    return res.status(400).json({
                        msg: "User already exists"
                    })
                }
                console.log(err);
            } else {
                console.log("sent:");
                console.log(userData);
                return res.redirect("signup_success");
            }
        });
    });
});

router.post("/class",(req,res) => {

  // Format data
  var userData = {
    classname: req.body.classname,
    crn: req.body.crn,
    
  }
  
  // Create object in database
  Class.create(userData, (err,user) => {
    if (err){
      console.log(err);
    } else {
        return res.sendStatus(200)
    }
  });
});

// Endpoint for pulling groups from the database
router.get("/findgroup",function(req,res){
	
	// Database find command
	Group.find({},function(err, item) {
      console.log(item); console.log(item.length);
	  console.log(item[0].classname);
	  var x = 0;
	  let ids = []
	  let name = [];
	  let day = [];
	  let time = [];
	  
	  // Format the data in individual array for each value
	  while(x<item.length){
		 ids.push(item[x].id);
		 name.push(item[x].classname);
		 day.push(item[x].meetingday);
		 time.push(item[x].meetingtime);
		 time
		 x+=1;
	  }
	  
	  // Render the page and inject the data
	  res.render("findgroup",{item: name, day:day,time:time, ids:ids});
    })
	

});

// Endpoint for rendering the creategroup page with groups from database
router.get("/creategroup",function(req,res){
	
	// Database find command
	Class.find({},function(err, item) {
      console.log(item[0]);
	  console.log(item.length);
	  console.log(item[0].classname);
	  var x = 0;
	  let name = [];
	  
	  // Format data
	  while(x<item.length){
		 name.push(item[x].classname);
		 x+=1;
	  }
	  
	  // Render the page
	  res.render("creategroup",{item: name});
    })
});

//------------------------End of Routing--------------------------------//


//------------------------Database setup--------------------------------//

//Courselist Database Setup
var ClassSchema = new Schema({
    classname: String,
    crn: String,
});

var Class = mongoose.model("Class", ClassSchema);

var groupSchema = new mongoose.Schema({
 classname: String,
 meetingday: String,
 meetingtime: String,
 members: [String]
});
var Group = mongoose.model("Group", groupSchema);
//------------------------End of Database Setup-------------------------//