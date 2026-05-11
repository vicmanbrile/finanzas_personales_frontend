"use client";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <aside className={`sidebar ${!isOpen ? "hidden" : ""}`} id="sidebar">
      <div className="sidebar-header">
        <h2>Finanzas</h2>
        <button onClick={() => setIsOpen(false)} className="btn-icon">×</button>
      </div>
      <nav className="sidebar-nav">
        <a href="#" className="active">Dashboard</a>
        <a href="#">Reportes</a>
        <a href="#">Configuración</a>
      </nav>
    </aside>
  );
}