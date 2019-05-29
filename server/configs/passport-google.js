// server/configs/passport-google.js
const GoogleStrategy = require('passport-google-oauth20').Strategy;
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
    new GoogleStrategy(
      {
        clientID: '12174401006-ed9evg3ocj8hq8g3fa63sr5erv9l32id.apps.googleusercontent.com',
        clientSecret: '5VQH_0aO76kbyv2YhquNMsSU',
        callbackURL: '/auth/google/callback',
        proxy: true,
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ email: profile.emails[0].value }).then((user) => {
          if (user) {
            const payload = {
              id: user._id,
              name: user.name,
              avatar: user.avatarUrl,
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
          }
          const newUser = new User();
          newUser.googleId = profile.id;
          newUser.name = profile.displayName;
          newUser.email = profile.emails[0].value;
          newUser.avatar = profile.photos[0].value.replace('sz=50', 'sz=128');

          newUser.save().then((newuser) => {
            const payload = {
              id: newuser._id,
              name: newUser.name,
              avatar: newuser.avatarUrl,
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
