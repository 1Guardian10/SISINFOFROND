// En tu página de productos
import React, { useState, useEffect } from 'react';
import CarritoCompras from '../components/CarritoCompras';
import ListaProductos from '../components/producto/ListarProductoUser';

// Interfaces (debes definirlas o importarlas)
interface ProductoCarrito {
  id: string;
  nombre: string;
  precio_unitario: number;
  imagen_url: string | null;
  stock: number;
  categoria: {
    id: string;
    nombre: string;
  } | null;
}

const ProductosPage: React.FC = () => {
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [productos, setProductos] = useState<ProductoCarrito[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para cargar productos desde la API
  const cargarProductos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://localhost:7112/api/Producto/Listar');
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Asegúrate de que la estructura de datos coincida con tu API
      if (data && Array.isArray(data)) {
        // Mapear los datos de la API a la interfaz ProductoCarrito
        const productosMapeados: ProductoCarrito[] = data.map((producto: any) => ({
          id: producto.id || producto.productoId || '',
          nombre: producto.nombre || 'Producto sin nombre',
          precio_unitario: producto.precio || producto.precio_unitario || 0,
          imagen_url: producto.imagen_url || producto.imagenUrl || null,
          stock: producto.stock || producto.cantidad || 0,
          categoria: producto.categoria ? {
            id: producto.categoria.id || '',
            nombre: producto.categoria.nombre || ''
          } : null
        }));
        
        setProductos(productosMapeados);
      } else {
        throw new Error('Formato de datos inválido');
      }
    } catch (error) {
      console.error('Error cargando productos:', error);
      setError(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    cargarProductos();
  }, []);

  // Función para recargar productos
  const handleRecargarProductos = () => {
    cargarProductos();
  };

  return (
    <div>
      {/* Header con botón del carrito */}
      <div style={styles.header}>
        <h1 style={styles.titulo}>Productos Disponibles</h1>
        <button 
          onClick={() => setMostrarCarrito(true)} 
          style={styles.carritoButton}
        >
          🛒 Ver Carrito
        </button>
      </div>

      {/* Estado de carga y error */}
      {loading && (
        <div style={styles.estado}>
          <div style={styles.spinner}></div>
          Cargando productos...
        </div>
      )}

      {error && (
        <div style={styles.error}>
          <p>Error al cargar productos: {error}</p>
          <button onClick={handleRecargarProductos} style={styles.reintentarButton}>
            Reintentar
          </button>
        </div>
      )}

      {/* Lista de productos */}
      {!loading && !error && (
        <ListaProductos esAdmin={false} />
      )}

      {/* Modal del carrito */}
      {mostrarCarrito && (
        <CarritoCompras
          productos={productos}
          onCerrar={() => setMostrarCarrito(false)}
        />
      )}
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#1a1a1a',
    borderBottom: '1px solid #333',
    marginBottom: '20px'
  },
  titulo: {
    color: '#ffffff',
    fontSize: '1.8rem',
    fontWeight: 600,
    margin: 0
  },
  carritoButton: {
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
  estado: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    color: '#ffffff',
    gap: '12px'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #333',
    borderTop: '4px solid #00BCD4',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  error: {
    backgroundColor: '#2d1b1b',
    border: '1px solid #f44336',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px',
    color: '#ffffff',
    textAlign: 'center' as 'center'
  },
  reintentarButton: {
    padding: '8px 16px',
    backgroundColor: '#f44336',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px'
  }
};

// Agregar la animación del spinner
const styleSheet = document.styleSheets[0];
if (styleSheet) {
  styleSheet.insertRule(`
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `, styleSheet.cssRules.length);
}

export default ProductosPage;