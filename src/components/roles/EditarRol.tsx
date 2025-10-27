// src/components/roles/EditarRol.tsx
import React, { useEffect, useState } from "react";
import { RolDTO } from "../../types/Rol";
import RolForm from "./RolForm";
import { BASE_URL } from "../../services/api";

interface EditarRolProps {
  id: number;
  onUpdated: () => void; // para refrescar la lista al terminar
}

const EditarRol: React.FC<EditarRolProps> = ({ id, onUpdated }) => {
  const [rol, setRol] = useState<RolDTO | null>(null);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/Rol/${id}`)
      .then((res) => res.json())
      .then((data) => setRol(data))
      .catch(() => setMensaje("❌ Error al cargar el rol"));
  }, [id]);

  const handleSubmit = async (data: RolDTO) => {
    try {
      const res = await fetch(`${BASE_URL}/Rol/Actualizar/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error al actualizar el rol");

      setMensaje("✅ Rol actualizado correctamente");
      onUpdated();
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al actualizar rol");
    }
  };

  if (!rol) return <p>Cargando datos...</p>;

  return (
    <div className="p-4 border rounded">
      <h3 className="font-semibold mb-2">Editar Rol</h3>
      <RolForm
        initialData={rol}
        onSubmit={handleSubmit}
        buttonLabel="Actualizar Rol"
      />
      {mensaje && <p className="mt-2">{mensaje}</p>}
    </div>
  );
};

export default EditarRol;
