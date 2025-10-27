import React, { useState, useEffect } from "react";
import { PedidoDTO, CrearPedidoDTO } from "../../types/Pedido";
import { updatePedido } from "../../services/api";

interface Props {
  pedido: PedidoDTO;
  onPedidoActualizado: () => void;
  onCerrar: () => void;
}

const EditarPedido: React.FC<Props> = ({ pedido, onPedidoActualizado, onCerrar }) => {
  const [form, setForm] = useState<CrearPedidoDTO>({
    fecha_pedido: "",
    total: 0,
    estado: "",
    id_usuario: "",
    id_metodo_pago: "",
    detalles: [],
  });

  const [mensaje, setMensaje] = useState<string | null>(null);

  useEffect(() => {
    if (pedido) {
      setForm({
        fecha_pedido: pedido.fecha_pedido,
        total: pedido.total,
        estado: pedido.estado || "",
        id_usuario: pedido.id_usuario,
        id_metodo_pago: pedido.id_metodo_pago,
        detalles: [],
      });
    }
  }, [pedido]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ 
      ...form, 
      [name]: name === 'total' ? parseFloat(value) || 0 : value 
    });
  };

  const handleGuardar = async () => {
    if (!form.fecha_pedido || !form.estado || !form.id_usuario || !form.id_metodo_pago) {
      setMensaje("Por favor, complete todos los campos obligatorios");
      return;
    }

    try {
      await updatePedido(pedido.id, form);
      onPedidoActualizado();
    } catch (error: any) {
      setMensaje(error.message || "Error al actualizar el pedido");
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
            Editar Pedido
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
              value={form.fecha_pedido}
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
              value={form.total}
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
              value={form.estado}
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
              value={form.id_usuario}
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
              value={form.id_metodo_pago}
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
              backgroundColor: '#2196F3',
              color: '#ffffff',
              border: 'none',
              borderRadius: 6,
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1976D2';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2196F3';
            }}
          >
            Actualizar Pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarPedido;