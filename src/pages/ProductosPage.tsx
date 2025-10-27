import React from "react";
import ListarProductos from "../components/producto/ListarProductos";

const ProductosPage: React.FC = () => {
  return (
    <div style={{ 
      padding: 0, 
      margin: 0,
      backgroundColor: '#0f0f0f',
      minHeight: '100vh'
    }}>
      <ListarProductos />
    </div>
  );
};

export default ProductosPage;