// src/components/CarritoCompras.tsx
import React, { useState, useEffect, CSSProperties } from 'react';
import { useAuth } from './context/AuthContext';

// Interfaces
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

interface ItemCarrito {
  id: string;
  producto: ProductoCarrito;
  cantidad: number;
}

interface CarritoRequest {
  idUsuario: string;
  idMetodoPago: string;
  detalles: Array<{
    id: string; 
    cantidad: number;
  }>;
}

interface MetodoPago {
  id: string;
  nombre: string;
  estado: string;
}

interface CarritoComprasProps {
  productos: ProductoCarrito[];
  onCerrar: () => void;
}

const CarritoCompras: React.FC<CarritoComprasProps> = ({ productos, onCerrar }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [metodosPago, setMetodosPago] = useState<MetodoPago[]>([]);
  const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'success' | 'error'; texto: string } | null>(null);

  // Imagen por defecto
  const imagenPorDefecto = `data:image/svg+xml;base64,${btoa(`
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#1a1a1a"/>
      <rect x="50" y="50" width="100" height="80" rx="8" fill="#333" stroke="#00BCD4" stroke-width="2"/>
      <circle cx="100" cy="80" r="15" fill="#00BCD4"/>
      <rect x="70" y="105" width="60" height="8" rx="4" fill="#666"/>
      <rect x="80" y="120" width="40" height="6" rx="3" fill="#666"/>
    </svg>
  `)}`;

  // Cargar métodos de pago
  useEffect(() => {
    const cargarMetodosPago = async () => {
    try {
      // Llamada a tu API real de métodos de pago
      const response = await fetch('https://localhost:7112/api/MetodoPago/Listar');
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const metodos: MetodoPago[] = await response.json();
      
      console.log('Métodos de pago cargados:', metodos);
      
      // Filtrar solo métodos activos
      const metodosActivos = metodos.filter(metodo => 
        metodo.estado?.toLowerCase() === 'activo'
      );
      
      setMetodosPago(metodosActivos);
      
      // Seleccionar el primer método activo por defecto
      if (metodosActivos.length > 0) {
        setMetodoPagoSeleccionado(metodosActivos[0].id);
      } else {
        mostrarMensaje('error', 'No hay métodos de pago disponibles');
      }
      
    } catch (error) {
      console.error('Error cargando métodos de pago:', error);
      
      // Datos de fallback en caso de error
      const metodosFallback: MetodoPago[] = [
        { 
          id: '70587813-b3da-4e17-710f-08de14e61230', 
          nombre: 'QR', 
          estado: 'Activo'
        },
        { 
          id: '80587813-b3da-4e17-710f-08de14e61231', 
          nombre: 'Tarjeta de Crédito', 
          estado: 'Activo'
        },
        { 
          id: '90587813-b3da-4e17-710f-08de14e61232', 
          nombre: 'Efectivo', 
          estado: 'Activo'
        }
      ];

    setMetodosPago(metodosFallback);
      
      if (metodosFallback.length > 0) {
        setMetodoPagoSeleccionado(metodosFallback[0].id);
      }
      
      mostrarMensaje('error', 'Error cargando métodos de pago. Usando métodos predeterminados.');
    }
  };

  cargarMetodosPago();
  }, []);

  // Agregar producto al carrito
