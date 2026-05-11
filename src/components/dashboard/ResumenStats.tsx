"use client";

import { formatCurrency } from "@/lib/utils";
import { Totals } from "@/types";

interface ResumenStatsProps {
  totals: Totals | null;
}

export function ResumenStats({ totals }: ResumenStatsProps) {
  return (
    <section className="stats-area">
      <div className="resumen-card">
        <div className="stat-item">
          <span>Crédito Total Usado</span>
          <div>{totals ? formatCurrency(totals.totalUsado) : "$0.00"}</div>
        </div>

        {totals && totals.totalCredito > 0 && (
          <div className="progress-stack" id="bar-general">
            <div className="tarjeta-barra-segmento bg-ahorro" style={{ width: `${(totals.totalAhorro / totals.totalCredito) * 100}%`, backgroundColor: "var(--color-ahorro)" }} title={`Ahorro: ${formatCurrency(totals.totalAhorro)}`}></div>
            <div className="tarjeta-barra-segmento bg-apalancado" style={{ width: `${(totals.totalApalancado / totals.totalCredito) * 100}%` }} title={`Apalancamiento: ${formatCurrency(totals.totalApalancado)}`}></div>
            <div className="tarjeta-barra-segmento bg-msi" style={{ width: `${(totals.totalMsi / totals.totalCredito) * 100}%` }} title={`MSI: ${formatCurrency(totals.totalMsi)}`}></div>
            <div className="tarjeta-barra-segmento bg-disponible" style={{ width: `${(totals.totalDisponible / totals.totalCredito) * 100}%` }} title={`Disponible: ${formatCurrency(totals.totalDisponible)}`}></div>
          </div>
        )}

        <div className="resumen-grid">
          <div className="stat-item">
            <span>Ahorro necesario</span>
            <div style={{ fontSize: "1.2rem", color: "var(--color-ahorro)" }}>{totals ? formatCurrency(totals.totalAhorro) : "$0.00"}</div>
          </div>
          <div className="stat-item">
            <span>Apalancamiento</span>
            <div style={{ fontSize: "1.2rem", color: "var(--color-apalancado)" }}>{totals ? formatCurrency(totals.totalApalancado) : "$0.00"}</div>
          </div>
          <div className="stat-item">
            <span>Meses Sin Intereses</span>
            <div style={{ fontSize: "1.2rem", color: "var(--color-msi)" }}>{totals ? formatCurrency(totals.totalMsi) : "$0.00"}</div>
          </div>
          <div className="stat-item">
            <span>Crédito Disponible</span>
            <div style={{ fontSize: "1.2rem", color: "var(--color-disponible)" }}>{totals ? formatCurrency(totals.totalDisponible) : "$0.00"}</div>
          </div>
          <div className="stat-item">
            <span>Utilización</span>
            <div style={{ fontSize: "1.2rem", color: "#fff" }}>{totals ? `${totals.utilizacionGlobal.toFixed(1)}%` : "0%"}</div>
          </div>
        </div>
      </div>
    </section>
  );
}