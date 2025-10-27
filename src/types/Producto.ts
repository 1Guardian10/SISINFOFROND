export interface ProductoDTO {
  id: string;
  nombre?: string;
  descripcion?: string;
  precio_unitario?: number;
  stock?: number;
  estado?: string;
  imagen_url?: string; // ← nueva propiedad
}

export interface ProductoCreacionDTO {
  nombre?: string;
  descripcion?: string;
  precio_unitario?: number;
  stock?: number;
  imagenArchivo?: File; // ← para subir imagen
}
