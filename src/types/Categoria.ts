// src/types/Categoria.ts

export interface CategoriaDTO {
  id: string;
  nombre: string;
  descripcion?: string; // opcional, si tu API tiene descripción
  fecha_registro?: string; // opcional
}
