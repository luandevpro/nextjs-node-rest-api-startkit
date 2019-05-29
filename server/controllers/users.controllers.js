const passportGoogle = require('passport');

require('../configs/passport-google')(passportGoogle);

exports.showLoginGoogle = (req, res, next) => {
  passportGoogle.authenticate('google', {
    scope: ['profile', 'email'],
  })(req, res, next);
};

exports.showLoginGoogleCallback = async (req, res) => {
  const OPTION_COOKIES = {
    signed: true,
    path: '/',
    domain: 'localhost',
    expires: new Date(Date.now() + 900000),
    httpOnly: true,
  };
  await res.cookie('token', req.user.token, OPTION_COOKIES);
  return res.redirect('/');
};

exports.showProfile = async (req, res) => {
  const user = await req.user;
  res.json(user);
};

exports.logout = async (req, res) => {
  await res.clearCookie('token');
  return res.redirect('/login');
};
