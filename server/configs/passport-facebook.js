const FacebookStrategy = require('passport-facebook').Strategy;
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

const JwtStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;

const User = require('../models/User');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'nextjs-node-rest-api-startkit';

module.exports = (passport) => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: '313766442850367',
        clientSecret: '5b3d329f666d81c37314adf1d3cc6f1b',
        callbackURL: '/auth/facebook/callback',
        profileFields: ['id', 'emails', 'first_name', 'last_name', 'gender' ,'displayName' , 'picture.type(large)'],
        proxy: true,
      },
      (accessToken, refreshToken, profile, done) => {
          User.findOne({ email: profile.emails[0].value }).then((user) => {
            if (user) {
              const payload = {
              id: user._id,
              name: user.name,
              avatar: user.avatar,
            };
            jwt.sign(
              payload,
              'nextjs-node-rest-api-startkit',
              { expiresIn: '1h' },
              (err, token) => {
                if (err) {
                  return done(null, err);
                }
                return done(null, { user, token });
              },
            );
            }else {
            const newUser = new User();
            newUser.name = profile.displayName;
            newUser.email = profile.emails[0].value;
            newUser.avatar = profile.photos[0].value;
            
            newUser.save().then((newuser) => {
            const payload = {
              id: newuser._id,
              name: newUser.name,
              avatar: newuser.avatar,
            };
            jwt.sign(
              payload,
              'nextjs-node-rest-api-startkit',
              { expiresIn: '1h' },
              (err, token) => {
                if (err) {
                  return done(null, err);
                }
                return done(null, { newuser, token });
              },
            );
          });
            }
          });
      },
    ),
  );
  passport.use(
    new JwtStrategy(opts, (jwtpayload, done) => {
      User.findOne({ _id: jwtpayload.id }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      });
    }),
  );
};
