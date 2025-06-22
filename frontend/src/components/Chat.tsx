import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

interface Message {
  sender: string;
  content: string;
  timestamp: string; // Or Date, depending on how you handle it
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    const socket = io('http://localhost:5000', {
      auth: { token }, // Include token in socket options
    });

    socket.on('message', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
 socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Assuming you have a socket instance available in this scope
 // Replace 'socket' with your actual socket instance variable name
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="message-list">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <strong>{message.sender}:</strong> {message.content}
          </div> // You might want to format the timestamp as well
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;