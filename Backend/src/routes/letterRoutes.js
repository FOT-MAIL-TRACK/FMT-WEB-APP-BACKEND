    const express = require('express');
    const { createInternalLetter,createExternalLetter, updateLetterStatus,getLetterById, getAllLetters ,getLetterbyRegno} = require('../controllers/letterControllers')
    const authMiddleware = require('../middleware/authMiddleware');
    const checkRole = require('../middleware/checkRole');
    const router = express.Router();


    // Routes for creating internal and external letters
    router.post(
      '/create-internal-letter',
      authMiddleware,
      checkRole(['Super Admin', 'PostalDepartmentMA']),
      createInternalLetter
    );

    router.post(
      '/create-external-letter',
      authMiddleware,
      checkRole(['Super Admin', 'PostalDepartmentMA']),
      createExternalLetter
    );

// Route for updating letter status (common for both internal and external)
router.put('/letters/:letterId', updateLetterStatus);

// Route for getting a letter by its ID
router.get('/letters/:id', getLetterById);

router.get('/letters', getAllLetters); // Add this line

router.get('/user/:registrationNumber', getLetterbyRegno);


module.exports = router;


