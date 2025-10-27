import React, { useEffect, useState } from "react";
import { getProductos, createProducto, updateProducto, deleteProducto } from "../../services/api";
import ProductoForm from "./ProductoForm";
import { ProductoDTO } from "../../types/Producto";

const ListarProductos: React.FC = () => {
  const [productos, setProductos] = useState<ProductoDTO[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [productoEdit, setProductoEdit] = useState<ProductoDTO | null>(null);
  const [mensaje, setMensaje] = useState("");

  const cargarProductos = async () => {
    try {
      const data = await getProductos();
      setProductos(data);
    } catch (err: any) {
      console.error(err);
      setMensaje("❌ Error al cargar productos");
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleGuardar = async (producto: any, id?: string) => {
    try {
      const formData = new FormData();
      formData.append("nombre", producto.nombre);
      formData.append("descripcion", producto.descripcion || "");
      formData.append("precio_unitario", producto.precio_unitario.toString());
      formData.append("stock", producto.stock.toString());
      if (producto.imagenArchivo) {
        formData.append("ImagenArchivo", producto.imagenArchivo);
      }

      if (id) {
        await updateProducto(id, formData);
        setMensaje("✅ Producto actualizado");
      } else {
        await createProducto(formData);
        setMensaje("✅ Producto creado");
      }

      setModalOpen(false);
      setProductoEdit(null);
      cargarProductos();
    } catch (err: any) {
      console.error(err);
      setMensaje(`❌ Error: ${err.message}`);
    }
  };

  const handleEliminar = async (id: string) => {
    if (!window.confirm("¿Eliminar producto?")) return;
    try {
      await deleteProducto(id);
      setMensaje("✅ Producto eliminado");
      cargarProductos();
    } catch {
      setMensaje("❌ Error al eliminar producto");
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
            Gestión de Productos
          </h1>
          <p style={{ 
            color: '#b0b0b0', 
            fontSize: '1.1rem',
            maxWidth: 600,
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Administre el inventario y catálogo de productos
          </p>
        </header>

        {mensaje && (
          <div style={{
            padding: 16,
            borderRadius: 8,
            marginBottom: 24,
            backgroundColor: mensaje.includes('❌') ? '#f4433620' : '#4CAF5020',
            border: `1px solid ${mensaje.includes('❌') ? '#f4433640' : '#4CAF5040'}`,
            color: mensaje.includes('❌') ? '#f44336' : '#4CAF50',
            fontSize: '0.95rem',
            fontWeight: 500,
            textAlign: 'center'
          }}>
            {mensaje}
          </div>
        )}

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
          padding: 24,
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          <div>
            <h2 style={{
              color: '#ffffff',
              fontSize: '1.5rem',
              fontWeight: 600,
              margin: 0
            }}>
              Lista de Productos
            </h2>
            <p style={{
              color: '#b0b0b0',
              fontSize: '0.95rem',
              margin: '8px 0 0 0'
            }}>
              Total de productos: {productos.length}
            </p>
          </div>
          <button
            onClick={() => {
              setModalOpen(true);
              setProductoEdit(null);
            }}
            style={{
              padding: "12px 24px",
              backgroundColor: '#4CAF50',
              color: '#ffffff',
              border: 'none',
              borderRadius: 8,
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
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
            Crear Producto
          </button>
        </div>

        {modalOpen && (
          <ProductoForm
            productoInicial={
              productoEdit
                ? {
                    nombre: productoEdit.nombre ?? "",
                    descripcion: productoEdit.descripcion ?? "",
                    precio_unitario: productoEdit.precio_unitario ?? 0,
                    stock: productoEdit.stock ?? 0,
                  }
                : undefined
            }
            onGuardar={(data) => handleGuardar(data, productoEdit?.id)}
            onCerrar={() => setModalOpen(false)}
          />
        )}

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
                    Imagen
                  </th>
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
                    Precio
                  </th>
                  <th style={{
                    padding: '16px 20px',
                    textAlign: 'left',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    borderBottom: '1px solid #333'
                  }}>
                    Stock
                  </th>
                  <th style={{
                    padding: '16px 20px',
                    textAlign: 'left',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    borderBottom: '1px solid #333'
                  }}>
                    Descripción
                  </th>
                  <th style={{
                    padding: '16px 20px',
                    textAlign: 'left',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    borderBottom: '1px solid #333'
                  }}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {productos.map((p, index) => (
                  <tr 
                    key={p.id}
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
                      padding: '16px 20px',
                      borderBottom: '1px solid #333'
                    }}>
                      {p.imagen_url ? (
                        <img
                          src={p.imagen_url}
                          alt={p.nombre}
                          style={{ 
                            width: 50, 
                            height: 50, 
                            objectFit: "cover",
                            borderRadius: 6,
                            border: '1px solid #333'
                          }}
                        />
                      ) : (
                        <div style={{
                          width: 50,
                          height: 50,
                          backgroundColor: '#2a2a2a',
                          border: '1px solid #333',
                          borderRadius: 6,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#b0b0b0',
                          fontSize: '0.8rem'
                        }}>
                          Sin imagen
                        </div>
                      )}
                    </td>
                    <td style={{
                      padding: '16px 20px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      borderBottom: '1px solid #333'
                    }}>
                      {p.nombre}
                    </td>
                    <td style={{
                      padding: '16px 20px',
                      color: '#4CAF50',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      borderBottom: '1px solid #333'
                    }}>
                      ${p.precio_unitario}
                    </td>
                    <td style={{
                      padding: '16px 20px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      borderBottom: '1px solid #333'
                    }}>
                      {p.stock}
                    </td>
                    <td style={{
                      padding: '16px 20px',
                      color: '#b0b0b0',
                      fontSize: '0.9rem',
                      borderBottom: '1px solid #333',
                      maxWidth: 200,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {p.descripcion || 'Sin descripción'}
                    </td>
                    <td style={{
                      padding: '16px 20px',
                      borderBottom: '1px solid #333'
                    }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          onClick={() => {
                            setProductoEdit(p);
                            setModalOpen(true);
                          }}
                          style={{
                            padding: '8px 16px',
                            backgroundColor: '#2196F3',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: 6,
                            fontSize: '0.8rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#1976D2';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#2196F3';
                          }}
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => handleEliminar(p.id)}
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {productos.length === 0 && (
            <div style={{
              padding: 40,
              textAlign: 'center',
              color: '#b0b0b0'
            }}>
              No hay productos registrados en el sistema
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListarProductos;