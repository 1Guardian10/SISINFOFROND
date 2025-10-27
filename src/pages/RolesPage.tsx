import React, { useEffect, useState } from "react";
import CrearRol from "../components/roles/CrearRol";
import { RolDTO } from "../types/Rol";
import { getRoles, deleteRol } from "../services/api";

const RolesPage: React.FC = () => {
  const [roles, setRoles] = useState<RolDTO[]>([]);
  const [error, setError] = useState("");

  const fetchRoles = async () => {
    try {
      const data = await getRoles();
      setRoles(data);
    } catch (err: any) {
      setError(err.message || "Error al cargar roles");
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleEliminar = async (id: string) => {
    if (!window.confirm("¿Deseas eliminar este rol?")) return;
    try {
      await deleteRol(id);
      fetchRoles();
    } catch (err: any) {
      setError(err.message || "Error al eliminar rol");
    }
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
            Gestión de Roles
          </h1>
          <p style={{ 
            color: '#b0b0b0', 
            fontSize: '1.1rem',
            maxWidth: 600,
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Administre los roles y permisos de acceso del sistema
          </p>
        </header>

        <CrearRol onRolCreado={fetchRoles} />

        {error && (
          <div style={{
            padding: 16,
            borderRadius: 8,
            margin: '24px 0',
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
          padding: 24,
          marginTop: 24,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          <h2 style={{
            color: '#ffffff',
            fontSize: '1.5rem',
            fontWeight: 600,
            margin: '0 0 20px 0'
          }}>
            Roles Existentes
          </h2>
          
          {roles.length === 0 ? (
            <div style={{
              padding: 40,
              textAlign: 'center',
              color: '#b0b0b0',
              fontSize: '1rem'
            }}>
              No hay roles registrados
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gap: 12
            }}>
              {roles.map((rol, index) => (
                <div
                  key={rol.id}
                  style={{
                    padding: '16px 20px',
                    backgroundColor: index % 2 === 0 ? '#2a2a2a' : '#1f1f1f',
                    border: '1px solid #333',
                    borderRadius: 8,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#333';
                    e.currentTarget.style.borderColor = '#444';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#2a2a2a' : '#1f1f1f';
                    e.currentTarget.style.borderColor = '#333';
                  }}
                >
                  <span style={{
                    color: '#ffffff',
                    fontSize: '1rem',
                    fontWeight: 500
                  }}>
                    {rol.nombre}
                  </span>
                  <button
                    onClick={() => handleEliminar(rol.id)}
                    style={{
                      padding: '8px 16px',
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RolesPage;