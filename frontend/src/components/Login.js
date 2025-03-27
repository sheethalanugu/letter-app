import React from 'react';

function Login({ setToken }) {
  const handleLogin = () => {
    window.location.href = '/auth/google'; // Relative path
  };
  return (
    <div className="login">
      <h1>Welcome to Letter App</h1>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
}

export default Login;