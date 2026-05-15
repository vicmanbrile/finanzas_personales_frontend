"use client";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { TarjetaCard } from "./TarjetaCard";
import { Tarjeta } from "@/types";

export function ListaTarjetas({ onEdit }: { onEdit: (t?: Tarjeta) => void }) {
  const { data: tarjetas, isLoading } = useSWR<Tarjeta[]>('/api/tarjetas', fetcher);

  if (isLoading) return <div>Cargando tarjetas...</div>;

  return (
    <div id="tarjetas-container">
      {tarjetas?.length ? tarjetas.map((t) => (
        <TarjetaCard key={t.id} tarjeta={t} onEdit={onEdit} />
      )) : <p>No hay tarjetas</p>}
    </div>
  );
}