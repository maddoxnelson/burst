const express = require('express');
const router = express.Router();
const burstController = require('../controllers/burstController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

module.exports = router;

router.get('/', catchErrors(burstController.getBursts));
router.get('/write', burstController.addBurst);

router.get(`/burst/:slug`, catchErrors(burstController.getBurstBySlug));

router.post('/write',
  catchErrors(burstController.createBurst)
);

// Genres
router.get('/genre/:genre',
  catchErrors(burstController.showBurstsByGenre)
)

// Authors
router.get('/author/:slug',
  authController.isLoggedIn,
  catchErrors(burstController.getBurstsByAuthor)
);

// User and authentication routes
router.get('/login', userController.loginForm);
router.get('/register', userController.registerForm);
router.post('/login', authController.login);

// validate registration
router.post('/register',
  userController.validateRegister,
  userController.register,
  authController.login
);

router.get('/logout', authController.logout);
