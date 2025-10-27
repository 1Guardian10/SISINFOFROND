import { ListarUsuarioDTO, UsuarioDTO } from "../types/Usuario";
import { RolDTO } from "../types/Rol";
import { ProductoDTO, ProductoCreacionDTO } from "../types/Producto";
import { PedidoDTO, CrearPedidoDTO } from "../types/Pedido";
import { MetodoPagoDTO } from "../types/MetodoPago";
import { DetalleDTO, DetalleCreacionDTO } from "../types/Detalle";
import { CategoriaDTO } from "../types/Categoria";

export const BASE_URL = "https://localhost:7112/api";

/* ----------------------------- USUARIOS ----------------------------- */
export async function getUsuarios(): Promise<ListarUsuarioDTO[]> {
  const res = await fetch(`${BASE_URL}/Usuario/Listar`);
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return res.json();
}

export async function getUsuarioById(id: string): Promise<UsuarioDTO> {
  const res = await fetch(`${BASE_URL}/Usuario/Listar/${id}`);
  if (!res.ok) throw new Error("Error al obtener usuario por ID");
  return res.json();
}

export async function createUsuario(usuario: UsuarioDTO): Promise<ListarUsuarioDTO> {
  const res = await fetch(`${BASE_URL}/Usuario/Crear`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Error al crear usuario");
  return data;
}

/* ----------------------------- ROLES ----------------------------- */
export async function getRoles(): Promise<RolDTO[]> {
  const res = await fetch(`${BASE_URL}/Rol/Listar`);
  if (!res.ok) throw new Error("Error al obtener roles");
  return res.json();
}

export async function getRolById(id: string): Promise<RolDTO> {
  const res = await fetch(`${BASE_URL}/Rol/Listar/${id}`);
  if (!res.ok) throw new Error("Error al obtener rol por ID");
  return res.json();
}

export async function createRol(rol: RolDTO): Promise<RolDTO> {
  const res = await fetch(`${BASE_URL}/Rol/Crear`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rol),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Error al crear rol");
  return data;
}

export async function updateRol(id: string, rol: RolDTO): Promise<RolDTO> {
  const res = await fetch(`${BASE_URL}/Rol/Actualizar/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rol),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Error al actualizar rol");
  return data;
}

export async function deleteRol(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/Rol/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar rol");
}

/* ----------------------------- PRODUCTOS ----------------------------- */

/**
 * Obtener todos los productos
 */
export async function getProductos(): Promise<ProductoDTO[]> {
  const res = await fetch(`${BASE_URL}/Producto/Listar`);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
}

/**
 * Obtener un producto por ID
 */
export async function getProductoById(id: string): Promise<ProductoDTO> {
  const res = await fetch(`${BASE_URL}/Producto/Listar/${id}`);
  if (!res.ok) throw new Error("Error al obtener producto por ID");
  return res.json();
}

/**
 * Crear un producto con FormData (para enviar imagen)
 */
export async function createProducto(formData: FormData): Promise<ProductoDTO> {
  const res = await fetch(`${BASE_URL}/Producto/Crear`, {
    method: "POST",
    body: formData, // FormData maneja automáticamente multipart/form-data
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Error al crear producto");
  return data;
}

/**
 * Actualizar un producto con FormData (para enviar imagen)
 */
export async function updateProducto(id: string, formData: FormData): Promise<ProductoDTO> {
  const res = await fetch(`${BASE_URL}/Producto/Actualizar/${id}`, {
    method: "PUT",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Error al actualizar producto");
  return data;
}

/**
 * Eliminar un producto por ID
 */
export async function deleteProducto(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/Producto/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar producto");
}

/* ----------------------------- PEDIDOS ----------------------------- */
export async function getPedidos(): Promise<PedidoDTO[]> {
  const res = await fetch(`${BASE_URL}/Pedido/Listar`);
  if (!res.ok) throw new Error("Error al obtener pedidos");
  return res.json();
}

export async function getPedidoById(id: string): Promise<PedidoDTO> {
  const res = await fetch(`${BASE_URL}/Pedido/Listar/${id}`);
  if (!res.ok) throw new Error("Error al obtener pedido por ID");
  return res.json();
}

export async function createPedido(pedido: CrearPedidoDTO): Promise<PedidoDTO> {
  const res = await fetch(`${BASE_URL}/Pedido/Crear`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pedido),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Error al crear pedido");
  return data;
}

export async function updatePedido(id: string, pedido: CrearPedidoDTO): Promise<PedidoDTO> {
  const res = await fetch(`${BASE_URL}/Pedido/Actualizar/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pedido),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Error al actualizar pedido");
  return data;
}

/* ----------------------------- MÉTODOS DE PAGO ----------------------------- */
export async function getMetodosPago(): Promise<MetodoPagoDTO[]> {
  const res = await fetch(`${BASE_URL}/MetodoPago/Listar`);
  if (!res.ok) throw new Error("Error al obtener métodos de pago");
  return res.json();
}

export async function getMetodoPagoById(id: string): Promise<MetodoPagoDTO> {
  const res = await fetch(`${BASE_URL}/MetodoPago/Listar/${id}`);
  if (!res.ok) throw new Error("Error al obtener método de pago por ID");
  return res.json();
}

export async function createMetodoPago(metodo: MetodoPagoDTO): Promise<MetodoPagoDTO> {
  const res = await fetch(`${BASE_URL}/MetodoPago/Crear`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(metodo),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.messaje || "Error al crear método de pago");
  return data;
}

export async function updateMetodoPago(id: string, metodo: MetodoPagoDTO): Promise<MetodoPagoDTO> {
  const res = await fetch(`${BASE_URL}/MetodoPago/Actualizar/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(metodo),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.messaje || "Error al actualizar método de pago");
  return data;
}

export async function deleteMetodoPago(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/MetodoPago/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar método de pago");
}



/* ----------------------------- DETALLES ----------------------------- */
export async function getDetalles(): Promise<DetalleDTO[]> {
  const res = await fetch(`${BASE_URL}/Detalle/Listar`);
  if (!res.ok) throw new Error("Error al obtener detalles");
  return res.json();
}

export async function getDetalleById(id: string): Promise<DetalleDTO> {
  const res = await fetch(`${BASE_URL}/Detalle/Listar/${id}`);
  if (!res.ok) throw new Error("Error al obtener detalle por ID");
  return res.json();
}

export async function createDetalle(detalle: DetalleCreacionDTO): Promise<DetalleDTO> {
  const res = await fetch(`${BASE_URL}/Detalle/Crear`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(detalle),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Error al crear detalle");
  return data;
}

export async function updateDetalle(id: string, detalle: DetalleCreacionDTO): Promise<DetalleDTO> {
  const res = await fetch(`${BASE_URL}/Detalle/Actualizar/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(detalle),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Error al actualizar detalle");
  return data;
}

export async function deleteDetalle(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/Detalle/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar detalle");
}
/* ----------------------------- CATEGORÍAS ----------------------------- */


export async function getCategorias(): Promise<CategoriaDTO[]> {
  const res = await fetch(`${BASE_URL}/Categoria/Listar`);
  if (!res.ok) throw new Error("Error al obtener categorías");
  return res.json();
}

export async function getCategoriaById(id: string): Promise<CategoriaDTO> {
  const res = await fetch(`${BASE_URL}/Categoria/Listar/${id}`);
  if (!res.ok) throw new Error("Error al obtener categoría por ID");
  return res.json();
}

export async function createCategoria(categoria: CategoriaDTO): Promise<CategoriaDTO> {
  const res = await fetch(`${BASE_URL}/Categoria/Crear`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoria),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.messaje || "Error al crear categoría");
  return data;
}

export async function updateCategoria(id: string, categoria: CategoriaDTO): Promise<CategoriaDTO> {
  const res = await fetch(`${BASE_URL}/Categoria/Actualizar/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoria),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.messaje || "Error al actualizar categoría");
  return data;
}

export async function deleteCategoria(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/Categoria/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar categoría");
}

/* ----------------------------- REPORTES DE VENTAS ----------------------------- */
export interface VentasPeriodoDTO {
  periodo: string;
  totalCantidad: number;
  totalMonto: number;
}

export interface ProductoVendidoDTO {
  id: string;
  nombre: string;
  cantidadVendida: number;
  montoVenta: number;
}

export interface ClienteVentasDTO {
  id: string;
  nombre: string;
  totalCompras: number;
  totalCantidad: number;
  pedidosCount: number;
}

export interface PedidoCanceladoDTO {
  id: string;
  fecha_pedido: string;
  total: number;
  estado: string;
}

export async function getVentasPorPeriodo(start?: string, end?: string, period: string = "mensual"): Promise<VentasPeriodoDTO[]> {
  const params = new URLSearchParams();
  if (start) params.append("start", start);
  if (end) params.append("end", end);
  params.append("period", period);

  const res = await fetch(`${BASE_URL}/ReportesVentas/PorPeriodo?${params.toString()}`);
  if (!res.ok) throw new Error("Error al obtener ventas por periodo");
  return res.json();
}

export async function getProductosMasVendidos(top: number = 10, start?: string, end?: string): Promise<ProductoVendidoDTO[]> {
  const params = new URLSearchParams();
  params.append("top", top.toString());
  if (start) params.append("start", start);
  if (end) params.append("end", end);

  const res = await fetch(`${BASE_URL}/ReportesVentas/ProductosMasVendidos?${params.toString()}`);
  if (!res.ok) throw new Error("Error al obtener productos más vendidos");
  return res.json();
}

export async function getVentasPorCliente(top: number = 10, start?: string, end?: string): Promise<ClienteVentasDTO[]> {
  const params = new URLSearchParams();
  params.append("top", top.toString());
  if (start) params.append("start", start);
  if (end) params.append("end", end);

  const res = await fetch(`${BASE_URL}/ReportesVentas/PorCliente?${params.toString()}`);
  if (!res.ok) throw new Error("Error al obtener ventas por cliente");
  return res.json();
}

export async function getPedidosCancelados(start?: string, end?: string): Promise<PedidoCanceladoDTO[]> {
  const params = new URLSearchParams();
  if (start) params.append("start", start);
  if (end) params.append("end", end);

  const res = await fetch(`${BASE_URL}/ReportesVentas/Cancelados?${params.toString()}`);
  if (!res.ok) throw new Error("Error al obtener pedidos cancelados");
  return res.json();
}
