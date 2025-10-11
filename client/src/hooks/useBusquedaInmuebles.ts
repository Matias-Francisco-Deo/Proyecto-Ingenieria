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
    const [data, setData] = useState<
        InmueblesSummaryResponse | undefined | null
    >(undefined);
    const [loading, setLoading] = useState(false);

    const handleBuscar = useCallback(
        async (page: number = 0) => {
            // Si no hay nombre ni localidad, resetea
            if (!nombre.trim() && !localidad.trim()) {
                setData(undefined);
                return;
            }

            setLoading(true);

            try {
                const body = {
                    nombre: nombre.trim(),
                    localidad: localidad.trim(),
                    page: page,
                };

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
        [nombre, localidad]
    );

    const clearResults = useCallback(() => {
        setData(undefined);
        setNombre("");
        setLocalidad("");
    }, []);

    // Determina si hay resultados basado en la data
    const hasResults =
        data !== undefined && data !== null && data.content.length > 0;

    return {
        nombre,
        setNombre,
        localidad,
        setLocalidad,
        data,
        loading,
        hasResults,
        handleBuscar,
        clearResults,
    };
};
