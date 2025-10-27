// src/context/AuthContext.tsx (actualizado)
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Rol {
  nombre: string;
}

interface User {
  id: string;
  nombre: string;
  correo?: string;
  rol: Rol;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  userRole: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Verificar si hay usuario en localStorage al cargar
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      // Extraer el rol de la estructura de la API
      setUserRole(userData.rol?.nombre?.toLowerCase() || null);
    }
    setIsLoading(false);
  }, []);
// En tu AuthContext, en la función login:
const login = async (email: string, password: string): Promise<boolean> => {
  setIsLoading(true);
  try {
    const response = await fetch('https://localhost:7112/api/Usuario/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        correo: email,
        password: password
      }),
    });

    if (response.ok) {
      const userData = await response.json();
      console.log('✅ Datos recibidos de API:', userData);
      
      // Mapear la respuesta de la API
      const mappedUser: User = {
        id: userData.id,
        nombre: userData.nombre,
        correo: email,
        rol: userData.rol
      };
      
      console.log('👤 Usuario mapeado:', mappedUser);
      
      setUser(mappedUser);
      // Guardar el rol exacto como viene de la API
      setUserRole(mappedUser.rol.nombre); // "Administrador" tal cual viene
      localStorage.setItem('user', JSON.stringify(mappedUser));
      
      console.log('🎉 Estado actualizado, userRole:', mappedUser.rol.nombre);
      
      setIsLoading(false);
      return true;
    } else {
      const errorData = await response.json();
      console.error('❌ Error de login:', errorData);
      setIsLoading(false);
      return false;
    }
  } catch (error) {
    console.error('💥 Error en login:', error);
    setIsLoading(false);
    return false;
  }
};

  const register = async (userData: any): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Llamada real a tu API para registro
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: userData.nombre,
          apellido_paterno: userData.apellido_paterno,
          apellido_materno: userData.apellido_materno,
          correo: userData.correo,
          telefono: userData.telefono,
          password: userData.password
        }),
      });

      if (response.ok) {
        const newUserData = await response.json();
        
        const mappedUser: User = {
          id: newUserData.id,
          nombre: newUserData.nombre,
          correo: userData.correo,
          rol: newUserData.rol || { nombre: 'Cliente' } // Valor por defecto
        };
        
        setUser(mappedUser);
        setUserRole(mappedUser.rol.nombre.toLowerCase());
        localStorage.setItem('user', JSON.stringify(mappedUser));
        setIsLoading(false);
        return true;
      } else {
        const errorData = await response.json();
        console.error('Error de registro:', errorData);
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Error en registro:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setUserRole(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};