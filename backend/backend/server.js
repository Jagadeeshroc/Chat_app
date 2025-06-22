import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import User from '/home/user/shopping/chat-app/backend/models/User.js';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import authRoutes from '/home/user/shopping/chat-app/backend/routes/auth.js';
import messageRoutes from '/home/user/shopping/chat-app/backend/routes/messages.js';
import Message from '/home/user/shopping/chat-app/backend/models/Message.js'; // Import the Message model

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

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    next();
  });
};

app.use('/api/messages', verifyToken, messageRoutes);

const onlineUsers = new Map();

server.listen(port, () => {
 console.log(`Server listening on port ${port}`);

 console.log(`Server listening on port ${port}`);
});

// Setup Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Or specify your frontend origin
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
