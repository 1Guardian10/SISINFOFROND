import React, { useEffect, useState } from "react";
import CrearCategoria from "../components/categoria/CrearCategoria";
import { CategoriaDTO } from "../types/Categoria";
import { getCategorias, deleteCategoria } from "../services/api";

const CategoriasPage: React.FC = () => {
  const [categorias, setCategorias] = useState<CategoriaDTO[]>([]);
  const [error, setError] = useState("");

  const fetchCategorias = async () => {
    try {
      const data = await getCategorias();
      setCategorias(data);
    } catch (err: any) {
      setError(err.message || "Error al cargar categorías");
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleEliminar = async (id: string) => {
    if (!window.confirm("¿Deseas eliminar esta categoría?")) return;
    try {
      await deleteCategoria(id);
      fetchCategorias();
    } catch (err: any) {
      setError(err.message || "Error al eliminar categoría");
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
            Gestión de Categorías
          </h1>
          <p style={{ 
            color: '#b0b0b0', 
            fontSize: '1.1rem',
            maxWidth: 600,
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Organice y administre las categorías del sistema
          </p>
        </header>

        <CrearCategoria onCategoriaCreada={fetchCategorias} />

        {error && (
          <div style={{
            padding: 16,
            borderRadius: 8,
            margin: '24px 0',
            backgroundColor: '#f4433620',
            border: '1px solid #f4433640',
            color: '#f44336',
            fontSize: '0.95rem',
            fontWeight: 500,
            textAlign: 'center'
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
            Categorías Existentes
          </h2>
          <p style={{
            color: '#b0b0b0',
            fontSize: '0.95rem',
            margin: '0 0 20px 0'
          }}>
            Total de categorías: {categorias.length}
          </p>
          
          {categorias.length === 0 ? (
            <div style={{
              padding: 40,
              textAlign: 'center',
              color: '#b0b0b0',
              fontSize: '1rem'
            }}>
              No hay categorías registradas
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gap: 12
            }}>
              {categorias.map((cat, index) => (
                <div
                  key={cat.id}
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
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12
                  }}>
                    <div style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: '#4CAF50'
                    }} />
                    <span style={{
                      color: '#ffffff',
                      fontSize: '1rem',
                      fontWeight: 500
                    }}>
                      {cat.nombre}
                    </span>
                  </div>
                  <button
                    onClick={() => handleEliminar(cat.id)}
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
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f44336';
                      e.currentTarget.style.transform = 'scale(1)';
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

export default CategoriasPage;