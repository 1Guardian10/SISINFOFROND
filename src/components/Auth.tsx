// src/components/Auth.tsx
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

interface AuthProps {
  onClose?: () => void;
}

const Auth: React.FC<AuthProps> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {isLogin ? (
        <Login 
          onSwitchToRegister={() => setIsLogin(false)} 
          onClose={onClose}
        />
      ) : (
        <Register 
          onSwitchToLogin={() => setIsLogin(true)} 
          onClose={onClose}
        />
      )}
    </>
  );
};

export default Auth;