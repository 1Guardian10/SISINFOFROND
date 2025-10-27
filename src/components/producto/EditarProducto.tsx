import React from "react";
import { updateProducto } from "../../services/api";
import ProductoForm from "./ProductoForm";

interface Props {
  producto: {
    id: string;
    nombre: string;
    descripcion?: string;
    precio_unitario: number;
    stock: number;
    imagen_url?: string;
  };
  onGuardado: () => void;
  onCerrar: () => void;
}

const EditarProducto: React.FC<Props> = ({ producto, onGuardado, onCerrar }) => {
  const handleGuardar = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("nombre", data.nombre);
      formData.append("descripcion", data.descripcion || "");
      formData.append("precio_unitario", data.precio_unitario.toString());
      formData.append("stock", data.stock.toString());
      if (data.imagenArchivo) {
        formData.append("ImagenArchivo", data.imagenArchivo);
      }

      await updateProducto(producto.id, formData);
      alert("✅ Producto actualizado");
      onGuardado();
      onCerrar();
    } catch (err: any) {
      console.error(err);
      alert(`❌ Error al actualizar producto: ${err.message}`);
    }
  };

  return (
    <div style={{
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
      padding: 20
    }}>
      <div style={{
        backgroundColor: '#1a1a1a',
        border: '1px solid #333',
        borderRadius: 12,
        padding: 32,
        width: '100%',
        maxWidth: 600,
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
          paddingBottom: 16,
          borderBottom: '1px solid #333'
        }}>
          <h3 style={{
            color: '#ffffff',
            fontSize: '1.5rem',
            fontWeight: 600,
            margin: 0
          }}>
            Editar Producto
          </h3>
          <button 
            onClick={onCerrar}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#b0b0b0',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: 0,
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4,
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
            ×
          </button>
        </div>

        <ProductoForm
          productoInicial={producto}
          onGuardar={handleGuardar}
          onCerrar={onCerrar}
        />
      </div>
    </div>
  );
};

export default EditarProducto;