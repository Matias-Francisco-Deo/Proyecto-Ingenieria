import type { Inmueble } from "@/types/types";
import { useState, useCallback } from "react";

// Define la misma estructura de respuesta de la API
export interface InmueblesSummaryResponse {
    content: Inmueble[];
    totalPages: number;
    number: number;
}

// Define la interfaz de las propiedades que devuelve el hook
export interface UseBusquedaInmueblesResult {
    nombre: string;
    setNombre: (nombre: string) => void;
    data: InmueblesSummaryResponse | undefined | null;
    loading: boolean;
    handleBuscar: (page?: number) => Promise<void>;
}

export const useBusquedaInmuebles = (): UseBusquedaInmueblesResult => {
    const [nombre, setNombre] = useState("");
    const [data, setData] = useState<
        InmueblesSummaryResponse | undefined | null
    >(undefined);
    const [loading, setLoading] = useState(false);

    const handleBuscar = useCallback(
        async (page: number = 0) => {
            // Si no hay texto de búsqueda, resetea los datos y sale.
            if (!nombre.trim()) {
                setData(undefined);
                return;
            }

            setLoading(true);

            try {
                const encodedNombre = encodeURIComponent(nombre.trim());

                const res = await fetch(
                    `http://localhost:8081/property/buscar/${encodedNombre}?page=${page}`
                );

                if (!res.ok) {
                    if (res.status === 404) {
                        setData(null); // Marcar como sin coincidencias
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
        [nombre]
    );

    return {
        nombre,
        setNombre,
        data,
        loading,
        handleBuscar,
    };
};
