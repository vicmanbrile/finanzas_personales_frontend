export interface Totals {
  totalUsado: number;
  totalAhorro: number;
  totalApalancado: number;
  totalMsi: number;
  totalDisponible: number;
  utilizacionGlobal: number;
  totalCredito: number;
}

export interface Tarjeta {
  // Datos guardados (Base)
  id?: string;
  _id?: string; 
  nombre: string;
  color: string;
  credito: number;
  disponible: number;
  saldo: number;
  saldoAPago: number;
  diaCorte: number;
  diaPago: number;

  // Estado del crédito (Cálculos de fechas/tiempo)
  semanaCorriente?: number;
  semanaAPago?: number;
  diasParaProximoCorte?: number; 
  diasParaProximoPago?: number; 
  tienePagoPendiente?: boolean; 
  fechaPago?: string; 
  fechaAPago?: string;

  // División del crédito completo
  uso: number;
  usoPorcentaje: number;
  tener: number;
  apalancamiento: number;
  msi?: number;

  // Cálculos de cuánto tener
  tenerAPago?: number;
  tenerCorriente?: number;
}