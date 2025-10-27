import React, { useEffect, useState } from "react";
import { MetodoPagoDTO } from "../../types/MetodoPago";
import { getMetodosPago } from "../../services/api";

interface ListarMetodosPagoProps {
  onSelect?: (metodo: MetodoPagoDTO) => void; // opcional si quieres seleccionar un método
}

const ListarMetodosPago: React.FC<ListarMetodosPagoProps> = ({ onSelect }) => {
  const [metodos, setMetodos] = useState<MetodoPagoDTO[]>([]);

  const cargarMetodos = async () => {
    try {
      const data = await getMetodosPago();
      setMetodos(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    cargarMetodos();
  }, []);

  return (
    <div className="p-4 border rounded">
      <h3 className="font-semibold mb-2">Métodos de Pago Registrados</h3>
      <ul>
        {metodos.map((m) => (
          <li
            key={m.id}
            className="p-2 border-b cursor-pointer hover:bg-gray-100"
            onClick={() => onSelect?.(m)}
          >
            {m.nombre} {m.estado && `(${m.estado})`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListarMetodosPago;
