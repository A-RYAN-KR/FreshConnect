// backend/routes/contact.routes.js (or similar)
const express = require('express');
const router = express.Router();

const { handleContactForm } = require('../controllers/contactController');
// Notice 'protect' is not imported or used here

router.post('/', handleContactForm); 

module.exports = router;