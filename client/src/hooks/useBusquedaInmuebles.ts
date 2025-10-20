import type { Inmueble } from "@/types/types";
import { useState, useCallback } from "react";

export interface InmueblesSummaryResponse {
  content: Inmueble[];
  totalPages: number;
  number: number;
}

export interface UseBusquedaInmueblesResult {
  nombre: string;
  setNombre: (nombre: string) => void;
  localidad: string;
  setLocalidad: (localidad: string) => void;
  rangoPrecio: number[];
  setRangoPrecio: (rangoPrecio: number[]) => void;
  setCapacity: (capacity: number) => void;
  capacity: number | null;
  data: InmueblesSummaryResponse | undefined | null;
  loading: boolean;
  hasResults: boolean;
  handleBuscar: (page?: number) => Promise<void>;
  clearResults: () => void;
}

export const useBusquedaInmuebles = (): UseBusquedaInmueblesResult => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [nombre, setNombre] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [rangoPrecios, setRangoPrecio] = useState<number[]>([]);
  const [capacity, setCapacity] = useState<number | null>(null);
  const [data, setData] = useState<InmueblesSummaryResponse | undefined | null>(
    undefined
  );
  const [loading, setLoading] = useState(false);

  const handleBuscar = useCallback(
    async (page: number = 0) => {
      // Si no hay nombre ni localidad, resetea
      if (!nombre.trim() && !localidad.trim() && rangoPrecios.length === 0) {
        setData(undefined);
        return;
      }

      setLoading(true);

      try {
        const body = {
          nombre: nombre.trim(),
          localidad: localidad.trim(),
          rangoPrecios,
          capacidad: capacity,
          page,
        };
        console.log(body);
        const res = await fetch(`${apiUrl}/property/buscar`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          if (res.status === 404) {
            setData(null);
          } else {
            console.error(`Error HTTP: ${res.status}`);
            setData(null);
          }
          return;
        }

        const json: InmueblesSummaryResponse = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error al buscar inmuebles:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    },
    [nombre, localidad, rangoPrecios, capacity]
  );

  const clearResults = useCallback(() => {
    setData(undefined);
    setNombre("");
    setLocalidad("");
    setRangoPrecio([]);
  }, []);

  // Determina si hay resultados basado en la data
  const hasResults =
    data !== undefined && data !== null && data.content.length > 0;

  return {
    nombre,
    setNombre,
    localidad,
    setLocalidad,
    setCapacity,
    capacity,
    rangoPrecio: rangoPrecios,
    setRangoPrecio,
    data,
    loading,
    hasResults,
    handleBuscar,
    clearResults,
  };
};
