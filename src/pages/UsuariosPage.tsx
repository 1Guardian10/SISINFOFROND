import React, { useEffect, useState } from "react";
import { getUsuarios } from "../services/api";
import { ListarUsuarioDTO } from "../types/Usuario";
import CrearUsuario from "../components/CrearUsuario";

const UsuariosPage: React.FC = () => {
  const [usuarios, setUsuarios] = useState<ListarUsuarioDTO[]>([]);
  const [error, setError] = useState("");

  const cargarUsuarios = () => {
    getUsuarios()
      .then(setUsuarios)
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    cargarUsuarios();
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

        <CrearUsuario onUsuarioCreado={cargarUsuarios} />

        {error && (
          <div style={{
            padding: 16,
            borderRadius: 8,
            marginBottom: 24,
            backgroundColor: '#f4433620',
            border: '1px solid #f4433640',
            color: '#f44336',
            fontSize: '0.95rem',
            fontWeight: 500
          }}>
            {error}
          </div>
        )}

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
              Lista de Usuarios
            </h2>
            <p style={{
              color: '#b0b0b0',
              fontSize: '0.95rem',
              margin: '8px 0 0 0'
            }}>
              Total de usuarios registrados: {usuarios.length}
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
                    Nombre
                  </th>
                  <th style={{
                    padding: '16px 20px',
                    textAlign: 'left',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    borderBottom: '1px solid #333'
                  }}>
                    Apellido Paterno
                  </th>
                  <th style={{
                    padding: '16px 20px',
                    textAlign: 'left',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    borderBottom: '1px solid #333'
                  }}>
                    Apellido Materno
                  </th>
                  <th style={{
                    padding: '16px 20px',
                    textAlign: 'left',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    borderBottom: '1px solid #333'
                  }}>
                    Correo
                  </th>
                  <th style={{
                    padding: '16px 20px',
                    textAlign: 'left',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    borderBottom: '1px solid #333'
                  }}>
                    Teléfono
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
                {usuarios.map((u, index) => (
                  <tr 
                    key={u.id}
                    style={{
                      backgroundColor: index % 2 === 0 ? '#1a1a1a' : '#1f1f1f',
                      transition: 'background-color 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#2a2a2a';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#1a1a1a' : '#1f1f1f';
                    }}
                  >
                    <td style={{
                      padding: '16px 20px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      borderBottom: '1px solid #333'
                    }}>
                      {u.nombre}
                    </td>
                    <td style={{
                      padding: '16px 20px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      borderBottom: '1px solid #333'
                    }}>
                      {u.apellido_paterno}
                    </td>
                    <td style={{
                      padding: '16px 20px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      borderBottom: '1px solid #333'
                    }}>
                      {u.apellido_materno}
                    </td>
                    <td style={{
                      padding: '16px 20px',
                      color: '#b0b0b0',
                      fontSize: '0.9rem',
                      borderBottom: '1px solid #333'
                    }}>
                      {u.correo}
                    </td>
                    <td style={{
                      padding: '16px 20px',
                      color: '#b0b0b0',
                      fontSize: '0.9rem',
                      borderBottom: '1px solid #333'
                    }}>
                      {u.telefono}
                    </td>
                    <td style={{
                      padding: '16px 20px',
                      fontSize: '0.9rem',
                      borderBottom: '1px solid #333'
                    }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: 20,
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        backgroundColor: u.estado === 'Activo' ? '#4CAF5020' : '#f4433620',
                        color: u.estado === 'Activo' ? '#4CAF50' : '#f44336',
                        border: `1px solid ${u.estado === 'Activo' ? '#4CAF5040' : '#f4433640'}`
                      }}>
                        {u.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {usuarios.length === 0 && !error && (
            <div style={{
              padding: 40,
              textAlign: 'center',
              color: '#b0b0b0'
            }}>
              No hay usuarios registrados en el sistema
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsuariosPage;