const express = require('express');
const passportGoogle = require('passport');
const userController = require('../controllers/users.controllers');
const isAuthMiddleware = require('../middleware/isAuth');

const router = express.Router();

router.route('/auth/google').get(userController.showLoginGoogle);

router
  .route('/auth/google/callback')
  .get(
    passportGoogle.authenticate('google', { session: false }),
    userController.showLoginGoogleCallback,
  );

router.route('/auth/facebook').get(userController.showLoginFacebook);

router
  .route('/auth/facebook/callback')
  .get(
    passportGoogle.authenticate('facebook', { session: false }),
    userController.showLoginFacebookCallback,
  );

router.route('/auth/profile').get(isAuthMiddleware.isAuth, userController.showProfile);
router.route('/logout').get(userController.logout);

module.exports = router;
