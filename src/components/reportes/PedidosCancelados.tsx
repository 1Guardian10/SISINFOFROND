import React, { useEffect, useState } from "react";
import { getPedidosCancelados, PedidoCanceladoDTO } from "../../services/api";

const PedidosCancelados: React.FC = () => {
  const [data, setData] = useState<PedidoCanceladoDTO[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await getPedidosCancelados();
    setData(result);
  };

  const formatMoneda = (monto: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(monto);
  };

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24
      }}>
        <div>
          <h2 style={{
            color: '#ffffff',
            fontSize: '1.5rem',
            fontWeight: 600,
            margin: '0 0 8px 0'
          }}>
            Pedidos Cancelados / Devueltos
          </h2>
          <p style={{
            color: '#b0b0b0',
            fontSize: '0.95rem',
            margin: 0
          }}>
            Total de pedidos cancelados: {data.length}
          </p>
        </div>
        <div style={{
          backgroundColor: '#f4433620',
          border: '1px solid #f4433640',
          borderRadius: 8,
          padding: '12px 16px',
          textAlign: 'center'
        }}>
          <div style={{
            color: '#f44336',
            fontSize: '1.5rem',
            fontWeight: 600
          }}>
            {data.length}
          </div>
          <div style={{
            color: '#f44336',
            fontSize: '0.8rem',
            fontWeight: 500
          }}>
            Cancelados
          </div>
        </div>
      </div>

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
                  padding: '16px 20px',
                  textAlign: 'left',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  borderBottom: '1px solid #333'
                }}>
                  Fecha del Pedido
                </th>
                <th style={{
                  padding: '16px 20px',
                  textAlign: 'left',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  borderBottom: '1px solid #333'
                }}>
                  Total
                </th>
                <th style={{
                  padding: '16px 20px',
                  textAlign: 'left',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  borderBottom: '1px solid #333'
                }}>
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, index) => (
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
                    {formatFecha(d.fecha_pedido)}
                  </td>
                  <td style={{
                    padding: '14px 20px',
                    color: '#f44336',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    borderBottom: '1px solid #333'
                  }}>
                    {formatMoneda(d.total)}
                  </td>
                  <td style={{
                    padding: '14px 20px',
                    borderBottom: '1px solid #333'
                  }}>
                    <span style={{
                      padding: '6px 12px',
                      borderRadius: 20,
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      backgroundColor: '#f4433620',
                      color: '#f44336',
                      border: '1px solid #f4433640'
                    }}>
                      {d.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.length === 0 && (
          <div style={{
            padding: 60,
            textAlign: 'center',
            color: '#b0b0b0'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>📊</div>
            <div style={{ fontSize: '1.1rem', marginBottom: 8 }}>No hay pedidos cancelados</div>
            <div style={{ fontSize: '0.9rem' }}>No se encontraron pedidos cancelados o devueltos en el sistema</div>
          </div>
        )}
      </div>

      {data.length > 0 && (
        <div style={{
          marginTop: 20,
          padding: 16,
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: 8,
          color: '#b0b0b0',
          fontSize: '0.85rem'
        }}>
          <strong>Resumen:</strong> Se muestran {data.length} pedidos cancelados o devueltos en el sistema.
        </div>
      )}
    </div>
  );
};

export default PedidosCancelados;