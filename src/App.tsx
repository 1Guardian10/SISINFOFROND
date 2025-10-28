// App.tsx (corregido)
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/context/AuthContext";
import Dashboard from "./pages/Dashboard";
import UsuariosPage from "./pages/UsuariosPage";
import ProductosPage from "./pages/ProductosPage";
import PedidosPage from "./pages/PedidosPage";
import RolesPage from "./pages/RolesPage";
import DetallesPage from "./pages/DetallesPage";
import CategoriasPage from "./pages/CategoriasPage";
import MetodosPagoPage from "./pages/MetodosPagoPage";
import ReportesPage from "./pages/ReportesPage";
import Navbar from "./components/Navbar";
import Auth from "./components/Auth";
import Productos from "./pages/ProductosUser";

// Componente para proteger rutas por rol
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, userRole } = useAuth();
  
  console.log('🛡️ ProtectedRoute - user:', user, 'userRole:', userRole, 'requiredRole:', requiredRole);
  
  if (!user) {
    console.log('🚫 No user, redirecting to auth');
    return <Navigate to="/auth" replace />;
  }

  // Convertir a minúsculas para comparación consistente
  const normalizedUserRole = userRole?.toLowerCase();
  const normalizedRequiredRole = requiredRole?.toLowerCase();

  if (requiredRole && normalizedUserRole !== normalizedRequiredRole) {
    console.log('🚫 Role mismatch, redirecting to productos');
    return <Navigate to="/productos" replace />;
  }

  console.log('✅ Access granted');
  return <>{children}</>;
};

// Enlaces base para el navbar
const adminLinks = [
  { name: "Dashboard", path: "/" },
  { name: "Usuarios", path: "/usuarios" },
  { name: "productos", path: "/productos" },
  { name: "Pedidos", path: "/pedidos" },
  { name: "Reportes", path: "/reportes" },
  { name: "ProductosPage", path: "/ListaProductos" },
];

const userLinks = [
  { name: "ProductosPage", path: "/ListaProductos" },
];

const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoading, userRole } = useAuth();

  console.log('🔄 AppContent - user:', user, 'userRole:', userRole, 'isLoading:', isLoading, 'location:', location.pathname);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  // Determinar qué enlaces mostrar según el rol
  const getNavLinks = () => {
    console.log('📋 getNavLinks - userRole:', userRole);
    
    // Usar comparación en minúsculas para consistencia
    if (userRole?.toLowerCase() === 'administrador') {
      console.log('👨‍💼 Mostrando enlaces de administrador');
      return adminLinks;
    }
    console.log('👤 Mostrando enlaces de usuario normal');
    return userLinks;
  };

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    console.log('⏳ Mostrando loading...');
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0f0f0f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontFamily: 'Segoe UI, system-ui, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#00BCD4',
            marginBottom: '20px'
          }}>
            CARGANDO...
          </div>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid #333',
            borderTop: '3px solid #00BCD4',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Si no hay usuario, mostrar la pantalla de autenticación
  if (!user) {
    console.log('🚫 No user, showing Auth component');
    return <Auth />;
  }

  console.log('✅ User authenticated, showing main app');
  console.log('🎯 User role:', userRole);

  // Usuario autenticado, mostrar la aplicación normal
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar 
        links={getNavLinks()} 
        currentPage={location.pathname} 
        onNavigate={handleNavigate} 
        userRole={userRole}
      />
      <main style={{ 
        minHeight: 'calc(100vh - 70px)',
        backgroundColor: '#0f0f0f'
      }}>
        <Routes>
          {/* Rutas para admin */}
          <Route path="/" element={
            <ProtectedRoute requiredRole="administrador">
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/usuarios" element={
            <ProtectedRoute requiredRole="administrador">
              <UsuariosPage />
            </ProtectedRoute>
          } />
          <Route path="/pedidos" element={
            <ProtectedRoute requiredRole="administrador">
              <PedidosPage />
            </ProtectedRoute>
          } />
          <Route path="/roles" element={
            <ProtectedRoute requiredRole="administrador">
              <RolesPage />
            </ProtectedRoute>
          } />
          <Route path="/detalles" element={
            <ProtectedRoute requiredRole="administrador">
              <DetallesPage />
            </ProtectedRoute>
          } />
          <Route path="/categorias" element={
            <ProtectedRoute requiredRole="administrador">
              <CategoriasPage />
            </ProtectedRoute>
          } />
          <Route path="/metodosPago" element={
            <ProtectedRoute requiredRole="administrador">
              <MetodosPagoPage />
            </ProtectedRoute>
          } />
          <Route path="/reportes" element={
            <ProtectedRoute requiredRole="administrador">
              <ReportesPage />
            </ProtectedRoute>
          } />
          <Route path="/productos" element={
            <ProtectedRoute requiredRole="administrador">
              <ProductosPage />
            </ProtectedRoute>
          } />

          {/* Ruta de productos accesible para todos */}
          <Route path="ListaProductos" element={<Productos />} />

          {/* Redirección por defecto según rol */}
          <Route path="*" element={
            userRole?.toLowerCase() === 'administrador' ? 
            <Navigate to="/" replace /> : 
            <Navigate to="/ListaProductos" replace />
          } />
        </Routes>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;