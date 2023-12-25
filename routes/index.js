const express = require('express');
const router = express.Router();
const userModel = require('./users');
const postModel = require('./post')
const passport = require('passport');
const { render } = require('ejs');
const LocalStrategy = require('passport-local').Strategy;
const upload = require('./multer')

passport.use(new LocalStrategy(userModel.authenticate()));

router.get('/', redirectIfLoggedIn, (req, res) => {
  res.render('register');
});
router.get('/feed', isLoggedIn, async (req, res) => {
  try {
    // Fetch all posts from the database
    const allPosts = await postModel.find().populate('user'); // Assuming 'user' is the field referencing the user who created the post
    
    res.render('feed', { allPosts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/profile', isLoggedIn, async (req, res) => {
    const user = await userModel.findOne({
      username: req.session.passport.user
    }).populate('posts')
    
    res.render('profile', { user }); // Pass user data as an object
 
  });
router.get('/login', redirectIfLoggedIn, function (req, res) {

  res.render('login', { error: req.flash('error') });
});
router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

router.get('/create', isLoggedIn, (req, res) => {
  res.render('create')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/feed',
  failureRedirect: '/login',
  failureFlash: true
}));
router.post('/register', async (req, res) => {
  try {
    const newUser = new userModel({
      username: req.body.username,
      email: req.body.email,
      fullname: req.body.fullName,
    });

    userModel.register(newUser, req.body.password, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error in user registration' });
      }
      passport.authenticate('local')(req, res, () => {
        res.redirect('/feed');
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/createPost', isLoggedIn, upload.single('file'), async (req, res) => {
  
    if (!req.file) {
      return res.status(400).send('No file was uploaded');
    }

    const user = await userModel.findOne({
      username: req.session.passport.user
    });

    const postData = await postModel.create({
      file: req.file.filename,
      postCaption: req.body.caption, // Check if this should be req.body.caption
      user: user._id
    });

    // Update user's posts array in the database
    user.posts.push(postData._id);
    await user.save(); // Save the changes to the user

    res.redirect('/profile')
  
});



function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function redirectIfLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    // If user is logged in, redirect them away from register/login pages
    res.redirect('/feed'); // You can change this redirect path as needed
  } else {
    // If user is not logged in, allow them to access register/login pages
    next();
  }
}

module.exports = router;