import React, { useEffect, useState } from "react";
import { DetalleDTO } from "../../types/Detalle";
import { getDetalles, deleteDetalle } from "../../services/api";

interface Props {
  onEditar: (detalle: DetalleDTO) => void;
}

const ListarDetalles: React.FC<Props> = ({ onEditar }) => {
  const [detalles, setDetalles] = useState<DetalleDTO[]>([]);

  const cargarDetalles = async () => {
    const data = await getDetalles();
    setDetalles(data);
  };

  const handleEliminar = async (id: string) => {
    if (window.confirm("¿Está seguro de que desea eliminar este detalle?")) {
      await deleteDetalle(id);
      cargarDetalles();
    }
  };

  useEffect(() => {
    cargarDetalles();
  }, []);

  const formatMoneda = (monto: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(monto);
  };

  const formatCantidad = (cantidad: number) => {
    return new Intl.NumberFormat('es-ES').format(cantidad);
  };

  return (
    <div style={{
      backgroundColor: '#1a1a1a',
      border: '1px solid #333',
      borderRadius: 12,
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
    }}>
      <div style={{
        padding: 24,
        borderBottom: '1px solid #333'
      }}>
        <h2 style={{
          color: '#ffffff',
          fontSize: '1.5rem',
          fontWeight: 600,
          margin: 0
        }}>
          Detalles de Pedidos
        </h2>
        <p style={{
          color: '#b0b0b0',
          fontSize: '0.95rem',
          margin: '8px 0 0 0'
        }}>
          Total de detalles registrados: {detalles.length}
        </p>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ 
          width: '100%',
          borderCollapse: 'collapse'
        }}>
          <thead>
            <tr style={{
              backgroundColor: '#2a2a2a'
            }}>
              <th style={{
                padding: '16px 20px',
                textAlign: 'left',
                color: '#ffffff',
                fontSize: '0.9rem',
                fontWeight: 600,
                borderBottom: '1px solid #333'
              }}>
                Producto
              </th>
              <th style={{
                padding: '16px 20px',
                textAlign: 'right',
                color: '#ffffff',
                fontSize: '0.9rem',
                fontWeight: 600,
                borderBottom: '1px solid #333'
              }}>
                Cantidad
              </th>
              <th style={{
                padding: '16px 20px',
                textAlign: 'right',
                color: '#ffffff',
                fontSize: '0.9rem',
                fontWeight: 600,
                borderBottom: '1px solid #333'
              }}>
                Precio
              </th>
              <th style={{
                padding: '16px 20px',
                textAlign: 'center',
                color: '#ffffff',
                fontSize: '0.9rem',
                fontWeight: 600,
                borderBottom: '1px solid #333'
              }}>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {detalles.map((d, index) => (
              <tr 
                key={d.id}
                style={{
                  backgroundColor: index % 2 === 0 ? '#1a1a1a' : '#1f1f1f',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2a2a2a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#1a1a1a' : '#1f1f1f';
                }}
              >
                <td style={{
                  padding: '14px 20px',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  borderBottom: '1px solid #333'
                }}>
                  {d.productoNombre || 'Sin nombre'}
                </td>
                <td style={{
                  padding: '14px 20px',
                  color: '#FF9800',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  borderBottom: '1px solid #333',
                  textAlign: 'right'
                }}>
                  {formatCantidad(d.cantidad)}
                </td>
                <td style={{
                  padding: '14px 20px',
                  color: '#4CAF50',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  borderBottom: '1px solid #333',
                  textAlign: 'right'
                }}>
                  {formatMoneda(d.precio)}
                </td>
                <td style={{
                  padding: '14px 20px',
                  borderBottom: '1px solid #333'
                }}>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                    <button
                      onClick={() => onEditar(d)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#2196F3',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: 6,
                        fontSize: '0.8rem',
                        fontWeight: 500,
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
                      Editar
                    </button>
                    <button 
                      onClick={() => handleEliminar(d.id)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#f44336',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: 6,
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#d32f2f';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#f44336';
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {detalles.length === 0 && (
        <div style={{
          padding: 40,
          textAlign: 'center',
          color: '#b0b0b0'
        }}>
          No hay detalles de pedidos registrados
        </div>
      )}
    </div>
  );
};

export default ListarDetalles;