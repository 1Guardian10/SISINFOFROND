// src/components/producto/ProductoForm.tsx
import React, { useState, ChangeEvent } from "react";

export interface ProductoFormProps {
  onGuardar: (producto: {
    nombre: string;
    descripcion?: string;
    precio_unitario: number;
    stock: number;
    imagenArchivo?: File;
  }) => Promise<void>;
  onCerrar: () => void;
  productoInicial?: {
    nombre: string;
    descripcion?: string;
    precio_unitario: number;
    stock: number;
    imagenArchivo?: File;
  };
}

const ProductoForm: React.FC<ProductoFormProps> = ({
  onGuardar,
  onCerrar,
  productoInicial,
}) => {
  const [form, setForm] = useState({
    nombre: productoInicial?.nombre || "",
    descripcion: productoInicial?.descripcion || "",
    precio_unitario: productoInicial?.precio_unitario || 0,
    stock: productoInicial?.stock || 0,
    imagenArchivo: productoInicial?.imagenArchivo || undefined,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm((prev) => ({ ...prev, imagenArchivo: e.target.files![0] }));
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onGuardar(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
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
            value={form.nombre}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#2a2a2a',
              border: '1px solid #444',
              borderRadius: 6,
              color: '#ffffff',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'border-color 0.2s ease'
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
            Precio Unitario *
          </label>
          <input
            type="number"
            name="precio_unitario"
            value={form.precio_unitario}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#2a2a2a',
              border: '1px solid #444',
              borderRadius: 6,
              color: '#ffffff',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'border-color 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
            onBlur={(e) => e.target.style.borderColor = '#444'}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{
            display: 'block',
            color: '#ffffff',
            fontSize: '0.95rem',
            fontWeight: 500,
            marginBottom: 8
          }}>
            Stock *
          </label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            required
            min="0"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#2a2a2a',
              border: '1px solid #444',
              borderRadius: 6,
              color: '#ffffff',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'border-color 0.2s ease'
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
            Imagen
          </label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#2a2a2a',
              border: '1px solid #444',
              borderRadius: 6,
              color: '#b0b0b0',
              fontSize: '0.9rem',
              outline: 'none',
              transition: 'border-color 0.2s ease'
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
          Descripción
        </label>
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          rows={3}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#2a2a2a',
            border: '1px solid #444',
            borderRadius: 6,
            color: '#ffffff',
            fontSize: '0.95rem',
            outline: 'none',
            resize: 'vertical',
            transition: 'border-color 0.2s ease',
            fontFamily: 'inherit'
          }}
          onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
          onBlur={(e) => e.target.style.borderColor = '#444'}
        />
      </div>

      {preview && (
        <div>
          <label style={{
            display: 'block',
            color: '#ffffff',
            fontSize: '0.95rem',
            fontWeight: 500,
            marginBottom: 8
          }}>
            Vista Previa
          </label>
          <img 
            src={preview} 
            alt="Preview" 
            style={{ 
              width: 100, 
              height: 100, 
              objectFit: 'cover',
              borderRadius: 6,
              border: '1px solid #444'
            }} 
          />
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 8 }}>
        <button 
          type="button" 
          onClick={onCerrar}
          style={{
            padding: '12px 24px',
            backgroundColor: 'transparent',
            color: '#b0b0b0',
            border: '1px solid #444',
            borderRadius: 6,
            fontSize: '0.95rem',
            fontWeight: 500,
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
        <button 
          type="submit"
          style={{
            padding: '12px 24px',
            backgroundColor: '#4CAF50',
            color: '#ffffff',
            border: 'none',
            borderRadius: 6,
            fontSize: '0.95rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#45a049';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#4CAF50';
          }}
        >
          Guardar Producto
        </button>
      </div>
    </form>
  );
};

export default ProductoForm;