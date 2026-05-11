"use client";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

export function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  return (
    <header className="dashboard-header">
      <div className="header-title-group">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="btn-toggle">☰</button>
        <div>
          <h1>Panel Financiero</h1>
          <p>Análisis de deuda y capacidad de ahorro</p>
        </div>
      </div>
    </header>
  );
}