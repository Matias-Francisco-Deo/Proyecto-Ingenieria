import ListaDeInmuebles from "@/components/ListaDeInmuebles";
import Paginacion from "@/components/Paginacion";
import type { Inmueble } from "@/types/types";
import { useState } from "react";

interface InmueblesSummaryResponse {
    content: Inmueble[];
    totalPages: number;
    number: number;
}

export default function ListaInmuebles() {
    const [nombre, setNombre] = useState("");
    const [data, setData] = useState<InmueblesSummaryResponse | null>(null);
    const [loading, setLoading] = useState(false);

    const handleBuscar = async (page: number = 0) => {
        setLoading(true);
        try {
            const res = await fetch(
                `http://localhost:8081/property/buscar/${nombre}?page=${page}`
            );

            if (!res.ok) {
                if (res.status === 404) {
                    setData(null);
                } else {
                    throw new Error(`Error HTTP: ${res.status}`);
                }
                return;
            }

            const json: InmueblesSummaryResponse = await res.json();
            setData(json);
        } catch {
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid gap-4 p-4">
            <div className="p-4">
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Buscar inmueble..."
                    className="border p-2 rounded"
                />
                <button
                    onClick={() => handleBuscar(0)}
                    className="ml-2 p-2 bg-amber-600 text-white rounded"
                >
                    Buscar
                </button>

                {loading && <p>Cargando...</p>}

                {!loading && data === null && (
                    <p className="text-red-500 mt-2">Sin coincidencias</p>
                )}

                {!loading && data && data.content.length > 0 && (
                    <>
                        <ListaDeInmuebles resultados={data.content} />
                        <div className="mt-4">
                            <Paginacion
                                paginaActual={data.number + 1}
                                totalPaginas={data.totalPages}
                                onPageChange={(nro) => handleBuscar(nro - 1)}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
