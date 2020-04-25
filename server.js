require('dotenv').config();
const express = require('express');

const app = express();
const router = express.Router();
const path = `${__dirname}/views/`;
const path2 = `${__dirname}/img/`;
const path3 = `${__dirname}/js/`;
const path4 = `${__dirname}/css/`;

// various dependencies
const fs = require('fs');
const mongoose = require('mongoose');
const readline = require('readline');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const User = require('./user.js');

const { Schema } = mongoose;
const requireLogin = require('./middleware/requireLogin.js');
const updateButtons = require('./middleware/updateButtons');

// ------------------------Database setup--------------------------------//

// Courselist Database Setup
const ClassSchema = new Schema({
  classname: String,
  crn: String,
});

const Class = mongoose.model('Class', ClassSchema);

const groupSchema = new mongoose.Schema({
	classname: String,
    groupname: String,
    // meetingday: req.body.daypicker,
    starttime: String,
    endtime: String,
    members: [String],
    owner: String,

});
const Group = mongoose.model('Group', groupSchema);
// ------------------------End of Database Setup-------------------------//

// connecting to the database
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// setting up the rendering engine
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

// middleware
app.use(express.urlencoded({
  extended: true,
}));

app.use(cookieParser());
// middleware to set up sessions for logging in
app.use(session({
  key: 'user_sid',
  secret: '3214124312',
  resave: true,
  saveUninitialized: false,
  cookie: {
    expires: 600000,
  },
}));

// custom middleware to clear out the users log in status
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});

// more middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// creating the groups in the database
app.post('/makegroup', requireLogin, (req, res, next) => {
  const userName = req.session.firstname;
  const userId = req.session.user;
  userName.concat(' ');
  userName.concat(req.session.lastname);

  const groupData = {
    classname: req.body.classpicker,
    groupname: req.body.groupname,
    // meetingday: req.body.daypicker,
    starttime: req.body.starttimepicker,
    endtime: req.body.endtimepicker,
    members: [userId],
    owner: userId,
  };
  Group.create(groupData, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Adding group to the database:');
      console.log(groupData);
    }
  });
  res.redirect('/');
  next();
});

// adding to a group
app.post('/addgroup', requireLogin, (req, res, next) => {
  const userid = req.session.user;
  /*
  User.update({ _id: userid }, { $set: { groups: req.body.classpicker } }, (err, item) => {

  });
  */
  User.find({ _id: userid }, (err, item) => {
    console.log(item);
  });
  res.redirect('/');
  next();
});

/*
app.get('/group', (req, res) => {
// TODO: set up group page

});
*/
// set up readline variable
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

// exit on enter
rl.on('line', (line) => {
  if (line === '') {
    console.log('Goodbye');
    process.exit(0);
  }
});

// connect to the database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('successfully connected');
});


// ------------------------Start of Routing--------------------------------//

router.use((req, res, next) => {
  console.log(`/${req.method}`);
  next();
});

// loading the default page
router.get('/', updateButtons, (req, res) => {
  res.render('index.html');
});


// various pages scripts and images
router.get('/cal', (req, res) => {
  res.sendFile(`${path3}calendar.js`);
});
router.get('/calcss', (req, res) => {
  res.sendFile(`${path4}calendar.css`);
});

// router.get('/logoimg', (req, res) => { });

router.get('/img', (req, res) => {
  res.sendFile(`${path2}logo.png`);
});
router.get('/loginimg', (req, res) => {
  res.sendFile(`${path2}loginimg.png`);
});
router.get('/greytrees', (req, res) => {
  res.sendFile(`${path2}greytrees.jpg`);
});
router.get('/signupbackground', (req, res) => {
  res.sendFile(`${path2}signupbackground.jpg`);
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/contact', (req, res) => {
  res.render('contact');
});

// the dashboard page, with custom middleware requirign the user
// to be logged in
router.get('/dashboard', requireLogin, (req, res, next) => {
  let html = fs.readFileSync(`${path}dashboard.html`, 'utf8');
  html = html.replace('$USER', req.session.firstname);
  res.send(html);
  next();
});
// more pages and css
router.get('/dashcss', (req, res) => {
  res.sendFile(`${path4}dashboard.css`);
});
router.get('/aboutcss', (req, res) => {
  res.sendFile(`${path4}aboutus.css`);
});

router.get('/tutorial', (req, res) => {
  res.sendFile(`${path}tutorial.html`);
});

