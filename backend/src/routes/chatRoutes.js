const express = require('express');
const router = express.Router();
const { handleMessage } = require('../controllers/chatController');
const { verifyToken } = require('../middleware/authMiddleware');

// POST /api/chat
// Protected route: user must be authenticated
router.post('/', verifyToken, handleMessage);

module.exports = router;
