import React, { useState } from "react";
import { createPedido } from "../../services/api";
import { CrearPedidoDTO } from "../../types/Pedido";

interface Props {
  onPedidoCreado: () => void;
  onCerrar: () => void;
}

const CrearPedido: React.FC<Props> = ({ onPedidoCreado, onCerrar }) => {
  const [pedido, setPedido] = useState<CrearPedidoDTO>({
    fecha_pedido: "",
    total: 0,
    estado: "",
    id_usuario: "",
    id_metodo_pago: "",
    detalles: [],
  });

  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPedido({ 
      ...pedido, 
      [name]: name === 'total' ? parseFloat(value) || 0 : value 
    });
  };

  const handleGuardar = async () => {
    if (!pedido.fecha_pedido || !pedido.estado || !pedido.id_usuario || !pedido.id_metodo_pago) {
      setMensaje("Por favor, complete todos los campos obligatorios");
      return;
    }

    try {
      await createPedido(pedido);
      onPedidoCreado();
    } catch (error: any) {
      setMensaje(error.message);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: 20
    }}>
      <div style={{
        backgroundColor: '#1a1a1a',
        border: '1px solid #333',
        borderRadius: 12,
        padding: 32,
        width: '100%',
        maxWidth: 500,
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
          paddingBottom: 16,
          borderBottom: '1px solid #333'
        }}>
          <h3 style={{
            color: '#ffffff',
            fontSize: '1.5rem',
            fontWeight: 600,
            margin: 0
          }}>
            Crear Nuevo Pedido
          </h3>
          <button 
            onClick={onCerrar}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#b0b0b0',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: 0,
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#333';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#b0b0b0';
            }}
          >
            ×
          </button>
        </div>

        {mensaje && (
          <div style={{
            padding: 12,
            borderRadius: 6,
            marginBottom: 20,
            backgroundColor: '#f4433620',
            border: '1px solid #f4433640',
            color: '#f44336',
            fontSize: '0.9rem',
            fontWeight: 500
          }}>
            {mensaje}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{
              display: 'block',
              color: '#ffffff',
              fontSize: '0.95rem',
              fontWeight: 500,
              marginBottom: 8
            }}>
              Fecha del Pedido *
            </label>
            <input
              type="date"
              name="fecha_pedido"
              value={pedido.fecha_pedido}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#2a2a2a',
                border: '1px solid #444',
                borderRadius: 6,
                color: '#ffffff',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
              onBlur={(e) => e.target.style.borderColor = '#444'}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              color: '#ffffff',
              fontSize: '0.95rem',
              fontWeight: 500,
              marginBottom: 8
            }}>
              Total
            </label>
            <input
              type="number"
              name="total"
              value={pedido.total}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#2a2a2a',
                border: '1px solid #444',
                borderRadius: 6,
                color: '#ffffff',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
              onBlur={(e) => e.target.style.borderColor = '#444'}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              color: '#ffffff',
              fontSize: '0.95rem',
              fontWeight: 500,
              marginBottom: 8
            }}>
              Estado *
            </label>
            <select
              name="estado"
              value={pedido.estado}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#2a2a2a',
                border: '1px solid #444',
                borderRadius: 6,
                color: '#ffffff',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
              onBlur={(e) => e.target.style.borderColor = '#444'}
            >
              <option value="">Seleccione un estado</option>
              <option value="pendiente">Pendiente</option>
              <option value="completado">Completado</option>
              <option value="cancelado">Cancelado</option>
              <option value="entregado">Entregado</option>
            </select>
          </div>

          <div>
            <label style={{
              display: 'block',
              color: '#ffffff',
              fontSize: '0.95rem',
              fontWeight: 500,
              marginBottom: 8
            }}>
              ID Usuario *
            </label>
            <input
              type="text"
              name="id_usuario"
              value={pedido.id_usuario}
              onChange={handleChange}
              placeholder="Ingrese el ID del usuario"
              required
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#2a2a2a',
                border: '1px solid #444',
                borderRadius: 6,
                color: '#ffffff',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
              onBlur={(e) => e.target.style.borderColor = '#444'}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              color: '#ffffff',
              fontSize: '0.95rem',
              fontWeight: 500,
              marginBottom: 8
            }}>
              ID Método de Pago *
            </label>
            <input
              type="text"
              name="id_metodo_pago"
              value={pedido.id_metodo_pago}
              onChange={handleChange}
              placeholder="Ingrese el ID del método de pago"
              required
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#2a2a2a',
                border: '1px solid #444',
                borderRadius: 6,
                color: '#ffffff',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
              onBlur={(e) => e.target.style.borderColor = '#444'}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 24 }}>
          <button 
            onClick={onCerrar}
            style={{
              padding: '12px 24px',
              backgroundColor: 'transparent',
              color: '#b0b0b0',
              border: '1px solid #444',
              borderRadius: 6,
              fontSize: '0.95rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#333';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#b0b0b0';
            }}
          >
            Cancelar
          </button>
          <button 
            onClick={handleGuardar}
            style={{
              padding: '12px 24px',
              backgroundColor: '#4CAF50',
              color: '#ffffff',
              border: 'none',
              borderRadius: 6,
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#45a049';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#4CAF50';
            }}
          >
            Crear Pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrearPedido;