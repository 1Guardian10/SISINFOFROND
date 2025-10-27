// Navbar.tsx (optimizado y compacto)
import React, { useState, CSSProperties } from 'react';
import { useAuth } from './context/AuthContext';

// 1. Interfaz para los enlaces del menú
interface NavLink {
  name: string;
  path: string;
}

// 2. Interfaz para las props del componente Navbar
interface NavbarProps {
  links: NavLink[];
  currentPage: string;
  onNavigate: (path: string) => void;
  userRole?: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ links = [], currentPage, onNavigate, userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const activeColor = '#00BCD4';

  // Estilos base para el componente
  const navStyles: CSSProperties = {
    fontFamily: 'Segoe UI, system-ui, sans-serif',
    backgroundColor: '#0f0f0f',
    boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
    borderBottom: '1px solid #333',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backdropFilter: 'blur(10px)',
  };

  // Función para generar los estilos de los enlaces
  const getLinkStyle = (path: string, isMobile: boolean = false) => {
    const baseStyle: CSSProperties = {
      padding: isMobile ? '10px 16px' : '8px 12px',
      borderRadius: '6px',
      fontSize: isMobile ? '0.9rem' : '0.85rem',
      fontWeight: 500,
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      display: 'block',
      textDecoration: 'none',
      border: '1px solid transparent',
      minWidth: 'auto',
      textAlign: 'center',
      whiteSpace: 'nowrap' as const,
    };

    // Estilo activo
    if (currentPage === path) {
      return {
        ...baseStyle,
        backgroundColor: activeColor,
        color: '#0f0f0f',
        fontWeight: 600,
        boxShadow: `0 2px 8px ${activeColor}40`,
        transform: 'translateY(-1px)',
        border: `1px solid ${activeColor}`,
      };
    } else {
      // Estilo no activo
      return {
        ...baseStyle,
        backgroundColor: 'transparent',
        color: '#e0e0e0',
        border: '1px solid #333',
      };
    }
  };

