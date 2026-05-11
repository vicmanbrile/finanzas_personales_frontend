"use client";

import { FormEvent } from "react";
import { Tarjeta } from "@/types";

interface TarjetaModalProps {
  isOpen: boolean;
  onClose: () => void;
  tarjetaActual: Tarjeta | null;
  onSuccess: () => void; // Para recargar los datos
}

export function TarjetaModal({ isOpen, onClose, tarjetaActual, onSuccess }: TarjetaModalProps) {
  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch(`/api/tarjetas`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        onClose();
        onSuccess(); 
      } else {
        const text = await response.text();
        alert("Error al guardar: " + text);
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor");
    }
  };

  const formatearFechaParaInput = (fecha?: string) => {
    if (!fecha) return "";
    if (fecha.includes("/")) {
      const partes = fecha.split("/");
      return `${partes[2]}-${partes[1]}-${partes[0]}`;
    }
    return fecha;
  };

  return (
    <div className="modal-activo">
      <div className="modal-contenido">
        <span className="cerrar-modal" onClick={onClose}>&times;</span>
        <h2>{tarjetaActual ? "Actualizar Tarjeta" : "Agregar Tarjeta"}</h2>
        
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="action" value={tarjetaActual ? "update" : "create"} />
          <input type="hidden" name="id" value={tarjetaActual?.id || tarjetaActual?._id || ""} />

          <div className="form-group">
            <label>Nombre de la Tarjeta:</label>
            <input type="text" name="nombre" defaultValue={tarjetaActual?.nombre || ""} readOnly={!!tarjetaActual} required />
          </div>
          
          <div className="form-group">
            <label>Crédito Total:</label>
            <input type="number" step="0.01" name="credito" defaultValue={tarjetaActual?.credito || ""} required />
          </div>
          
          <div className="form-group">
            <label>Crédito Disponible:</label>
            <input type="number" step="0.01" name="disponible" defaultValue={tarjetaActual?.disponible || ""} required />
          </div>
          
          <div className="form-group">
            <label>Saldo Actual:</label>
            <input type="number" step="0.01" name="saldo" defaultValue={tarjetaActual?.saldo || ""} required />
          </div>
          
          <div className="form-group">
            <label>Saldo a Pagar:</label>
            <input type="number" step="0.01" name="saldoAPago" defaultValue={tarjetaActual?.saldoAPago || ""} required />
          </div>
          
          <div className="form-group">
            <label>Fecha de Límite de Pago:</label>
            <input type="date" name="fechaPago" defaultValue={formatearFechaParaInput(tarjetaActual?.fechaAPago || tarjetaActual?.fechaPago)} required />
          </div>
          
          <div className="form-group">
            <label>Color Representativo:</label>
            <input type="color" name="color" defaultValue={tarjetaActual?.color || "#6366f1"} disabled={!!tarjetaActual} />
          </div>
          
          <div className="form-group">
            <button type="submit" className="btn-guardar" style={{ flex: 2 }}>Guardar Tarjeta</button>
            {tarjetaActual && (
              <button type="button" className="btn-eliminar">Eliminar</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}