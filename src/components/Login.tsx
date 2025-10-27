// src/components/Login.tsx
import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onSwitchToRegister: () => void;
  onClose?: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitchToRegister, onClose }) => {
  const [formData, setFormData] = useState({
    correo: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  
  // 2. Inicializar useNavigate
  const navigate = useNavigate(); 
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.correo || !formData.password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    const success = await login(formData.correo, formData.password);
    
    if (success) {
      // 3. Redirección en caso de éxito
      // 'dashboard' debe ser la ruta a la que deseas enviar al usuario logueado
      navigate('/ListaProductos'); 
      
      // Opcional: Si el componente de Login es un modal que quieres cerrar, llama a onClose
      if (onClose) {
        onClose();
      }
      
    } else {
      setError('Credenciales incorrectas');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Segoe UI, system-ui, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#1a1a1a',
        border: '1px solid #333',
        borderRadius: '12px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        position: 'relative'
      }}>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background: 'transparent',
              border: 'none',
              color: '#b0b0b0',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '5px',
              borderRadius: '4px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.backgroundColor = '#333';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#b0b0b0';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            ×
          </button>
        )}

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '8px'
          }}>
            <span style={{ color: '#00BCD4' }}>INICIAR</span> SESIÓN
          </div>
          <p style={{ color: '#b0b0b0', margin: 0 }}>
            Accede a tu cuenta de administración
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#f4433620',
            border: '1px solid #f44336',
            color: '#ff6b6b',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: '#ffffff',
              marginBottom: '8px',
              fontSize: '0.9rem',
              fontWeight: 500
            }}>
              Correo Electrónico
            </label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#0f0f0f',
                border: '1px solid #333',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '0.95rem',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#00BCD4';
                e.target.style.boxShadow = '0 0 0 2px #00BCD420';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#333';
                e.target.style.boxShadow = 'none';
              }}
              placeholder="tu@correo.com"
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              color: '#ffffff',
              marginBottom: '8px',
              fontSize: '0.9rem',
              fontWeight: 500
            }}>
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#0f0f0f',
                border: '1px solid #333',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '0.95rem',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#00BCD4';
                e.target.style.boxShadow = '0 0 0 2px #00BCD420';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#333';
                e.target.style.boxShadow = 'none';
              }}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: isLoading ? '#666' : '#00BCD4',
              color: isLoading ? '#999' : '#0f0f0f',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              marginBottom: '20px'
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = '#00a8cc';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 188, 212, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = '#00BCD4';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            {isLoading ? 'INICIANDO SESIÓN...' : 'INICIAR SESIÓN'}
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
          <span style={{ color: '#b0b0b0' }}>¿No tienes cuenta? </span>
          <button
            onClick={onSwitchToRegister}
            style={{
              background: 'none',
              border: 'none',
              color: '#00BCD4',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '0.95rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#00a8cc';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#00BCD4';
            }}
          >
            Regístrate aquí
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
