import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Register from '/home/user/shopping/chat-app/src/components/Register';
import Login from '/home/user/shopping/chat-app/src/components/Login';
import Chat from '/home/user/shopping/chat-app/src/components/Chat';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/register">Register</Link> |{' '}
        <Link to="/login">Login</Link> |{' '}
        <Link to="/chat">Chat</Link>
      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
