// Representa un detalle que viene del backend
export interface DetalleDTO {
  id: string;
  pedidoId: string;
  productoId: string;
  productoNombre: string; // nombre del producto (para mostrar en la tabla)
  cantidad: number;
  precio: number;
}

// Representa los datos que se envían para crear o actualizar un detalle
export interface DetalleCreacionDTO {
  pedidoId: string;
  productoId: string;
  cantidad: number;
  precio: number;
}
