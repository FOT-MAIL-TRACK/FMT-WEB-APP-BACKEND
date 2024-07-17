const express = require('express');
const { createLetter,updateLetterStatus} = require('../controllers/letterControllers')
const router = express.Router();

router.post('/letters',  createLetter);
router.put('/letters/:letterId', updateLetterStatus);

module.exports = router;


