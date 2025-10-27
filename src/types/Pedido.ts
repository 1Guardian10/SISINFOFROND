import { DetalleDTO, DetalleCreacionDTO } from "./Detalle";

// DTO que recibimos del backend
export interface PedidoDTO {
  id: string;
  fecha_pedido: string;
  total: number;
  estado?: string;
  id_usuario: string;
  id_metodo_pago: string;
  detalles?: DetalleDTO[];
}

// DTO que enviamos al crear un pedido
export interface CrearPedidoDTO {
  fecha_pedido: string;
  total: number;
  estado?: string;
  id_usuario: string;
  id_metodo_pago: string;
  detalles: DetalleCreacionDTO[];
}
