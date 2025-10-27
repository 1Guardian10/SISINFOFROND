import React, { useEffect, useState } from "react";
import CrearMetodoPago from "../components/metodospago/CrearMetodoPago";
import { MetodoPagoDTO } from "../types/MetodoPago";
import { getMetodosPago } from "../services/api";

const MetodosPagoPage: React.FC = () => {
  const [metodos, setMetodos] = useState<MetodoPagoDTO[]>([]);

  const cargarMetodos = async () => {
    try {
      const data = await getMetodosPago();
      setMetodos(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    cargarMetodos();
  }, []);

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
          marginBottom: 40 
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 300, 
            color: '#ffffff',
            marginBottom: 10,
            letterSpacing: '-0.5px'
          }}>
            Métodos de Pago
          </h1>
          <p style={{ 
            color: '#b0b0b0', 
            fontSize: '1.1rem',
            maxWidth: 600,
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Administre las opciones de pago disponibles en el sistema
          </p>
        </header>

        <CrearMetodoPago onMetodoCreado={cargarMetodos} />

        <div style={{
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: 12,
          padding: 24,
          marginTop: 24,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          <h2 style={{
            color: '#ffffff',
            fontSize: '1.5rem',
            fontWeight: 600,
            margin: '0 0 20px 0'
          }}>
            Métodos de Pago Registrados
          </h2>
          
          {metodos.length === 0 ? (
            <div style={{
              padding: 40,
              textAlign: 'center',
              color: '#b0b0b0',
              fontSize: '1rem'
            }}>
              No hay métodos de pago registrados
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gap: 12
            }}>
              {metodos.map((m) => (
                <div
                  key={m.id}
                  style={{
                    padding: '16px 20px',
                    backgroundColor: '#2a2a2a',
                    border: '1px solid #333',
                    borderRadius: 8,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#333';
                    e.currentTarget.style.borderColor = '#444';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#2a2a2a';
                    e.currentTarget.style.borderColor = '#333';
                  }}
                >
                  <div>
                    <span style={{
                      color: '#ffffff',
                      fontSize: '1rem',
                      fontWeight: 500
                    }}>
                      {m.nombre}
                    </span>
                  </div>
                  <div>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: 20,
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      backgroundColor: m.estado === 'Activo' ? '#4CAF5020' : '#f4433620',
                      color: m.estado === 'Activo' ? '#4CAF50' : '#f44336',
                      border: `1px solid ${m.estado === 'Activo' ? '#4CAF5040' : '#f4433640'}`
                    }}>
                      {m.estado || 'Sin estado'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetodosPagoPage;