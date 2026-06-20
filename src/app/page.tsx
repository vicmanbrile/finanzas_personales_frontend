"use client";
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ResumenStats } from "@/components/dashboard/ResumenStats";
import { ListaTarjetas } from "@/components/tarjetas/ListaTarjetas";
import { TarjetaModal } from "@/components/tarjetas/TarjetaModal";
import { Tarjeta } from "@/types";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tarjetaActual, setTarjetaActual] = useState<Tarjeta | null>(null);

  const handleAbrirModal = (tarjeta?: Tarjeta) => {
    setTarjetaActual(tarjeta || null);
    setIsModalOpen(true);
  };

  return (
    <div className="app-wrapper">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <main className="main-content">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="dashboard-layout">
          <ResumenStats />

          <section className="cards-column">
            <h3>Mis Tarjetas</h3>
            <ListaTarjetas onEdit={handleAbrirModal} />
            
            <button className="tarjeta-agregar-estatica" onClick={() => handleAbrirModal()}>
              <span className="icono-plus">+</span> Agregar Tarjeta
            </button>
          </section>
        </div>
      </main>
      
      <TarjetaModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        tarjetaActual={tarjetaActual} 
      />
    </div>
  );
}