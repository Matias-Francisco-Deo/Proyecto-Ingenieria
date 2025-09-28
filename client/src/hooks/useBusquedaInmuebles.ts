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
    handleBuscar: (page?: number) => Promise<void>;
}

export const useBusquedaInmuebles = (): UseBusquedaInmueblesResult => {
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
                // DTO que espera el backend
                const body = {
                    nombre: nombre.trim(),
                    localidad: localidad.trim(),
                    page: page,
                };

                const res = await fetch(
                    `http://localhost:8081/property/buscar`,
                    {
                        method: "POST", // <-- POST en vez de GET
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(body), // <-- body con JSON
                    }
                );

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

    return {
        nombre,
        setNombre,
        localidad,
        setLocalidad,
        data,
        loading,
        handleBuscar,
    };
};
