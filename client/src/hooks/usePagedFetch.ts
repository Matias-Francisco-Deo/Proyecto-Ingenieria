import { useEffect, useState } from "react";
import type { DependencyList } from "react";

interface PageResponse<T> {
    content: T[];
    totalPages: number;
    number: number;
}

interface UsePagedFetchOptions {
    endpoint: string; // Ej: `/mis-reservas/vigentes/1`
    deps?: DependencyList; // Dependencias opcionales del useEffect
}

/**
 * Hook genérico para obtener datos paginados desde el backend.
 * Soporta 404 (sin datos), manejo de loading y reintentos.
 */
export function usePagedFetch<T>({
    endpoint,
    deps = [],
}: UsePagedFetchOptions) {
    const [data, setData] = useState<PageResponse<T> | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchPage = async (page: number = 0) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${apiUrl}${endpoint}?page=${page}`);

            if (!res.ok) {
                if (res.status === 404) {
                    setData(null);
                    return;
                } else {
                    throw new Error(`Error HTTP: ${res.status}`);
                }
            }

            const json: PageResponse<T> = await res.json();
            setData(json);
        } catch (err) {
            console.error("Error al hacer fetch:", err);
            setError("No se pudo obtener la información.");
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPage(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return {
        data,
        loading,
        error,
        fetchPage,
    };
}
