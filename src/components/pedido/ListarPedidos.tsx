import React, { useEffect, useState } from "react";
import { getPedidos } from "../../services/api";
import { PedidoDTO } from "../../types/Pedido";

interface Props {
  onEditar: (pedido: PedidoDTO) => void;
}

const ListarPedidos: React.FC<Props> = ({ onEditar }) => {
  const [pedidos, setPedidos] = useState<PedidoDTO[]>([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const data = await getPedidos();
        setPedidos(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPedidos();
  }, []);

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES');
  };

  const formatMoneda = (monto: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(monto);
  };

  const getEstadoColor = (estado: string | undefined) => {
    switch (estado?.toLowerCase()) {
      case 'completado':
      case 'entregado':
        return '#4CAF50';
      case 'pendiente':
        return '#FF9800';
      case 'cancelado':
        return '#f44336';
      default:
        return '#b0b0b0';
    }
  };

  return (
    <div style={{
      backgroundColor: '#1a1a1a',
      border: '1px solid #333',
      borderRadius: 12,
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
    }}>
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
                padding: '16px 12px',
                textAlign: 'left',
                color: '#ffffff',
                fontSize: '0.9rem',
                fontWeight: 600,
                borderBottom: '1px solid #333'
              }}>
                ID
              </th>
              <th style={{
                padding: '16px 12px',
                textAlign: 'left',
                color: '#ffffff',
                fontSize: '0.9rem',
                fontWeight: 600,
                borderBottom: '1px solid #333'
              }}>
                Fecha
              </th>
              <th style={{
                padding: '16px 12px',
                textAlign: 'left',
                color: '#ffffff',
                fontSize: '0.9rem',
                fontWeight: 600,
                borderBottom: '1px solid #333'
              }}>
                Total
              </th>
              <th style={{
                padding: '16px 12px',
                textAlign: 'left',
                color: '#ffffff',
                fontSize: '0.9rem',
                fontWeight: 600,
                borderBottom: '1px solid #333'
              }}>
                Estado
              </th>
              <th style={{
                padding: '16px 12px',
                textAlign: 'left',
                color: '#ffffff',
                fontSize: '0.9rem',
                fontWeight: 600,
                borderBottom: '1px solid #333'
              }}>
                Usuario
              </th>
              <th style={{
                padding: '16px 12px',
                textAlign: 'left',
                color: '#ffffff',
                fontSize: '0.9rem',
                fontWeight: 600,
                borderBottom: '1px solid #333'
              }}>
                Método Pago
              </th>
              <th style={{
                padding: '16px 12px',
                textAlign: 'left',
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
            {pedidos.map((p, index) => (
              <tr 
                key={p.id}
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
                  padding: '14px 12px',
                  color: '#b0b0b0',
                  fontSize: '0.85rem',
                  borderBottom: '1px solid #333'
                }}>
                  {p.id}
                </td>
                <td style={{
                  padding: '14px 12px',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  borderBottom: '1px solid #333'
                }}>
                  {formatFecha(p.fecha_pedido)}
                </td>
                <td style={{
                  padding: '14px 12px',
                  color: '#4CAF50',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  borderBottom: '1px solid #333'
                }}>
                  {formatMoneda(p.total)}
                </td>
                <td style={{
                  padding: '14px 12px',
                  borderBottom: '1px solid #333'
                }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: 12,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    backgroundColor: `${getEstadoColor(p.estado)}20`,
                    color: getEstadoColor(p.estado),
                    border: `1px solid ${getEstadoColor(p.estado)}40`
                  }}>
                    {p.estado || 'Sin estado'}
                  </span>
                </td>
                <td style={{
                  padding: '14px 12px',
                  color: '#b0b0b0',
                  fontSize: '0.85rem',
                  borderBottom: '1px solid #333'
                }}>
                  {p.id_usuario}
                </td>
                <td style={{
                  padding: '14px 12px',
                  color: '#b0b0b0',
                  fontSize: '0.85rem',
                  borderBottom: '1px solid #333'
                }}>
                  {p.id_metodo_pago}
                </td>
                <td style={{
                  padding: '14px 12px',
                  borderBottom: '1px solid #333'
                }}>
                  <button
                    onClick={() => onEditar(p)}
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pedidos.length === 0 && (
        <div style={{
          padding: 40,
          textAlign: 'center',
          color: '#b0b0b0'
        }}>
          No hay pedidos registrados
        </div>
      )}
    </div>
  );
};

export default ListarPedidos;