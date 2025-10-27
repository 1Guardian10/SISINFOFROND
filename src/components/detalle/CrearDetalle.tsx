import React, { useState } from "react";
import DetalleForm from "./DetalleForm";
import { createDetalle } from "../../services/api";
import { DetalleCreacionDTO } from "../../types/Detalle";

interface Props {
  pedidoId: string; // obligatorio
  onDetalleCreado: () => void;
  onCerrar: () => void;
}

const CrearDetalle: React.FC<Props> = ({ pedidoId, onDetalleCreado, onCerrar }) => {
  const [mensaje, setMensaje] = useState("");

  const handleGuardar = async (detalle: DetalleCreacionDTO) => {
    try {
      await createDetalle({ ...detalle, pedidoId }); // importante: agregamos pedidoId
      onDetalleCreado();
    } catch (error: any) {
      setMensaje(error.message);
    }
  };

  return (
    <div>
      <h3>Crear Detalle</h3>
      {mensaje && <p>{mensaje}</p>}
      <DetalleForm pedidoId={pedidoId} onGuardar={handleGuardar} onCerrar={onCerrar} />
    </div>
  );
};

export default CrearDetalle;
