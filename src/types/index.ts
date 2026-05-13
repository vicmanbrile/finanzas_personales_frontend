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
  id?: string;
  _id?: string;
  nombre: string;
  color: string;
  credito: number;
  disponible: number;
  saldo: number;
  saldoAPago: number;
  fechaPago?: string;
  fechaAPago?: string;
  tenerCorriente?: number;
  tenerAPago?: number;
  semanaCorriente?: number;
  semanaAPago?: number;
  apalancamiento: number;
  msi?: number;
  usoPorcentaje: number;
  uso: number;
  tener: number;
}