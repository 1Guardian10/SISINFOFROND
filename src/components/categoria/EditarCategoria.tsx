// src/components/categorias/EditarCategoria.tsx
import React, { useEffect, useState } from "react";
import { CategoriaDTO } from "../../types/Categoria";
import { updateCategoria, getCategoriaById } from "../../services/api";

interface EditarCategoriaProps {
  id: string;
  onUpdated?: () => void; // callback para refrescar lista
}

const EditarCategoria: React.FC<EditarCategoriaProps> = ({ id, onUpdated }) => {
  const [categoria, setCategoria] = useState<CategoriaDTO | null>(null);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const data = await getCategoriaById(id);
        setCategoria(data);
      } catch (err: any) {
        setMensaje("❌ Error al cargar la categoría");
      }
    };
    fetchCategoria();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!categoria) return;
    setCategoria({ ...categoria, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoria) return;

    try {
      await updateCategoria(id, categoria);
      setMensaje("✅ Categoría actualizada correctamente");
      onUpdated?.();
    } catch (err: any) {
      setMensaje(`❌ Error al actualizar: ${err.message}`);
    }
  };

  if (!categoria) return <p>Cargando categoría...</p>;

  return (
    <div className="p-4 border rounded mb-4">
      <h2 className="font-bold mb-2">Editar Categoría</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          name="nombre"
          value={categoria.nombre}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Actualizar
        </button>
      </form>
      {mensaje && <p className="mt-2">{mensaje}</p>}
    </div>
  );
};

export default EditarCategoria;