const agregarAlCarrito = (producto: ProductoCarrito) => {
  setItems(prevItems => {
    const itemExistente = prevItems.find(item => item.producto.id === producto.id);
    
    if (itemExistente) {
      // Si ya existe, aumentar cantidad (máximo el stock disponible)
      if (itemExistente.cantidad < producto.stock) {
        return prevItems.map(item =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        mostrarMensaje('error', 'No hay suficiente stock disponible');
        return prevItems;
      }
    } else {
      // Si no existe, agregar nuevo item
      if (producto.stock > 0) {
        return [...prevItems, { 
          id: `${producto.id}-${Date.now()}`, // ID único para el item del carrito
          producto, 
          cantidad: 1 
        }];
      } else {
        mostrarMensaje('error', 'Producto sin stock disponible');
        return prevItems;
      }
    }
  });
};

  // Remover producto del carrito
  const removerDelCarrito = (productoId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productoId));
  };

  // Actualizar cantidad
  const actualizarCantidad = (productoId: string, nuevaCantidad: number) => {
    if (nuevaCantidad < 1) return;

    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id === productoId) {
          // Validar que no exceda el stock
          if (nuevaCantidad <= item.producto.stock) {
            return { ...item, cantidad: nuevaCantidad };
          } else {
            mostrarMensaje('error', `Solo hay ${item.producto.stock} unidades disponibles`);
            return item;
          }
        }
        return item;
      })
    );
  };

  // Calcular totales
  const subtotal = items.reduce((total, item) => total + (item.producto.precio_unitario * item.cantidad), 0);
  const iva = subtotal * 0.16; // 16% IVA
  const total = subtotal + iva;
  const totalItems = items.reduce((total, item) => total + item.cantidad, 0);

  // Mostrar mensaje temporal
  const mostrarMensaje = (tipo: 'success' | 'error', texto: string) => {
    setMensaje({ tipo, texto });
    setTimeout(() => setMensaje(null), 3000);
  };

  // Procesar compra
    const procesarCompra = async () => {
    if (!user) {
        mostrarMensaje('error', 'Debes iniciar sesión para realizar una compra');
        return;
    }

    if (items.length === 0) {
        mostrarMensaje('error', 'El carrito está vacío');
        return;
    }

    if (!metodoPagoSeleccionado) {
        mostrarMensaje('error', 'Selecciona un método de pago');
        return;
    }


    setIsLoading(true);

    try {
    // Estructura EXACTA que espera tu API
    const carritoData: CarritoRequest = {
      idUsuario: user.id,
      idMetodoPago: metodoPagoSeleccionado,
      detalles: items.map(item => ({
        id: item.producto.id,  // IMPORTANTE: Usar el ID del producto, no del item del carrito
        cantidad: item.cantidad
      }))
    };

    console.log('Enviando datos al carrito:', JSON.stringify(carritoData, null, 2));

    // Llamada a la API
    const response = await fetch('https://localhost:7112/api/Pedido/Registrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carritoData),
    });

      if (response.ok) {
      const result = await response.json();
      console.log('Compra exitosa:', result);
      mostrarMensaje('success', '¡Compra realizada con éxito!');
      setItems([]); // Vaciar carrito
      setTimeout(() => onCerrar(), 2000); // Cerrar después de 2 segundos
        } else {
        let errorMessage = 'Error al procesar la compra';
        
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.title || errorMessage;
            
            // Mostrar errores de validación específicos
            if (errorData.errors) {
            const validationErrors = Object.values(errorData.errors).flat();
            errorMessage = `Errores de validación: ${validationErrors.join(', ')}`;
            }
        } catch (parseError) {
            errorMessage = `Error ${response.status}: ${response.statusText}`;
        }
        
        throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error procesando compra:', error);
        mostrarMensaje('error', error instanceof Error ? error.message : 'Error al procesar la compra');
    } finally {
        setIsLoading(false);
    }
  };

  // Manejar error de imagen
  const manejarErrorImagen = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = imagenPorDefecto;
  };

  // Formatear precio
  const formatearPrecio = (precio: number): string => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(precio);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>
            🛒 Carrito de Compras
            {totalItems > 0 && <span style={styles.badge}>{totalItems}</span>}
          </h2>
          <button onClick={onCerrar} style={styles.closeButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mensajes */}
        {mensaje && (
          <div style={{
            ...styles.mensaje,
            backgroundColor: mensaje.tipo === 'success' ? '#4CAF50' : '#f44336'
          }}>
            {mensaje.texto}
          </div>
        )}

        <div style={styles.content}>
          {/* Productos disponibles */}
          <div style={styles.seccion}>
            <h3 style={styles.seccionTitulo}>Productos Disponibles</h3>
            <div style={styles.productosGrid}>
              {productos.map(producto => (
                <div key={producto.id} style={styles.productoCard}>
                  <img
                    src={producto.imagen_url || imagenPorDefecto}
                    alt={producto.nombre}
                    style={styles.productoImagen}
                    onError={manejarErrorImagen}
                  />
                  <div style={styles.productoInfo}>
                    <h4 style={styles.productoNombre}>{producto.nombre}</h4>
                    <div style={styles.productoPrecio}>{formatearPrecio(producto.precio_unitario)}</div>
                    <div style={styles.productoStock}>
                      Stock: {producto.stock} unidades
                    </div>
                    <button
                      onClick={() => agregarAlCarrito(producto)}
                      disabled={producto.stock === 0}
                      style={{
                        ...styles.agregarButton,
                        opacity: producto.stock === 0 ? 0.5 : 1
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      Agregar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carrito */}
          <div style={styles.seccion}>
            <h3 style={styles.seccionTitulo}>Tu Carrito</h3>
            
            {items.length === 0 ? (
              <div style={styles.carritoVacio}>
                <div style={styles.carritoVacioIcon}>🛒</div>
                <p style={styles.carritoVacioTexto}>Tu carrito está vacío</p>
                <p style={styles.carritoVacioSubtexto}>Agrega productos desde la lista de disponibles</p>
              </div>
            ) : (
              <>
                <div style={styles.itemsList}>
                  {items.map(item => (
                    <div key={item.id} style={styles.item}>
                      <img
                        src={item.producto.imagen_url || imagenPorDefecto}
                        alt={item.producto.nombre}
                        style={styles.itemImagen}
                        onError={manejarErrorImagen}
                      />
                      <div style={styles.itemInfo}>
                        <h4 style={styles.itemNombre}>{item.producto.nombre}</h4>
                        <div style={styles.itemPrecio}>
                          {formatearPrecio(item.producto.precio_unitario)} c/u
                        </div>
                      </div>
                      <div style={styles.itemControles}>
                        <div style={styles.cantidadControls}>
                          <button
                            onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                            style={styles.cantidadButton}
                          >
                            -
                          </button>
                          <span style={styles.cantidad}>{item.cantidad}</span>
                          <button
                            onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                            disabled={item.cantidad >= item.producto.stock}
                            style={{
                              ...styles.cantidadButton,
                              opacity: item.cantidad >= item.producto.stock ? 0.5 : 1
                            }}
                          >
                            +
                          </button>
                        </div>
                        <div style={styles.itemSubtotal}>
                          {formatearPrecio(item.producto.precio_unitario * item.cantidad)}
                        </div>
                        <button
                          onClick={() => removerDelCarrito(item.id)}
                          style={styles.eliminarButton}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Resumen de compra */}
                <div style={styles.resumen}>
                  <h4 style={styles.resumenTitulo}>Resumen de Compra</h4>
                  
                  {/* Método de pago */}
                  <div style={styles.metodoPago}>
                    <label style={styles.metodoPagoLabel}>Método de Pago:</label>
                    <select
                        value={metodoPagoSeleccionado}
                        onChange={(e) => setMetodoPagoSeleccionado(e.target.value)}
                        style={styles.metodoPagoSelect}
                    >
                        {metodosPago.map(metodo => (
                        <option key={metodo.id} value={metodo.id}>
                            {metodo.nombre} {metodo.estado !== 'Activo' ? '(Inactivo)' : ''}
                        </option>
                        ))}
                    </select>
                    
                    {/* Mostrar información adicional del método seleccionado */}
                    {metodoPagoSeleccionado && (
                        <div style={styles.metodoPagoInfo}>
                        <small style={{ color: '#00BCD4' }}>
                            Estado: {metodosPago.find(m => m.id === metodoPagoSeleccionado)?.estado}
                        </small>
                        </div>
                    )}
                    </div>

                  {/* Totales */}
                  <div style={styles.totales}>
                    <div style={styles.totalLine}>
                      <span>Subtotal:</span>
                      <span>{formatearPrecio(subtotal)}</span>
                    </div>
                    <div style={styles.totalLine}>
                      <span>IVA (16%):</span>
                      <span>{formatearPrecio(iva)}</span>
                    </div>
                    <div style={styles.totalLineGrande}>
                      <span>Total:</span>
                      <span>{formatearPrecio(total)}</span>
                    </div>
                  </div>

                  {/* Botón de compra */}
                  <button
                    onClick={procesarCompra}
                    disabled={isLoading || items.length === 0}
                    style={{
                      ...styles.comprarButton,
                      opacity: (isLoading || items.length === 0) ? 0.5 : 1
                    }}
                  >
                    {isLoading ? (
                      <>
                        <div style={styles.spinner}></div>
                        Procesando...
                      </>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Realizar Compra
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Estilos
const styles: { [key: string]: CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  metodoPagoInfo: {
  marginTop: '4px',
  fontSize: '0.8rem'
},
  modal: {
    backgroundColor: '#0f0f0f',
    border: '1px solid #333',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '1200px',
    maxHeight: '90vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: '1px solid #333',
    backgroundColor: '#1a1a1a'
  },
  title: {
    color: '#ffffff',
    fontSize: '1.5rem',
    fontWeight: 600,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  badge: {
    backgroundColor: '#00BCD4',
    color: '#0f0f0f',
    borderRadius: '12px',
    padding: '2px 8px',
    fontSize: '0.8rem',
    fontWeight: 600
  },
  closeButton: {
    background: 'transparent',
    border: '1px solid #333',
    borderRadius: '6px',
    padding: '8px',
    cursor: 'pointer',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mensaje: {
    padding: '12px 16px',
    color: '#ffffff',
    borderRadius: '6px',
    margin: '16px 24px 0',
    fontWeight: 500
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gap: '24px',
    padding: '24px',
    overflow: 'auto',
    flex: 1
  },
  seccion: {
    display: 'flex',
    flexDirection: 'column'
  },
  seccionTitulo: {
    color: '#ffffff',
    fontSize: '1.2rem',
    fontWeight: 600,
    margin: '0 0 16px 0',
    paddingBottom: '8px',
    borderBottom: '2px solid #00BCD4'
  },
  productosGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '12px',
    overflow: 'auto'
  },
  productoCard: {
    backgroundColor: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  productoImagen: {
    width: '100%',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '4px'
  },
  productoInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  productoNombre: {
    color: '#ffffff',
    fontSize: '0.9rem',
    fontWeight: 600,
    margin: 0
  },
  productoPrecio: {
    color: '#00BCD4',
    fontSize: '0.9rem',
    fontWeight: 700
  },
  productoStock: {
    color: '#b0b0b0',
    fontSize: '0.7rem'
  },
  agregarButton: {
    padding: '6px 12px',
    backgroundColor: '#00BCD4',
    color: '#0f0f0f',
    border: 'none',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    justifyContent: 'center'
  },
  carritoVacio: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#666'
  },
  carritoVacioIcon: {
    fontSize: '3rem',
    marginBottom: '12px'
  },
  carritoVacioTexto: {
    fontSize: '1.1rem',
    fontWeight: 600,
    margin: '0 0 8px 0',
    color: '#ffffff'
  },
  carritoVacioSubtexto: {
    fontSize: '0.9rem',
    margin: 0,
    color: '#b0b0b0'
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxHeight: '300px',
    overflow: 'auto'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    backgroundColor: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '8px'
  },
  itemImagen: {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    borderRadius: '4px'
  },
  itemInfo: {
    flex: 1,
    minWidth: 0
  },
  itemNombre: {
    color: '#ffffff',
    fontSize: '0.9rem',
    fontWeight: 600,
    margin: '0 0 4px 0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  itemPrecio: {
    color: '#00BCD4',
    fontSize: '0.8rem'
  },
  itemControles: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  cantidadControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  cantidadButton: {
    width: '24px',
    height: '24px',
    backgroundColor: '#333',
    border: 'none',
    borderRadius: '4px',
    color: '#ffffff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cantidad: {
    color: '#ffffff',
    fontSize: '0.9rem',
    fontWeight: 600,
    minWidth: '20px',
    textAlign: 'center'
  },
  itemSubtotal: {
    color: '#ffffff',
    fontSize: '0.9rem',
    fontWeight: 600,
    minWidth: '80px',
    textAlign: 'right'
  },
  eliminarButton: {
    background: 'transparent',
    border: '1px solid #f44336',
    borderRadius: '4px',
    padding: '4px',
    cursor: 'pointer',
    color: '#f44336',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  resumen: {
    backgroundColor: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '20px',
    marginTop: '20px'
  },
  resumenTitulo: {
    color: '#ffffff',
    fontSize: '1.1rem',
    fontWeight: 600,
    margin: '0 0 16px 0'
  },
  metodoPago: {
    marginBottom: '16px'
  },
  metodoPagoLabel: {
    display: 'block',
    color: '#b0b0b0',
    fontSize: '0.9rem',
    marginBottom: '8px'
  },
  metodoPagoSelect: {
    width: '100%',
    padding: '8px 12px',
    backgroundColor: '#0f0f0f',
    border: '1px solid #333',
    borderRadius: '6px',
    color: '#ffffff',
    fontSize: '0.9rem'
  },
  totales: {
    borderTop: '1px solid #333',
    paddingTop: '16px',
    marginBottom: '20px'
  },
  totalLine: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#b0b0b0',
    fontSize: '0.9rem',
    marginBottom: '8px'
  },
  totalLineGrande: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#ffffff',
    fontSize: '1.1rem',
    fontWeight: 700,
    marginTop: '12px',
    paddingTop: '12px',
    borderTop: '1px solid #333'
  },
  comprarButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#00BCD4',
    color: '#0f0f0f',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    justifyContent: 'center'
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid transparent',
    borderTop: '2px solid #0f0f0f',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  }
};

// Agregar animación del spinner
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

export default CarritoCompras;