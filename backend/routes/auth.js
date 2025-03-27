const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { 
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/drive.file'
  ]
}));

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    console.log('User in callback:', req.user);
    res.redirect(`http://localhost:3000/callback?token=${req.user.token}`);
  }
);

module.exports = router;