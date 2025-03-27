import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Editor from './components/Editor';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  console.log('Token in App:', token);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/editor" element={<Editor token={token} />} />
        <Route path="/callback" element={<Callback setToken={setToken} />} />
      </Routes>
    </Router>
  );
}

function Callback({ setToken }) {
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    console.log('Received token in Callback:', token);
    if (token) {
      localStorage.setItem('token', token);
      setToken(token);
      window.location.href = '/editor';
    }
  }, [location, setToken]);
  return <div>Loading...</div>;
}

export default App;