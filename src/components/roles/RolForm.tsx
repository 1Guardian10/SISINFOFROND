import React, { useState } from "react";
import { RolDTO } from "../../types/Rol";

interface RolFormProps {
  initialData?: RolDTO;
  onSubmit: (rol: RolDTO) => void;
  buttonLabel?: string;
}

const RolForm: React.FC<RolFormProps> = ({
  initialData = { id: "", nombre: "" },
  onSubmit,
  buttonLabel = "Guardar Rol",
}) => {
  const [rol, setRol] = useState<RolDTO>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRol({ ...rol, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(rol);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg shadow-md">
      <label className="block mb-2">
        Nombre del Rol:
        <input
          type="text"
          name="nombre"
          value={rol.nombre || ""}
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

export default RolForm;
