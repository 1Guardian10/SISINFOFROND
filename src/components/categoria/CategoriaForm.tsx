// src/components/categorias/CategoriaForm.tsx
import React, { useState } from "react";
import { CategoriaDTO } from "../../types/Categoria";

interface CategoriaFormProps {
  initialData?: CategoriaDTO;
  onSubmit: (categoria: CategoriaDTO) => void;
  buttonLabel?: string;
}

const CategoriaForm: React.FC<CategoriaFormProps> = ({
  initialData = { id: "", nombre: "" },
  onSubmit,
  buttonLabel = "Guardar Categoría",
}) => {
  const [categoria, setCategoria] = useState<CategoriaDTO>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoria({ ...categoria, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(categoria);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded shadow-md">
      <label className="block mb-2">
        Nombre de la Categoría:
        <input
          type="text"
          name="nombre"
          value={categoria.nombre || ""}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
      </label>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {buttonLabel}
      </button>
    </form>
  );
};

export default CategoriaForm;
