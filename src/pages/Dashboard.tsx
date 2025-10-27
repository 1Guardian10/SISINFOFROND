import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const cards = [
    { 
      name: "Gestión de Usuarios", 
      description: "Administrar usuarios del sistema y sus permisos",
      path: "/usuarios", 
      color: "#4CAF50", 
      icon: "👥" 
    },
    { 
      name: "Inventario", 
      description: "Gestionar productos y control de stock",
      path: "/productos", 
      color: "#2196F3", 
      icon: "📦" 
    },
    { 
      name: "Detalles", 
      description: "Detalles de los pedidos",
      path: "/detalles", 
      color: "#FF9800", 
      icon: "⚙️" 
    },
    { 
      name: "Gestión de Pedidos", 
      description: "Seguimiento y administración de pedidos",
      path: "/pedidos", 
      color: "#9C27B0", 
      icon: "🛒" 
    },
    { 
      name: "Roles", 
      description: "Administrar roles y permisos del sistema",
      path: "/roles", 
      color: "#F44336", 
      icon: "🔐" 
    },
    { 
      name: "Categorías", 
      description: "Organizar y clasificar contenidos",
      path: "/categorias", 
      color: "#00BCD4", 
      icon: "📑" 
    },
    { 
      name: "Métodos de Pago", 
      description: "Configurar opciones de pago disponibles",
      path: "/metodospago", 
      color: "#795548", 
      icon: "💳" 
    },
    { 
      name: "Reportes", 
      description: "Generar reportes y análisis del sistema",
      path: "/reportes", 
      color: "#607D8B", 
      icon: "📈" 
    },
  ];

  return (
    <div style={{ 
      padding: '40px 20px', 
      backgroundColor: '#0f0f0f', 
      minHeight: '100vh',
      fontFamily: 'Segoe UI, system-ui, sans-serif'
    }}>
      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto'
      }}>
        <header style={{ 
          textAlign: 'center', 
          marginBottom: 60 
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 300, 
            color: '#ffffff',
            marginBottom: 10,
            letterSpacing: '-0.5px'
          }}>
            Panel de Administración
          </h1>
          <p style={{ 
            color: '#b0b0b0', 
            fontSize: '1.1rem',
            maxWidth: 600,
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Sistema integral de gestión y administración de la plataforma
          </p>
        </header>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: 24
        }}>
          {cards.map((card) => (
            <div
              key={card.name}
              onClick={() => navigate(card.path)}
              style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: 12,
                cursor: 'pointer',
                padding: 24,
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '200px'
              }}
              onMouseEnter={(e) => { 
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.4)';
                e.currentTarget.style.borderColor = card.color;
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
                e.currentTarget.style.borderColor = '#333';
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                backgroundColor: card.color
              }} />
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: 16,
                flex: '0 0 auto'
              }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 8,
                  backgroundColor: `${card.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  marginRight: 12,
                  border: `1px solid ${card.color}40`
                }}>
                  {card.icon}
                </div>
                <h3 style={{ 
                  margin: 0, 
                  fontSize: '1.2rem', 
                  fontWeight: 600,
                  color: '#ffffff'
                }}>
                  {card.name}
                </h3>
              </div>
              
              <p style={{ 
                color: '#b0b0b0', 
                fontSize: '0.95rem',
                lineHeight: 1.5,
                margin: 0,
                marginBottom: 'auto',
                flex: '1 1 auto',
                overflow: 'hidden'
              }}>
                {card.description}
              </p>
              
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 16,
                flex: '0 0 auto'
              }}>
                <button
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#1a1a1a',
                    border: 'none',
                    padding: '10px 24px',
                    borderRadius: 6,
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = card.color;
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.color = '#1a1a1a';
                  }}
                >
                  Acceder
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;