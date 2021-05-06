const express = require('express');
const router = express.Router();

const { passport } = require('../../app/middlewares');
const { userControllers } = require('../../app/controllers');

router.post('/signup', userControllers.create);

router.post('/login', userControllers.login);

router.get('/:id', userControllers.getUserData);

// Google login
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google'), userControllers.googleLogIn);

// FaceBook login
router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', passport.authenticate('facebook'), userControllers.faceBookLogIn);

module.exports = router;
