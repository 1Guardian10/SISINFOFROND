import React, { useState } from "react";
import { RolDTO } from "../../types/Rol";
import { createRol } from "../../services/api";
import RolForm from "./RolForm";

interface CrearRolProps {
  onRolCreado?: () => void; // ✅ Prop opcional
}

const CrearRol: React.FC<CrearRolProps> = ({ onRolCreado }) => {
  const [mensaje, setMensaje] = useState<string>("");

  const handleCreate = async (nuevoRol: RolDTO) => {
    try {
      await createRol(nuevoRol);
      setMensaje("✅ Rol creado exitosamente");
      
      // Notificar al padre
      if (onRolCreado) onRolCreado();
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al crear el rol");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Crear Nuevo Rol</h2>
      <RolForm onSubmit={handleCreate} buttonLabel="Crear Rol" />
      {mensaje && <p className="mt-3 text-sm">{mensaje}</p>}
    </div>
  );
};

export default CrearRol;
