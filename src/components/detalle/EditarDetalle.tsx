import React, { useState } from "react";
import DetalleForm from "./DetalleForm";
import { updateDetalle } from "../../services/api";
import { DetalleDTO, DetalleCreacionDTO } from "../../types/Detalle";

interface Props {
  detalle: DetalleDTO;
  onDetalleActualizado: () => void;
  onCerrar: () => void;
}

const EditarDetalle: React.FC<Props> = ({ detalle, onDetalleActualizado, onCerrar }) => {
  const [mensaje, setMensaje] = useState("");

  const handleGuardar = async (detalleActualizado: DetalleCreacionDTO) => {
    try {
      await updateDetalle(detalle.id, detalleActualizado);
      onDetalleActualizado();
    } catch (error: any) {
      setMensaje(error.message);
    }
  };

  return (
    <div>
      <h3>Editar Detalle</h3>
      {mensaje && <p>{mensaje}</p>}
      <DetalleForm pedidoId={detalle.pedidoId} detalle={detalle} onGuardar={handleGuardar} onCerrar={onCerrar} />
    </div>
  );
};

export default EditarDetalle;
