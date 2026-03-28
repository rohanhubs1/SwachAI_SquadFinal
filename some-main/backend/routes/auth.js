const express = require('express');
const router = express.Router();
const { signup, login, getPublicDrivers } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/public-drivers', getPublicDrivers);

module.exports = router;
