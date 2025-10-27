import React, { useState } from "react";
import ProductoForm from "./ProductoForm";
import { createProducto } from "../../services/api";
import { ProductoCreacionDTO } from "../../types/Producto";

interface Props {
  onProductoCreado: () => void;
}

const CrearProducto: React.FC<Props> = ({ onProductoCreado }) => {
  const [mensaje, setMensaje] = useState("");
  const [mostrarForm, setMostrarForm] = useState(true);

  const handleGuardar = async (producto: any) => {
    try {
      const formData = new FormData();
      formData.append("nombre", producto.nombre);
      formData.append("descripcion", producto.descripcion || "");
      formData.append("precio_unitario", producto.precio_unitario.toString());
      formData.append("stock", producto.stock.toString());
      if (producto.imagenArchivo) {
        formData.append("ImagenArchivo", producto.imagenArchivo);
      }

      await createProducto(formData);
      setMensaje("✅ Producto creado correctamente");
      onProductoCreado();
      setMostrarForm(false);
    } catch (err: any) {
      console.error(err);
      setMensaje(`❌ Error al crear producto: ${err.message}`);
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#1a1a1a',
      border: '1px solid #333',
      borderRadius: 12,
      padding: 24,
      marginBottom: 24,
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
    }}>
      {mensaje && (
        <div style={{
          padding: 12,
          borderRadius: 6,
          marginBottom: 16,
          backgroundColor: mensaje.includes('❌') ? '#f4433620' : '#4CAF5020',
          border: `1px solid ${mensaje.includes('❌') ? '#f4433640' : '#4CAF5040'}`,
          color: mensaje.includes('❌') ? '#f44336' : '#4CAF50',
          fontSize: '0.9rem',
          fontWeight: 500
        }}>
          {mensaje}
        </div>
      )}

      {mostrarForm ? (
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20
          }}>
            <h3 style={{
              color: '#ffffff',
              fontSize: '1.3rem',
              fontWeight: 600,
              margin: 0
            }}>
              Crear Nuevo Producto
            </h3>
            <button 
              onClick={() => setMostrarForm(false)}
              style={{
                padding: '8px 12px',
                backgroundColor: 'transparent',
                color: '#b0b0b0',
                border: '1px solid #444',
                borderRadius: 6,
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#333';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#b0b0b0';
              }}
            >
              Cancelar
            </button>
          </div>
          <ProductoForm
            onGuardar={handleGuardar}
            onCerrar={() => setMostrarForm(false)}
          />
        </div>
      ) : (
        <button 
          onClick={() => setMostrarForm(true)}
          style={{
            padding: "12px 24px",
            backgroundColor: '#4CAF50',
            color: '#ffffff',
            border: 'none',
            borderRadius: 8,
            fontSize: '0.95rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#45a049';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#4CAF50';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span>+</span>
          Nuevo Producto
        </button>
      )}
    </div>
  );
};

export default CrearProducto;