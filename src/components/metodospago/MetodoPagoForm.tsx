import React, { useState } from "react";
import { MetodoPagoDTO } from "../../types/MetodoPago";

interface MetodoPagoFormProps {
  initialData?: MetodoPagoDTO;
  onSubmit: (metodo: MetodoPagoDTO) => void;
  buttonLabel?: string;
}

const MetodoPagoForm: React.FC<MetodoPagoFormProps> = ({
  initialData = { id: "", nombre: "" },
  onSubmit,
  buttonLabel = "Guardar",
}) => {
  const [metodo, setMetodo] = useState<MetodoPagoDTO>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMetodo({ ...metodo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(metodo);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg shadow-md mb-4">
      <label className="block mb-2">
        Nombre del Método:
        <input
          type="text"
          name="nombre"
          value={metodo.nombre || ""}
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

export default MetodoPagoForm;
