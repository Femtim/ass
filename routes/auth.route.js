const express = require('express')
const { register, login} = require('../controllers/authentication.controller');
const { allUser, dashboard, userUpload,  } = require('../controllers/dashboard.controller');
const { authenticate } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/login', login);

router.post('/register', register );

router.get('/allUser', allUser);
router.get('/dashboard', authenticate, dashboard);

router.post('/upload', userUpload)

module.exports= router