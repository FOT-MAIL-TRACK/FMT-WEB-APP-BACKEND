// routes/adminRoutes.js
const express = require('express');
const { getAllUsers, getAllLettersWithLogs, createUser, updateUser, deleteUser } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRole');
const router = express.Router();

router.get('/users', authMiddleware, checkRole(['Super Admin']), (req, res) => {
    console.log("GET /users route hit");
    getAllUsers(req, res);
});
router.post('/users', authMiddleware, checkRole(['Super Admin']), createUser);
router.put('/users/:id', authMiddleware, checkRole(['Super Admin']), updateUser);
router.delete('/users/:id', authMiddleware, checkRole(['Super Admin']), deleteUser);
router.get('/letters', authMiddleware, checkRole(['Super Admin']), getAllLettersWithLogs);

console.log("Admin routes loaded");


module.exports = router;