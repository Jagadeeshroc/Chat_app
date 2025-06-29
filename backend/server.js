import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import authRoutes from './routes/auth.js';
import messageRoutes from './routes/messages.js';
import Message from './models/Message.js';
import User from '/models/User.js';

import { verifyToken } from './middleware/verifyToken.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.get('/api/test', (req, res) => {
  res.json({ message: 'API test successful!' });
});

app.use('/api/auth', authRoutes);


app.use('/api/messages', verifyToken, messageRoutes);

const onlineUsers = new Map();

// Setup Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});