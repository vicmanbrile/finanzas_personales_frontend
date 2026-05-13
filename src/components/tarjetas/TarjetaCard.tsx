"use client";

import { formatCurrency } from "@/lib/utils";
import { Tarjeta } from "@/types";

interface TarjetaCardProps {
  tarjeta: Tarjeta;
  onEdit: (tarjeta: Tarjeta) => void;
}

export function TarjetaCard({ tarjeta: t, onEdit }: TarjetaCardProps) {
  const msiVal = t.msi || 0;
  const tenerCorriente = Number(t.tenerCorriente) || 0;
  const tenerAPago = Number(t.tenerAPago) || 0;
  const totalAhorroEnSemana = tenerCorriente + tenerAPago;

  return (
    <div className="tarjeta-card" style={{ borderTop: `4px solid ${t.color}` }}>
      <div>
        <div className="tarjeta-header">
          <h3>{t.nombre}</h3>
          <span className="tarjeta-uso-badge" style={{ backgroundColor: `${t.color}20`, color: t.color }}>
            {t.uso} | {t.usoPorcentaje}% uso
          </span>
        </div>
        <div className="tarjeta-credito">
          Crédito: {formatCurrency(t.credito)}
        </div>
      </div>

      <div className="tarjeta-meta">
        <span>Fecha a Pago: <strong>{t.fechaAPago || t.fechaPago}</strong></span>
        <span className="tarjeta-saldo-pago">Saldo a Pago: <strong>{formatCurrency(t.saldoAPago)}</strong></span>
      </div>

      <div>
        <div className="tarjeta-dist-header">
          <span className="tarjeta-dist-title">Distribución de Crédito</span>
          {totalAhorroEnSemana > 0 && (
            <span className="tarjeta-dist-texto">
              {tenerAPago > 0 && (
                <>Semana Pago <span className="text-pago">({formatCurrency(tenerAPago)})</span> {Math.min(t.semanaAPago || 0, 4)} / 4</>
              )}
              {tenerAPago > 0 && tenerCorriente > 0 && <><br/><span className="text-separador"></span></>}
              {tenerCorriente > 0 && (
                <>Corriente <span className="text-corriente">({formatCurrency(tenerCorriente)})</span> {t.semanaCorriente} / 3</>
              )}
            </span>
          )}
        </div>
        <div className="tarjeta-barra-progreso">
          <div className="tarjeta-barra-segmento bg-pago" style={{ width: `${t.credito > 0 ? (tenerAPago / t.credito) * 100 : 0}%` }}></div>
          <div className="tarjeta-barra-segmento bg-corriente" style={{ width: `${t.credito > 0 ? (tenerCorriente / t.credito) * 100 : 0}%` }}></div>
          <div className="tarjeta-barra-segmento bg-apalancado" style={{ width: `${t.credito > 0 ? (t.apalancamiento / t.credito) * 100 : 0}%` }}></div>
          <div className="tarjeta-barra-segmento bg-msi" style={{ width: `${t.credito > 0 ? (msiVal / t.credito) * 100 : 0}%` }}></div>
          <div className="tarjeta-barra-segmento bg-disponible" style={{ width: `${t.credito > 0 ? (t.disponible / t.credito) * 100 : 0}%` }}></div>
        </div>
      </div>

      <div className="tarjeta-grid-totales">
        <div className="tarjeta-grid-item">
          <span className="tarjeta-grid-label">Ahorro (Tener)</span>
          <span className="tarjeta-grid-value val-ahorro">{formatCurrency(t.tener)}</span>
        </div>
        <div className="tarjeta-grid-item">
          <span className="tarjeta-grid-label">Apalancado</span>
          <span className="tarjeta-grid-value val-apalancado">{formatCurrency(t.apalancamiento)}</span>
        </div>
        <div className="tarjeta-grid-item">
          <span className="tarjeta-grid-label">MSI</span>
          <span className="tarjeta-grid-value val-msi">{formatCurrency(msiVal)}</span>
        </div>
        <div className="tarjeta-grid-item">
          <span className="tarjeta-grid-label">Disponible</span>
          <span className="tarjeta-grid-value val-disponible">{formatCurrency(t.disponible)}</span>
        </div>
      </div>

      <button className="btn-editar-tarjeta" onClick={() => onEdit(t)}>
        Editar Tarjeta
      </button>
    </div>
  );
}