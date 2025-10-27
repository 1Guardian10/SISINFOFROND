import React, { useState, useEffect, CSSProperties } from 'react';

// Interfaces basadas en tu JSON
interface Categoria {
  id: string;
  nombre: string;
}

interface Producto {
  id: string;
  nombre: string;
  descripcion: string | null;
  precio_unitario: number;
  imagen_url: string | null;
  stock: number;
  estado: string;
  categoria: Categoria | null;
}

interface ListaProductosProps {
  esAdmin?: boolean;
}

const ListaProductos: React.FC<ListaProductosProps> = ({ esAdmin = false }) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Imagen por defecto (puedes reemplazar con tu propia imagen o usar un SVG)
  const imagenPorDefecto = `data:image/svg+xml;base64,${btoa(`
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#1a1a1a"/>
      <rect x="50" y="50" width="100" height="80" rx="8" fill="#333" stroke="#00BCD4" stroke-width="2"/>
      <circle cx="100" cy="80" r="15" fill="#00BCD4"/>
      <rect x="70" y="105" width="60" height="8" rx="4" fill="#666"/>
      <rect x="80" y="120" width="40" height="6" rx="3" fill="#666"/>
    </svg>
  `)}`;

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setIsLoading(true);
        // Reemplaza con tu endpoint real
        const response = await fetch('https://localhost:7112/api/Producto/Listar');
        
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }
        
        const data = await response.json();
        setProductos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        // Datos de ejemplo para desarrollo
        setProductos([
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductos();
  }, []);

  // Función para manejar errores de carga de imagen
  const manejarErrorImagen = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = imagenPorDefecto;
  };

  // Función para obtener el color del estado
  const getColorEstado = (estado: string): string => {
    switch (estado.toLowerCase()) {
      case 'disponible':
      case 'activo':
        return '#4CAF50';
      case 'inactivo':
        return '#f44336';
      case 'agotado':
        return '#ff9800';
      default:
        return '#666';
    }
  };

  // Función para formatear precio
  const formatearPrecio = (precio: number): string => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(precio);
  };

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorIcon}>⚠️</div>
        <h3 style={styles.errorTitle}>Error al cargar productos</h3>
        <p style={styles.errorMessage}>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={styles.retryButton}
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          {esAdmin ? 'Gestión de Productos' : 'Catálogo de Productos'}
        </h1>
        {esAdmin && (
          <button style={styles.addButton}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Agregar Producto
          </button>
        )}
      </div>

      {/* Grid de productos */}
      <div style={styles.grid}>
        {productos.map((producto) => (
          <div key={producto.id} style={styles.card}>
            {/* Imagen del producto */}
            <div style={styles.imageContainer}>
              <img
                src={producto.imagen_url || imagenPorDefecto}
                alt={producto.nombre}
                style={styles.image}
                onError={manejarErrorImagen}
              />
              {/* Badge de estado */}
              <div style={{
                ...styles.statusBadge,
                backgroundColor: getColorEstado(producto.estado)
              }}>
                {producto.estado}
              </div>
              {/* Badge de categoría */}
              {producto.categoria && (
                <div style={styles.categoryBadge}>
                  {producto.categoria.nombre}
                </div>
              )}
            </div>

            {/* Información del producto */}
            <div style={styles.infoContainer}>
              <h3 style={styles.productName}>{producto.nombre}</h3>
              
              {producto.descripcion && (
                <p style={styles.description}>{producto.descripcion}</p>
              )}

              <div style={styles.details}>
                <div style={styles.price}>{formatearPrecio(producto.precio_unitario)}</div>
                <div style={styles.stock}>
                  <span style={styles.stockLabel}>Stock:</span>
                  <span style={{
                    ...styles.stockValue,
                    color: producto.stock > 0 ? '#4CAF50' : '#f44336'
                  }}>
                    {producto.stock} unidades
                  </span>
                </div>
              </div>

              {/* Acciones */}
              <div style={styles.actions}>
                {esAdmin ? (
                  <>
                    <button style={styles.editButton}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Editar
                    </button>
                    <button style={styles.deleteButton}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Eliminar
                    </button>
                  </>
                ) : (
                  <>
                    <button style={styles.buyButton}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Comprar
                    </button>
                    <button style={styles.detailsButton}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Detalles
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mensaje si no hay productos */}
      {productos.length === 0 && (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📦</div>
          <h3 style={styles.emptyTitle}>No hay productos disponibles</h3>
          <p style={styles.emptyMessage}>
            {esAdmin 
              ? 'Comienza agregando tu primer producto al catálogo.'
              : 'Pronto tendremos nuevos productos disponibles.'
            }
          </p>
          {esAdmin && (
            <button style={styles.addButton}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Agregar Primer Producto
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// Estilos
const styles: { [key: string]: CSSProperties } = {
  container: {
    padding: '24px',
    backgroundColor: '#0f0f0f',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, system-ui, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    flexWrap: 'wrap' as const,
    gap: '16px'
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#ffffff',
    margin: 0
  },
  addButton: {
    padding: '12px 20px',
    backgroundColor: '#00BCD4',
    color: '#0f0f0f',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px'
  },
  card: {
    backgroundColor: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '12px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  imageContainer: {
    position: 'relative',
    height: '200px',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease'
  },
  statusBadge: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '0.7rem',
    fontWeight: 600,
    color: '#ffffff'
  },
  categoryBadge: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    padding: '4px 8px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '12px',
    fontSize: '0.7rem',
    fontWeight: 600,
    color: '#ffffff'
  },
  infoContainer: {
    padding: '20px'
  },
  productName: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#ffffff',
    margin: '0 0 8px 0'
  },
  description: {
    color: '#b0b0b0',
    fontSize: '0.9rem',
    lineHeight: 1.4,
    margin: '0 0 16px 0',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  price: {
    fontSize: '1.2rem',
    fontWeight: 700,
    color: '#00BCD4'
  },
  stock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '2px'
  },
  stockLabel: {
    fontSize: '0.7rem',
    color: '#666',
    fontWeight: 500
  },
  stockValue: {
    fontSize: '0.8rem',
    fontWeight: 600
  },
  actions: {
    display: 'flex',
    gap: '8px'
  },
  buyButton: {
    flex: 1,
    padding: '10px 16px',
    backgroundColor: '#00BCD4',
    color: '#0f0f0f',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.8rem',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    justifyContent: 'center'
  },
  detailsButton: {
    flex: 1,
    padding: '10px 16px',
    backgroundColor: 'transparent',
    color: '#00BCD4',
    border: '1px solid #00BCD4',
    borderRadius: '6px',
    fontSize: '0.8rem',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    justifyContent: 'center'
  },
  editButton: {
    flex: 1,
    padding: '10px 16px',
    backgroundColor: '#ffa726',
    color: '#0f0f0f',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.8rem',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    justifyContent: 'center'
  },
  deleteButton: {
    flex: 1,
    padding: '10px 16px',
    backgroundColor: 'transparent',
    color: '#f44336',
    border: '1px solid #f44336',
    borderRadius: '6px',
    fontSize: '0.8rem',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    justifyContent: 'center'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 24px',
    backgroundColor: '#0f0f0f',
    minHeight: '50vh'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #333',
    borderTop: '3px solid #00BCD4',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '16px'
  },
  loadingText: {
    color: '#b0b0b0',
    fontSize: '1rem',
    margin: 0
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 24px',
    backgroundColor: '#0f0f0f',
    minHeight: '50vh',
    textAlign: 'center'
  },
  errorIcon: {
    fontSize: '3rem',
    marginBottom: '16px'
  },
  errorTitle: {
    color: '#ffffff',
    fontSize: '1.5rem',
    margin: '0 0 8px 0'
  },
  errorMessage: {
    color: '#b0b0b0',
    fontSize: '1rem',
    margin: '0 0 24px 0'
  },
  retryButton: {
    padding: '12px 24px',
    backgroundColor: '#00BCD4',
    color: '#0f0f0f',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer'
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 24px',
    textAlign: 'center'
  },
  emptyIcon: {
    fontSize: '4rem',
    marginBottom: '16px'
  },
  emptyTitle: {
    color: '#ffffff',
    fontSize: '1.5rem',
    margin: '0 0 8px 0'
  },
  emptyMessage: {
    color: '#b0b0b0',
    fontSize: '1rem',
    margin: '0 0 24px 0'
  }
};

// Agregar los estilos de animación globalmente
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

export default ListaProductos;