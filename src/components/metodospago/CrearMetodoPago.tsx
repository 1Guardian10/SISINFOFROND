import React, { useState } from "react";
import { MetodoPagoDTO } from "../../types/MetodoPago";
import { createMetodoPago } from "../../services/api";

const CrearMetodoPago: React.FC<{ onMetodoCreado?: () => void }> = ({ onMetodoCreado }) => {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMetodoPago({ id: "", nombre });
      setMensaje("✅ Método de pago creado correctamente");
      setNombre("");
      onMetodoCreado?.(); // refresca lista
    } catch (err: any) {
      setMensaje("❌ Error al crear método de pago");
      console.error(err);
    }
  };

  return (
    <div className="p-4 border rounded mb-4">
      <h3 className="font-semibold mb-2">Crear Método de Pago</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del método"
          className="border p-2 rounded w-full mb-2"
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Crear
        </button>
      </form>
      {mensaje && <p className="mt-2">{mensaje}</p>}
    </div>
  );
};

export default CrearMetodoPago;
