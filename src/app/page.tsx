"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ResumenStats } from "@/components/dashboard/ResumenStats";
import { TarjetaCard } from "@/components/tarjetas/TarjetaCard";
import { TarjetaModal } from "@/components/tarjetas/TarjetaModal";
import { Totals, Tarjeta } from "@/types";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totals, setTotals] = useState<Totals | null>(null);
  const [tarjetas, setTarjetas] = useState<Tarjeta[]>([]);
  const [tarjetaActual, setTarjetaActual] = useState<Tarjeta | null>(null);

  useEffect(() => {
    if (window.innerWidth < 1024) setSidebarOpen(false);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resTotals, resTarjetas] = await Promise.all([
        fetch(`/api/dashboard/totals`),
        fetch(`/api/tarjetas`)
      ]);

      if (resTotals.ok) setTotals(await resTotals.json());
      if (resTarjetas.ok) setTarjetas(await resTarjetas.json());
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  };

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
          <ResumenStats totals={totals} />

          <section className="cards-column">
            <h3>Mis Tarjetas</h3>
            <div id="tarjetas-container">
              {tarjetas.map((t) => (
                <TarjetaCard 
                  key={t.id || t._id} 
                  tarjeta={t} 
                  onEdit={handleAbrirModal} 
                />
              ))}
            </div>

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
        onSuccess={fetchData} 
      />
    </div>
  );
}