  // Efecto hover para enlaces no activos
  const getHoverStyle = (path: string) => {
    if (currentPage !== path) {
      return {
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        borderColor: '#00BCD4',
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 12px rgba(0, 188, 212, 0.2)',
      };
    }
    return {};
  };

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <nav style={navStyles}>
      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto',
        padding: '0 16px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '60px',
          gap: '15px'
        }}>
          
          {/* Logo / Título - Compacto */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            flexShrink: 0
          }}>
            <div style={{
              fontSize: '1.4rem',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.5px',
              background: 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              SIS.GESTIÓN
            </div>
          </div>

          {/* Menú Desktop - Más compacto */}
          <div style={{ 
            display: 'none', 
            alignItems: 'center', 
            gap: '6px',
            flex: 1,
            justifyContent: 'center',
            flexWrap: 'wrap' as const,
            maxWidth: '600px'
          }} className="md-display-flex">
            {links.map((link) => {
              const linkStyle = getLinkStyle(link.path);
              return (
                <div
                  key={link.path}
                  onClick={() => onNavigate(link.path)}
                  style={linkStyle}
                  onMouseEnter={(e) => {
                    if (currentPage !== link.path) {
                      Object.assign(e.currentTarget.style, getHoverStyle(link.path));
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== link.path) {
                      Object.assign(e.currentTarget.style, linkStyle);
                    }
                  }}
                >
                  {link.name}
                </div>
              );
            })}
          </div>

          {/* Panel de usuario - Compacto */}
          <div style={{ 
            display: 'none',
            alignItems: 'center', 
            gap: '10px',
            flexShrink: 0
          }} className="md-display-flex">
            {/* Badge de rol compacto */}
            <div style={{ 
              padding: '4px 8px',
              backgroundColor: userRole?.toLowerCase() === 'administrador' ? '#00BCD4' : '#666',
              borderRadius: '12px',
              border: `1px solid ${userRole?.toLowerCase() === 'administrador' ? '#00BCD4' : '#555'}`,
            }}>
              <span style={{ 
                color: userRole?.toLowerCase() === 'administrador' ? '#0f0f0f' : '#ffffff',
                fontSize: '0.7rem',
                fontWeight: 600,
              }}>
                {userRole?.toLowerCase() === 'administrador' ? 'Admin' : 'User'}
              </span>
            </div>

            {/* Información del usuario compacta */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              padding: '6px 12px',
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              border: '1px solid #333',
              minWidth: 'auto'
            }}>
              <div style={{
                width: '28px',
                height: '28px',
                backgroundColor: activeColor,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                color: '#0f0f0f',
                fontSize: '0.8rem'
              }}>
                {user?.nombre?.charAt(0).toUpperCase()}
              </div>
              
              <div style={{ minWidth: 0 }}>
                <div style={{ 
                  color: '#ffffff', 
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100px'
                }}>
                  {user?.nombre}
                </div>
              </div>
            </div>

            {/* Botón logout compacto */}
            <button
              onClick={handleLogout}
              style={{
                padding: '6px 10px',
                backgroundColor: 'transparent',
                border: '1px solid #ff4757',
                borderRadius: '6px',
                color: '#ff4757',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ff4757';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#ff4757';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Salir
            </button>
          </div>

          {/* Botón Móvil (Hamburguesa) - Compacto */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="md-display-none">
            {/* Badge de rol en móvil */}
            <div style={{ 
              padding: '3px 6px',
              backgroundColor: userRole?.toLowerCase() === 'administrador' ? '#00BCD4' : '#666',
              borderRadius: '8px',
            }}>
              <span style={{ 
                color: userRole?.toLowerCase() === 'administrador' ? '#0f0f0f' : '#ffffff',
                fontSize: '0.6rem',
                fontWeight: 600,
              }}>
                {userRole?.toLowerCase() === 'administrador' ? 'Admin' : 'User'}
              </span>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                background: 'transparent',
                border: '1px solid #333',
                borderRadius: '6px',
                padding: '8px',
                cursor: 'pointer',
                color: '#ffffff',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1a1a1a';
                e.currentTarget.style.borderColor = activeColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = '#333';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil Desplegable - Compacto */}
      <div style={{
        display: isOpen ? 'block' : 'none',
        backgroundColor: '#0f0f0f',
        borderTop: '1px solid #333',
        padding: '16px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }} className="md-display-none">
        {/* Enlaces del menú */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '8px', 
          marginBottom: '16px' 
        }}>
          {links.map((link) => {
            const linkStyle = getLinkStyle(link.path, true);
            return (
              <div
                key={link.path}
                onClick={() => {
                  onNavigate(link.path);
                  setIsOpen(false);
                }}
                style={linkStyle}
                onMouseEnter={(e) => {
                  if (currentPage !== link.path) {
                    Object.assign(e.currentTarget.style, getHoverStyle(link.path));
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== link.path) {
                    Object.assign(e.currentTarget.style, linkStyle);
                  }
                }}
              >
                {link.name}
              </div>
            );
          })}
        </div>

        {/* Información del usuario en móvil - Compacto */}
        <div style={{ 
          padding: '12px',
          backgroundColor: '#1a1a1a',
          borderRadius: '8px',
          border: '1px solid #333',
          marginTop: '16px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '10px'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              backgroundColor: activeColor,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              color: '#0f0f0f',
              fontSize: '0.9rem'
            }}>
              {user?.nombre?.charAt(0).toUpperCase()}
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{ 
                color: '#ffffff', 
                fontSize: '0.9rem',
                fontWeight: 600,
                marginBottom: '2px'
              }}>
                {user?.nombre}
              </div>
              <div style={{ 
                color: '#b0b0b0', 
                fontSize: '0.75rem',
                fontWeight: 500
              }}>
                {userRole?.toLowerCase() === 'administrador' ? 'Administrador' : 'Usuario'}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '8px 12px',
              backgroundColor: 'transparent',
              border: '1px solid #ff4757',
              borderRadius: '6px',
              color: '#ff4757',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ff4757';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#ff4757';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Cerrar Sesión
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .md-display-flex {
            display: flex !important;
          }
          .md-display-none {
            display: none !important;
          }
        }
        
        @media (max-width: 1024px) {
          .md-display-flex {
            gap: 4px !important;
          }
        }
        
        /* Mejoras de scroll suave */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;