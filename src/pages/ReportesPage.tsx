import React, { useState } from "react";
import VentasPorPeriodo from "../components/reportes/VentasPorPeriodo";
import ProductosMasVendidos from "../components/reportes/ProductosMasVendidos";
import VentasPorCliente from "../components/reportes/VentasPorCliente";
import PedidosCancelados from "../components/reportes/PedidosCancelados";

const ReportesPage: React.FC = () => {
  const [tab, setTab] = useState<"periodo" | "productos" | "clientes" | "cancelados">("periodo");

  const tabs = [
    { id: "periodo", label: "Ventas por Periodo", icon: "📅" },
    { id: "productos", label: "Productos Más Vendidos", icon: "📦" },
    { id: "clientes", label: "Ventas por Cliente", icon: "👥" },
    { id: "cancelados", label: "Pedidos Cancelados", icon: "❌" }
  ] as const;

  return (
    <div style={{ 
      padding: '40px 20px', 
      backgroundColor: '#0f0f0f', 
      minHeight: '100vh',
      fontFamily: 'Segoe UI, system-ui, sans-serif'
    }}>
      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto'
      }}>
        <header style={{ 
          textAlign: 'center', 
          marginBottom: 40 
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 300, 
            color: '#ffffff',
            marginBottom: 10,
            letterSpacing: '-0.5px'
          }}>
            Reportes y Analytics
          </h1>
          <p style={{ 
            color: '#b0b0b0', 
            fontSize: '1.1rem',
            maxWidth: 600,
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Análisis detallado y métricas del rendimiento del sistema
          </p>
        </header>

        <div style={{
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: 12,
          padding: 24,
          marginBottom: 24,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          <h2 style={{
            color: '#ffffff',
            fontSize: '1.5rem',
            fontWeight: 600,
            margin: '0 0 20px 0'
          }}>
            Panel de Reportes
          </h2>
          
          <div style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap'
          }}>
            {tabs.map((tabItem) => (
              <button
                key={tabItem.id}
                onClick={() => setTab(tabItem.id)}
                style={{
                  padding: "12px 20px",
                  backgroundColor: tab === tabItem.id ? '#4CAF50' : '#2a2a2a',
                  color: '#ffffff',
                  border: '1px solid #444',
                  borderRadius: 8,
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
                onMouseEnter={(e) => {
                  if (tab !== tabItem.id) {
                    e.currentTarget.style.backgroundColor = '#333';
                    e.currentTarget.style.borderColor = '#4CAF50';
                  }
                }}
                onMouseLeave={(e) => {
                  if (tab !== tabItem.id) {
                    e.currentTarget.style.backgroundColor = '#2a2a2a';
                    e.currentTarget.style.borderColor = '#444';
                  }
                }}
              >
                <span style={{ fontSize: '1.1rem' }}>{tabItem.icon}</span>
                {tabItem.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: 12,
          padding: 32,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          minHeight: 400
        }}>
          {tab === "periodo" && <VentasPorPeriodo />}
          {tab === "productos" && <ProductosMasVendidos />}
          {tab === "clientes" && <VentasPorCliente />}
          {tab === "cancelados" && <PedidosCancelados />}
        </div>
      </div>
    </div>
  );
};

export default ReportesPage;