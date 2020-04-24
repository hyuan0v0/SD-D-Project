const updateButtons = (req, res, next) => {
  if (req.session && req.cookies.user_sid) {
    // user is logged in
    res.locals.firstName = 'My Dashboard';
    res.locals.firstLink = '/dashboard';
    res.locals.secondName = 'Log out';
    res.locals.secondLink = '/logout';
  } else {
    res.locals.firstName = 'Login';
    res.locals.firstLink = '/login';
    res.locals.secondName = 'Sign Up';
    res.locals.secondLink = '/signup';
  }
  next();
};

module.exports = updateButtons;
