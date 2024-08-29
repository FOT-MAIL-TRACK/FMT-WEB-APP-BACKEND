const express = require('express');
const { createLetter,updateLetterStatus} = require('../controllers/letterControllers')
const router = express.Router();

router.post('/createletter',  createLetter);
router.put('/letters/:letterId', updateLetterStatus);

module.exports = router;


