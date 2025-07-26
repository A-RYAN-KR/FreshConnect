 // src/api/auth/auth.routes.js
const express = require('express');
const { register, login, getMe } = require('../controllers/userController');
const { validateRegister, validateLogin } = require('../middleware/authValidation');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/me', protect, getMe);

module.exports = router;