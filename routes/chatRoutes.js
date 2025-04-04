const express = require('express');
const { chatWithOllama } = require('../controllers/chatController');

const router = express.Router();

// POST route for chatting with Ollama
router.post('/chat', chatWithOllama);

module.exports = router;
