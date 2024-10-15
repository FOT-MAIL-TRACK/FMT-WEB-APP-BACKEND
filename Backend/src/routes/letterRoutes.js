const express = require('express');
const { createInternalLetter,createExternalLetter, updateLetterStatus,getLetterById, getAllLetters} = require('../controllers/letterControllers')
const router = express.Router();

// Routes for creating internal and external letters
router.post('/create-internal-letter', createInternalLetter);
router.post('/create-external-letter', createExternalLetter);

// Route for updating letter status (common for both internal and external)
router.put('/letters/:letterId', updateLetterStatus);

// Route for getting a letter by its ID
router.get('/letters/:id', getLetterById);

router.get('/letters', getAllLetters); // Add this line


module.exports = router;