router.get('/addgoals', (req, res) => {
  res.sendFile(`${path2}addgoals.png`);
});
router.get('/deletegoal', (req, res) => {
  res.sendFile(`${path2}deletegoal.png`);
});
router.get('/scheduled', (req, res) => {
  res.sendFile(`${path2}scheduledevents.png`);
});
router.get('/creategimg', (req, res) => {
  res.sendFile(`${path2}createg.jpg`);
});
router.get('/mf', (req, res) => {
  res.sendFile(`${path2}mf.png`);
});
router.get('/mr', (req, res) => {
  res.sendFile(`${path2}mr.png`);
});
router.get('/gr', (req, res) => {
  res.sendFile(`${path2}gr.png`);
});
router.get('/lt', (req, res) => {
  res.sendFile(`${path2}lt.png`);
});
router.get('/hy', (req, res) => {
  res.sendFile(`${path2}hy.png`);
});
router.get('/moreinfo', (req, res) => {
  res.sendFile(`${path2}moreinfo.png`);
});
router.get('/aboutusheader', (req, res) => {
  res.sendFile(`${path2}aboutusheader.jpg`);
});
router.get('/login', (req, res) => {
  res.render('login.html');
});

router.get('/logincss', (req, res) => {
  res.sendFile(`${path4}login.css`);
});
// logout page
router.get('/logout', (req, res) => {
  req.session.user = null;
  req.session.firstname = null;
  res.clearCookie('user_id');
  res.locals.firstName = 'Login';
  res.locals.firstLink = '/login';
  res.locals.secondName = 'Sign Up';
  res.locals.secondLink = '/signup';
  res.render('index.html');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/signupcss', (req, res) => {
  res.sendFile(`${path4}signup.css`);
});

router.get('/calendar', (req, res) => {
  res.render('calendar');
});
router.get('/signup_success', (req, res) => {
  res.render('signup_success');
});

// renders the create groups page + pulls class list from database
router.get('/creategroup', (req, res) => {
  Class.find({}, (err, item) => {
    console.log(item[0]);
    console.log(item.length);
    console.log(item[0].classname);
    let x = 0;
    const name = [];

    while (x < item.length) {
      name.push(item[x].classname);
      x += 1;
    }
    res.render('creategroup', { item: name });
  });
});

router.get('/usergroups', (req, res) => {
	const userId = req.session.user;
  Group.find({}, (err, item) => {
	const found = [];
	let x = 0;
    while (x<item.length){
		if(item[x].members.includes(userId)){
			found.push(item[x])
		}
		x+=1;
	}
    res.render('usergroups', {
      groups:found
    });
  });
});


app.use('/', router);

// 404 if the any page is accessed that doesnt exist
app.use('*', (req, res) => {
  res.sendFile(`${path}404.html`);
});

app.listen(3000, () => {
  console.log('Live at Port 3000');
});

// login page
router.post('/login', (req, res) => {
  console.log(req.body);

  User.authenticate(User, req.body.inputEmail, req.body.password, (err, user) => {
    if (err) {
      let html = fs.readFileSync(`${path}login.html`, 'utf8');
      html = html.replace('<label for="ERROR"></label>', `<label for="ERROR">${err}</label>`);
      res.send(html);
    } else {
      req.session.user = user._id;
      req.session.firstname = user.firstname;
      res.redirect('dashboard');
    }
  });
});

// registring an account
router.post('/signup', (req, res) => {
  console.log(req.body);
  if (req.body.password[0] === req.body.password[1]) {
    console.log('password good');
  }
  const userData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.inputEmail,
    password: req.body.password[0],

  };
  User.init().then(() => {
    User.create(userData, (err) => {
      if (err) {
        if (err.code === 11000) {
          return res.status(400).json({
            msg: 'User already exists',
          });
        }
        console.log(err);
      } else {
        console.log('sent:');
        console.log(userData);
        return res.redirect('signup_success');
      }
      return res.redirect('/');
    });
  });
});

router.post('/class', (req, res) => {
  // Format data
  const userData = {
    classname: req.body.classname,
    crn: req.body.crn,

  };

  // Create object in database
  Class.create(userData, (err, user) => {
    if (err) {
      console.log(err);
      console.log(user);
    }
    return res.sendStatus(200);
  });
});

// Endpoint for pulling groups from the database
router.get('/findgroup', (req, res) => {
  // Database find command
  Group.find({}, (err, item) => {
    console.log(item); console.log(item.length);
    console.log(item[0].classname);
    let x = 0;
    const ids = [];
    const name = [];
    const day = [];
    const time = [];

    // Format the data in individual array for each value
    while (x < item.length) {
      ids.push(item[x].id);
      name.push(item[x].groupname);
      day.push(item[x].meetingday);
      time.push(item[x].meetingtime);
      x += 1;
    }

    // Render the page and inject the data
    res.render('findgroup', {
      item: name, day, time, ids,
    });
  });
});

// Endpoint for rendering the creategroup page with groups from database
router.get('/creategroup', (req, res) => {
  // Database find command
  Class.find({}, (err, item) => {
    console.log(item[0]);
    console.log(item.length);
    console.log(item[0].classname);
    let x = 0;
    const name = [];

    // Format data
    while (x < item.length) {
      name.push(item[x].classname);
      x += 1;
    }

    // Render the page
    res.render('creategroup', { item: name });
  });
});

// ------------------------End of Routing--------------------------------//
