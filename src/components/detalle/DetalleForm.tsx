import React, { useState, useEffect } from "react";
import { DetalleDTO, DetalleCreacionDTO } from "../../types/Detalle";

interface Props {
  detalle?: DetalleDTO;
  pedidoId: string; // Necesario para crear un detalle
  onGuardar: (detalle: DetalleCreacionDTO) => void;
  onCerrar: () => void;
}

const DetalleForm: React.FC<Props> = ({ detalle, pedidoId, onGuardar, onCerrar }) => {
  const [form, setForm] = useState<DetalleCreacionDTO>({
    pedidoId: pedidoId,
    productoId: "",
    cantidad: 0,
    precio: 0,
  });

  useEffect(() => {
    if (detalle) {
      setForm({
        pedidoId: detalle.pedidoId,
        productoId: detalle.productoId,
        cantidad: detalle.cantidad ?? 0,
        precio: detalle.precio ?? 0,
      });
    }
  }, [detalle]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "cantidad" || name === "precio" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuardar(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Producto ID:</label>
        <input type="text" name="productoId" value={form.productoId} onChange={handleChange} />
      </div>
      <div>
        <label>Cantidad:</label>
        <input type="number" name="cantidad" value={form.cantidad} onChange={handleChange} />
      </div>
      <div>
        <label>Precio:</label>
        <input type="number" name="precio" value={form.precio} onChange={handleChange} />
      </div>
      <button type="submit">Guardar</button>
      <button type="button" onClick={onCerrar}>Cancelar</button>
    </form>
  );
};

export default DetalleForm;
