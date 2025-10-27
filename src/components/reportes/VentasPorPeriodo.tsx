import React, { useState } from "react";
import { getVentasPorPeriodo, VentasPeriodoDTO } from "../../services/api";

const VentasPorPeriodo: React.FC = () => {
  const [data, setData] = useState<VentasPeriodoDTO[]>([]);
  const [period, setPeriod] = useState("mensual");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [cargando, setCargando] = useState(false);

  const fetchData = async () => {
    if (!start) {
      alert("Selecciona una fecha de inicio");
      return;
    }

    setCargando(true);
    try {
      const result = await getVentasPorPeriodo(start, end || "", period); 
      setData(result);
    } catch (error) {
      console.error(error);
      alert("Error al obtener los reportes");
    } finally {
      setCargando(false);
    }
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

  // Calcular totales
  const totalCantidad = data.reduce((sum, item) => sum + (item.totalCantidad || 0), 0);
  const totalMonto = data.reduce((sum, item) => sum + (item.totalMonto || 0), 0);

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
            Ventas por Período
          </h2>
          <p style={{
            color: '#b0b0b0',
            fontSize: '0.95rem',
            margin: 0
          }}>
            Análisis de ventas por rangos de tiempo
          </p>
        </div>
        <div style={{
          display: 'flex',
          gap: 12
        }}>
          <div style={{
            backgroundColor: '#2196F320',
            border: '1px solid #2196F340',
            borderRadius: 8,
            padding: '12px 16px',
            textAlign: 'center',
            minWidth: 100
          }}>
            <div style={{
              color: '#2196F3',
              fontSize: '1.2rem',
              fontWeight: 600
            }}>
              {data.length}
            </div>
            <div style={{
              color: '#2196F3',
              fontSize: '0.7rem',
              fontWeight: 500
            }}>
              Períodos
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

      {/* Panel de filtros */}
      <div style={{
        backgroundColor: '#1a1a1a',
        border: '1px solid #333',
        borderRadius: 12,
        padding: 24,
        marginBottom: 24,
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
      }}>
        <h3 style={{
          color: '#ffffff',
          fontSize: '1.1rem',
          fontWeight: 600,
          margin: '0 0 16px 0'
        }}>
          Filtros de Búsqueda
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr auto',
          gap: 16,
          alignItems: 'end'
        }}>
          <div>
            <label style={{
              display: 'block',
              color: '#ffffff',
              fontSize: '0.9rem',
              fontWeight: 500,
              marginBottom: 8
            }}>
              Fecha Desde *
            </label>
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#2a2a2a',
                border: '1px solid #444',
                borderRadius: 6,
                color: '#ffffff',
                fontSize: '0.9rem',
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
              fontSize: '0.9rem',
              fontWeight: 500,
              marginBottom: 8
            }}>
              Fecha Hasta
            </label>
            <input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#2a2a2a',
                border: '1px solid #444',
                borderRadius: 6,
                color: '#ffffff',
                fontSize: '0.9rem',
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
              fontSize: '0.9rem',
              fontWeight: 500,
              marginBottom: 8
            }}>
              Período
            </label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#2a2a2a',
                border: '1px solid #444',
                borderRadius: 6,
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
              onBlur={(e) => e.target.style.borderColor = '#444'}
            >
              <option value="diario">Diario</option>
              <option value="mensual">Mensual</option>
              <option value="anual">Anual</option>
            </select>
          </div>

          <button 
            onClick={fetchData}
            disabled={cargando}
            style={{
              padding: '10px 20px',
              backgroundColor: cargando ? '#666' : '#2196F3',
              color: '#ffffff',
              border: 'none',
              borderRadius: 6,
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: cargando ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              height: '40px'
            }}
            onMouseEnter={(e) => {
              if (!cargando) {
                e.currentTarget.style.backgroundColor = '#1976D2';
              }
            }}
            onMouseLeave={(e) => {
              if (!cargando) {
                e.currentTarget.style.backgroundColor = '#2196F3';
              }
            }}
          >
            {cargando ? 'Buscando...' : '🔍 Buscar'}
          </button>
        </div>
      </div>

      {/* Tabla de resultados */}
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
                  Período
                </th>
                <th style={{
                  padding: '16px 20px',
                  textAlign: 'right',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  borderBottom: '1px solid #333'
                }}>
                  Total Cantidad
                </th>
                <th style={{
                  padding: '16px 20px',
                  textAlign: 'right',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  borderBottom: '1px solid #333'
                }}>
                  Total Monto
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, index) => (
                <tr 
                  key={index}
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
                    fontWeight: 500,
                    borderBottom: '1px solid #333'
                  }}>
                    {d.periodo || "—"}
                  </td>
                  <td style={{
                    padding: '14px 20px',
                    color: '#FF9800',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    borderBottom: '1px solid #333',
                    textAlign: 'right'
                  }}>
                    {formatCantidad(d.totalCantidad || 0)}
                  </td>
                  <td style={{
                    padding: '14px 20px',
                    color: '#4CAF50',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    borderBottom: '1px solid #333',
                    textAlign: 'right'
                  }}>
                    {formatMoneda(d.totalMonto || 0)}
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

        {data.length === 0 && !cargando && (
          <div style={{
            padding: 60,
            textAlign: 'center',
            color: '#b0b0b0'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>📅</div>
            <div style={{ fontSize: '1.1rem', marginBottom: 8 }}>No hay datos de ventas</div>
            <div style={{ fontSize: '0.9rem' }}>Seleccione un rango de fechas y haga clic en Buscar</div>
          </div>
        )}

        {cargando && (
          <div style={{
            padding: 40,
            textAlign: 'center',
            color: '#b0b0b0'
          }}>
            Cargando datos...
          </div>
        )}
      </div>
    </div>
  );
};

export default VentasPorPeriodo;