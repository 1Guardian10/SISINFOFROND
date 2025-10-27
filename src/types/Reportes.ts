export interface VentasPeriodoDTO {
  Periodo: string;
  TotalCantidad: number;
  TotalMonto: number;
}

export interface ProductoVendidoDTO {
  id: string;
  nombre: string;
  CantidadVendida: number;
  MontoVenta: number;
}

export interface ClienteVentasDTO {
  id: string;
  nombre: string;
  TotalCompras: number;
  TotalCantidad: number;
  PedidosCount: number;
}

export interface PedidoCanceladoDTO {
  id: string;
  fecha_pedido: string;
  total: number;
  estado: string;
}
