"use client";

import { FormEvent, useState, useEffect } from "react";
import { Tarjeta } from "@/types";
import { mutate } from "swr";

interface TarjetaModalProps {
  isOpen: boolean;
  onClose: () => void;
  tarjetaActual: Tarjeta | null;
}

export function TarjetaModal({ isOpen, onClose, tarjetaActual }: TarjetaModalProps) {
  const [colorHex, setColorHex] = useState(tarjetaActual?.color || "#6366f1");

  useEffect(() => {
    if (isOpen) {
      setColorHex(tarjetaActual?.color || "#6366f1");
    }
  }, [tarjetaActual, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const payload = {
      nombre: formData.get("nombre") as string,
      credito: Number(formData.get("credito")),
      disponible: Number(formData.get("disponible")),
      saldo: Number(formData.get("saldo")),
      saldoAPago: Number(formData.get("saldoAPago")),
      diaCorte: Number(formData.get("diaCorte")),
      diaPago: Number(formData.get("diaPago")),
      color: formData.get("color") as string,
    };

    const isUpdate = !!tarjetaActual;
    const idStr = tarjetaActual?.id || tarjetaActual?._id;
    
    const url = isUpdate ? `/api/tarjetas?id=${idStr}` : `/api/tarjetas`;
    const method = isUpdate ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        mutate('/api/tarjetas');
        mutate('/api/dashboard/totals');
        onClose();
      } else {
        const text = await response.text();
        alert("Error al guardar: " + text);
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor");
    }
  };

  const handleEliminar = async () => {
    const idStr = tarjetaActual?.id || tarjetaActual?._id;
    if (!idStr) return;

    if (confirm("¿Estás seguro de que deseas eliminar esta tarjeta?")) {
      try {
        const response = await fetch(`/api/tarjetas?id=${idStr}`, {
          method: "DELETE",
        });

        if (response.ok) {
          mutate('/api/tarjetas');
          mutate('/api/dashboard/totals');
          onClose();
        } else {
          const text = await response.text();
          alert("Error al eliminar: " + text);
        }
      } catch (error) {
        console.error(error);
        alert("Error de conexión con el servidor");
      }
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    boxSizing: "border-box" as const,
    marginTop: "6px",
    fontSize: "15px"
  };

  const rowStyle = {
    display: "flex",
    gap: "20px",
    marginBottom: "15px"
  };

  return (
    <div className="modal-activo">
      <div className="modal-contenido" style={{ borderRadius: "12px", padding: "25px", maxWidth: "550px", width: "100%" }}>
        <span className="cerrar-modal" onClick={onClose}>&times;</span>
        <h2>{tarjetaActual ? "Actualizar Tarjeta" : "Agregar Tarjeta"}</h2>
        <form onSubmit={handleSubmit}>
          <div style={rowStyle}>
            <div className="form-group" style={{ flex: 2 }}>
              <label>Nombre de la Tarjeta:</label>
              <input type="text" name="nombre" defaultValue={tarjetaActual?.nombre || ""} readOnly={!!tarjetaActual} required style={inputStyle} />
            </div>
            <div className="form-group" style={{ flex: 1.5 }}>
              <label>Color Representativo:</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                <input 
                  type="color" 
                  value={colorHex} 
                  onChange={(e) => setColorHex(e.target.value)}
                  style={{ 
                    width: '60px', 
                    height: '42px', 
                    padding: '0', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '8px',
                    cursor: 'pointer' 
                  }} 
                />
                <input 
                  type="text" 
                  name="color" 
                  value={colorHex} 
                  onChange={(e) => setColorHex(e.target.value)}
                  placeholder="#6366f1"
                  pattern="^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$"
                  title="Ingresa un color hexadecimal válido (ejemplo: #FF0000)"
                  style={{ ...inputStyle, flex: 1, textTransform: 'uppercase', height: '42px', marginTop: 0 }}
                  required 
                />
              </div>
            </div>
          </div>
          <div style={rowStyle}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Crédito Total:</label>
              <input type="number" step="0.01" name="credito" defaultValue={tarjetaActual?.credito ?? ""} required style={inputStyle} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Crédito Disponible:</label>
              <input type="number" step="0.01" name="disponible" defaultValue={tarjetaActual?.disponible ?? ""} required style={inputStyle} />
            </div>
          </div>
          <div style={rowStyle}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Saldo Actual:</label>
              <input type="number" step="0.01" name="saldo" defaultValue={tarjetaActual?.saldo ?? ""} required style={inputStyle} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Saldo a Pagar:</label>
              <input type="number" step="0.01" name="saldoAPago" defaultValue={tarjetaActual?.saldoAPago ?? ""} required style={inputStyle} />
            </div>
          </div>
          <div style={rowStyle}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Día de Corte:</label>
              <input type="number" min="1" max="31" name="diaCorte" defaultValue={tarjetaActual?.diaCorte ?? ""} required style={inputStyle} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Día de Pago:</label>
              <input type="number" min="1" max="31" name="diaPago" defaultValue={tarjetaActual?.diaPago ?? ""} required style={inputStyle} />
            </div>
          </div>
          <div className="form-group" style={{ display: 'flex', gap: '12px', marginTop: '25px' }}>
            <button type="submit" className="btn-guardar" style={{ flex: 2, padding: "12px", borderRadius: "8px", cursor: 'pointer' }}>
              Guardar Tarjeta
            </button>
            {tarjetaActual && (
              <button 
                type="button" 
                className="btn-eliminar" 
                onClick={handleEliminar}
                style={{ flex: 1, backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', padding: "12px" }}
              >
                Eliminar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
