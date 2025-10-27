// src/components/categorias/CrearCategoria.tsx
import React, { useState } from "react";
import { CategoriaDTO } from "../../types/Categoria";
import { createCategoria } from "../../services/api";
import CategoriaForm from "./CategoriaForm";

interface CrearCategoriaProps {
  onCategoriaCreada?: () => void;
}

const CrearCategoria: React.FC<CrearCategoriaProps> = ({ onCategoriaCreada }) => {
  const [mensaje, setMensaje] = useState("");

  const handleCreate = async (categoria: CategoriaDTO) => {
    try {
      await createCategoria(categoria);
      setMensaje("✅ Categoría creada correctamente");
      if (onCategoriaCreada) onCategoriaCreada();
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al crear la categoría");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Crear Nueva Categoría</h2>
      <CategoriaForm onSubmit={handleCreate} buttonLabel="Crear Categoría" />
      {mensaje && <p className="mt-2">{mensaje}</p>}
    </div>
  );
};

export default CrearCategoria;
