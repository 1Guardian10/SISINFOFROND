// src/types/Usuario.ts

export interface ListarUsuarioDTO {
  id: string;
  nombre?: string;
  apellido_paterno?: string;
  apellido_materno?: string;
  correo?: string;
  telefono?: number;
  fecha_registro?: string;
  estado?: string;
  id_rol?: string;
}

// Tipo para crear un usuario
export interface UsuarioDTO {
  nombre: string;
  apellido_paterno: string;
  apellido_materno?: string;
  correo: string;
  telefono?: number;
  password: string;
  id_rol: string;
  fecha_registro?: string; // opcional
}
export interface LoginDTO {
  correo: string;
  password: string;
}

export interface RegisterDTO {
  nombre: string;
  apellido_paterno: string;
  apellido_materno?: string;
  correo: string;
  telefono?: string;
  password: string;
  confirmPassword: string;
}