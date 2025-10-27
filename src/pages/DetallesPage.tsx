import React, { useState } from "react";
import ListarDetalles from "../components/detalle/ListarDetalles";
import CrearDetalle from "../components/detalle/CrearDetalle";
import EditarDetalle from "../components/detalle/EditarDetalle";
import { DetalleDTO } from "../types/Detalle";

// Aquí podrías obtener el ID del pedido real desde props, contexto o ruta
const PEDIDO_ID = "123"; // ejemplo, reemplaza con tu lógica real

const DetallePage: React.FC = () => {
  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [detalleSeleccionado, setDetalleSeleccionado] = useState<DetalleDTO | null>(null);

  const handleEditar = (detalle: DetalleDTO) => {
    setDetalleSeleccionado(detalle);
    setModalEditar(true);
  };

  const handleCerrarModales = () => {
    setModalCrear(false);
    setModalEditar(false);
    setDetalleSeleccionado(null);
  };

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
            Gestión de Detalles
          </h1>
          <p style={{ 
            color: '#b0b0b0', 
            fontSize: '1.1rem',
            maxWidth: 600,
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Administre los detalles y items de los pedidos del sistema
          </p>
        </header>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
          padding: 24,
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          <div>
            <h2 style={{
              color: '#ffffff',
              fontSize: '1.5rem',
              fontWeight: 600,
              margin: 0
            }}>
              Detalles del Pedido
            </h2>
            <p style={{
              color: '#b0b0b0',
              fontSize: '0.95rem',
              margin: '8px 0 0 0'
            }}>
              ID de Pedido: {PEDIDO_ID} - Gestione los items de este pedido
            </p>
          </div>
          <button 
            onClick={() => setModalCrear(true)}
            style={{
              padding: "12px 24px",
              backgroundColor: '#4CAF50',
              color: '#ffffff',
              border: 'none',
              borderRadius: 8,
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#45a049';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(76, 175, 80, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#4CAF50';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Crear Detalle
          </button>
        </div>

        <ListarDetalles onEditar={handleEditar} />

        {modalCrear && (
          <CrearDetalle
            pedidoId={PEDIDO_ID}
            onDetalleCreado={handleCerrarModales}
            onCerrar={handleCerrarModales}
          />
        )}

        {modalEditar && detalleSeleccionado && (
          <EditarDetalle
            detalle={detalleSeleccionado}
            onDetalleActualizado={handleCerrarModales}
            onCerrar={handleCerrarModales}
          />
        )}
      </div>
    </div>
  );
};

export default DetallePage;