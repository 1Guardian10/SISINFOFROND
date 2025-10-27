import React, { useEffect, useState } from "react";
import { getProductosMasVendidos, ProductoVendidoDTO } from "../../services/api";

const ProductosMasVendidos: React.FC = () => {
  const [data, setData] = useState<ProductoVendidoDTO[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await getProductosMasVendidos();
    setData(result);
  };

  const formatMoneda = (monto: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(monto);
  };

  const formatCantidad = (cantidad: number) => {
    return new Intl.NumberFormat('es-ES').format(cantidad);
  };

  // Calcular totales generales
  const totalCantidad = data.reduce((sum, item) => sum + item.cantidadVendida, 0);
  const totalMonto = data.reduce((sum, item) => sum + item.montoVenta, 0);

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
            Productos Más Vendidos
          </h2>
          <p style={{
            color: '#b0b0b0',
            fontSize: '0.95rem',
            margin: 0
          }}>
            Análisis de productos con mayor volumen de ventas
          </p>
        </div>
        <div style={{
          display: 'flex',
          gap: 12
        }}>
          <div style={{
            backgroundColor: '#FF980020',
            border: '1px solid #FF980040',
            borderRadius: 8,
            padding: '12px 16px',
            textAlign: 'center',
            minWidth: 100
          }}>
            <div style={{
              color: '#FF9800',
              fontSize: '1.2rem',
              fontWeight: 600
            }}>
              {data.length}
            </div>
            <div style={{
              color: '#FF9800',
              fontSize: '0.7rem',
              fontWeight: 500
            }}>
              Productos
            </div>
          </div>
          <div style={{
            backgroundColor: '#4CAF5020',
            border: '1px solid #4CAF5040',
            borderRadius: 8,
            padding: '12px 16px',
            textAlign: 'center',
            minWidth: 100
          }}>
            <div style={{
              color: '#4CAF50',
              fontSize: '1.2rem',
              fontWeight: 600
            }}>
              {formatMoneda(totalMonto)}
            </div>
            <div style={{
              color: '#4CAF50',
              fontSize: '0.7rem',
              fontWeight: 500
            }}>
              Total Ventas
            </div>
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
                  Cantidad Vendida
                </th>
                <th style={{
                  padding: '16px 20px',
                  textAlign: 'right',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  borderBottom: '1px solid #333'
                }}>
                  Monto de Venta
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
                    borderBottom: '1px solid #333',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12
                  }}>
                    <div style={{
                      width: 32,
                      height: 32,
                      backgroundColor: '#FF980020',
                      border: '1px solid #FF980040',
                      borderRadius: 6,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      color: '#FF9800',
                      fontWeight: 600
                    }}>
                      {index + 1}
                    </div>
                    <div style={{ fontWeight: 500 }}>{d.nombre}</div>
                  </td>
                  <td style={{
                    padding: '14px 20px',
                    color: '#FF9800',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    borderBottom: '1px solid #333',
                    textAlign: 'right'
                  }}>
                    {formatCantidad(d.cantidadVendida)}
                  </td>
                  <td style={{
                    padding: '14px 20px',
                    color: '#4CAF50',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    borderBottom: '1px solid #333',
                    textAlign: 'right'
                  }}>
                    {formatMoneda(d.montoVenta)}
                  </td>
                </tr>
              ))}
            </tbody>
            {data.length > 0 && (
              <tfoot>
                <tr style={{
                  backgroundColor: '#2a2a2a',
                  fontWeight: 600
                }}>
                  <td style={{
                    padding: '16px 20px',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    borderTop: '2px solid #333'
                  }}>
                    Total General
                  </td>
                  <td style={{
                    padding: '16px 20px',
                    color: '#FF9800',
                    fontSize: '0.9rem',
                    borderTop: '2px solid #333',
                    textAlign: 'right'
                  }}>
                    {formatCantidad(totalCantidad)}
                  </td>
                  <td style={{
                    padding: '16px 20px',
                    color: '#4CAF50',
                    fontSize: '0.9rem',
                    borderTop: '2px solid #333',
                    textAlign: 'right'
                  }}>
                    {formatMoneda(totalMonto)}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>

        {data.length === 0 && (
          <div style={{
            padding: 60,
            textAlign: 'center',
            color: '#b0b0b0'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>📦</div>
            <div style={{ fontSize: '1.1rem', marginBottom: 8 }}>No hay datos de productos vendidos</div>
            <div style={{ fontSize: '0.9rem' }}>No se encontraron registros de ventas por producto</div>
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
          <strong>Resumen:</strong> El producto más vendido es <strong>{data[0]?.nombre}</strong> con {formatCantidad(data[0]?.cantidadVendida || 0)} unidades vendidas, 
          generando {formatMoneda(data[0]?.montoVenta || 0)} en ventas.
        </div>
      )}
    </div>
  );
};

export default ProductosMasVendidos;