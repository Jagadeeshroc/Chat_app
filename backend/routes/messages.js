const express = require('express');
const router = express.Router();
import { Message } from '../models1/models/Message.js'; 
const User = require('../models1/models/User.js'); // Assuming you have a User model

// Route to send a new message
router.post('/send', async (req, res) => {
  const { senderId, content } = req.body; // Assuming senderId and content are sent in the request body

  try {
    const newMessage = new Message({
      sender: senderId,
      content: content,
    });

    await newMessage.save();

    // Populate the sender field before sending the response
    const populatedMessage = await Message.findById(newMessage._id).populate('sender', 'username');

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to retrieve all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().populate('sender', 'username').sort('timestamp');
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;