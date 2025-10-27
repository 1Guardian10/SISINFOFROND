import React, { useState } from "react";
import ListarPedidos from "../components/pedido/ListarPedidos";
import CrearPedido from "../components/pedido/CrearPedido";
import EditarPedido from "../components/pedido/EditarPedido";
import { PedidoDTO } from "../types/Pedido";

const PedidosPage: React.FC = () => {
  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState<PedidoDTO | null>(null);

  const handleEditar = (pedido: PedidoDTO) => {
    setPedidoSeleccionado(pedido);
    setModalEditar(true);
  };

  const handleCerrarModales = () => {
    setModalCrear(false);
    setModalEditar(false);
    setPedidoSeleccionado(null);
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
            Gestión de Pedidos
          </h1>
          <p style={{ 
            color: '#b0b0b0', 
            fontSize: '1.1rem',
            maxWidth: 600,
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Administre y realice seguimiento de todos los pedidos del sistema
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
              Panel de Control
            </h2>
            <p style={{
              color: '#b0b0b0',
              fontSize: '0.95rem',
              margin: '8px 0 0 0'
            }}>
              Cree y gestione los pedidos del sistema
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
            Crear Pedido
          </button>
        </div>

        <ListarPedidos onEditar={handleEditar} />

        {modalCrear && (
          <CrearPedido onPedidoCreado={handleCerrarModales} onCerrar={handleCerrarModales} />
        )}

        {modalEditar && pedidoSeleccionado && (
          <EditarPedido
            pedido={pedidoSeleccionado}
            onPedidoActualizado={handleCerrarModales}
            onCerrar={handleCerrarModales}
          />
        )}
      </div>
    </div>
  );
};

export default PedidosPage;