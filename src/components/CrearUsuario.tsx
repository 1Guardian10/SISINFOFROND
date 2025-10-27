import React, { useState, useEffect } from "react";
import { UsuarioDTO } from "../types/Usuario";
import { createUsuario, getRoles } from "../services/api";
import ListarRoles from "./roles/ListarRoles";
import { RolDTO } from "../types/Rol";

interface CrearUsuarioProps {
  onUsuarioCreado?: () => void;
}

const CrearUsuario: React.FC<CrearUsuarioProps> = ({ onUsuarioCreado }) => {
  const [usuario, setUsuario] = useState<UsuarioDTO>({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    correo: "",
    telefono: undefined,
    password: "",
    id_rol: "",
    fecha_registro: new Date().toISOString(),
  });

  const [mensaje, setMensaje] = useState("");
  const [roles, setRoles] = useState<RolDTO[]>([]);

  // Traer roles desde la API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getRoles();
        setRoles(data);
      } catch (error: any) {
        console.error("Error al obtener roles:", error.message);
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleRolChange = (rolId: string) => {
    setUsuario({ ...usuario, id_rol: rolId });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!usuario.nombre || !usuario.apellido_paterno || !usuario.correo || !usuario.password || !usuario.id_rol) {
      setMensaje("Por favor, complete todos los campos obligatorios.");
      return;
    }

    try {
      const data = await createUsuario(usuario);
      setMensaje(`Usuario creado exitosamente: ${data.nombre}`);

      // Reset del formulario
      setUsuario({
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        correo: "",
        telefono: undefined,
        password: "",
        id_rol: "",
        fecha_registro: new Date().toISOString(),
      });

      if (onUsuarioCreado) onUsuarioCreado();
    } catch (error: any) {
      setMensaje(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#0f0f0f',
      padding: '40px 20px',
      minHeight: '100vh',
      fontFamily: 'Segoe UI, system-ui, sans-serif'
    }}>
      <div style={{ 
        maxWidth: 800, 
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
            Registrar Nuevo Usuario
          </h1>
          <p style={{ 
            color: '#b0b0b0', 
            fontSize: '1.1rem',
            maxWidth: 600,
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Complete el formulario para agregar un nuevo usuario al sistema
          </p>
        </header>

        <div style={{ 
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: 12,
          padding: 32,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          {mensaje && (
            <div style={{
              padding: 16,
              borderRadius: 8,
              marginBottom: 24,
              backgroundColor: mensaje.includes('Error') ? '#f4433620' : '#4CAF5020',
              border: `1px solid ${mensaje.includes('Error') ? '#f4433640' : '#4CAF5040'}`,
              color: mensaje.includes('Error') ? '#f44336' : '#4CAF50',
              fontSize: '0.95rem',
              fontWeight: 500
            }}>
              {mensaje}
            </div>
          )}
          
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <label style={{
                  display: 'block',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  marginBottom: 8
                }}>
                  Nombre *
                </label>
                <input 
                  type="text" 
                  name="nombre" 
                  placeholder="Ingrese el nombre"
                  value={usuario.nombre} 
                  onChange={handleChange} 
                  required 
                  style={{
                    width: '100%',
                    padding: '14px',
                    backgroundColor: '#2a2a2a',
                    border: '1px solid #444',
                    borderRadius: 8,
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'all 0.2s ease'
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
                  Apellido Paterno *
                </label>
                <input 
                  type="text" 
                  name="apellido_paterno" 
                  placeholder="Ingrese el apellido paterno"
                  value={usuario.apellido_paterno} 
                  onChange={handleChange} 
                  required 
                  style={{
                    width: '100%',
                    padding: '14px',
                    backgroundColor: '#2a2a2a',
                    border: '1px solid #444',
                    borderRadius: 8,
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
                  onBlur={(e) => e.target.style.borderColor = '#444'}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <label style={{
                  display: 'block',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  marginBottom: 8
                }}>
                  Apellido Materno
                </label>
                <input 
                  type="text" 
                  name="apellido_materno" 
                  placeholder="Ingrese el apellido materno"
                  value={usuario.apellido_materno} 
                  onChange={handleChange} 
                  style={{
                    width: '100%',
                    padding: '14px',
                    backgroundColor: '#2a2a2a',
                    border: '1px solid #444',
                    borderRadius: 8,
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'all 0.2s ease'
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
                  Teléfono
                </label>
                <input 
                  type="number" 
                  name="telefono" 
                  placeholder="Ingrese el teléfono"
                  value={usuario.telefono || ""} 
                  onChange={handleChange} 
                  style={{
                    width: '100%',
                    padding: '14px',
                    backgroundColor: '#2a2a2a',
                    border: '1px solid #444',
                    borderRadius: 8,
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
                  onBlur={(e) => e.target.style.borderColor = '#444'}
                />
              </div>
            </div>

            <div>
              <label style={{
                display: 'block',
                color: '#ffffff',
                fontSize: '0.95rem',
                fontWeight: 500,
                marginBottom: 8
              }}>
                Correo Electrónico *
              </label>
              <input 
                type="email" 
                name="correo" 
                placeholder="Ingrese el correo electrónico"
                value={usuario.correo} 
                onChange={handleChange} 
                required 
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #444',
                  borderRadius: 8,
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'all 0.2s ease'
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
                Contraseña *
              </label>
              <input 
                type="password" 
                name="password" 
                placeholder="Ingrese la contraseña"
                value={usuario.password} 
                onChange={handleChange} 
                required 
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #444',
                  borderRadius: 8,
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
                onBlur={(e) => e.target.style.borderColor = '#444'}
              />
            </div>

            {/* Lista de roles desde la API */}
            <div>
              <label style={{
                display: 'block',
                color: '#ffffff',
                fontSize: '0.95rem',
                fontWeight: 500,
                marginBottom: 8
              }}>
                Rol del Usuario *
              </label>
              <ListarRoles value={usuario.id_rol} onChange={handleRolChange} roles={roles} />
            </div>

            <button 
              type="submit" 
              style={{ 
                padding: "16px 32px",
                backgroundColor: '#4CAF50',
                color: '#ffffff',
                border: 'none',
                borderRadius: 8,
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginTop: 8,
                width: '100%'
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
              Registrar Usuario
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearUsuario;