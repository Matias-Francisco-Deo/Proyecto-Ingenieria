import ListaDeInmuebles from "@/components/ListaDeInmuebles";
import type { Inmueble } from "@/types/types";
import { useState } from "react";

export default function ListaInmuebles() {
    const [nombre, setNombre] = useState("");
    const [resultados, setResultados] = useState<Inmueble[]>([]);
    const [loading, setLoading] = useState(false);

    const handleBuscar = async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `http://localhost:8081/property/buscar/${nombre.toLowerCase()}`
            );

            if (!res.ok) {
                if (res.status === 404) {
                    setResultados([]);
                } else {
                    throw new Error(`Error HTTP: ${res.status}`);
                }
                return;
            }

            const data: Inmueble[] = await res.json();
            setResultados(data);
        } catch {
            setResultados([]);
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
                    onClick={handleBuscar}
                    className="ml-2 p-2 bg-amber-600 text-white rounded"
                >
                    Buscar
                </button>

                {loading && <p>Cargando...</p>}

                {!loading && resultados.length === 0 && (
                    <p className="text-red-500 mt-2">Sin coincidencias</p>
                )}

                {!loading && resultados.length > 0 && (
                    <ListaDeInmuebles resultados={resultados} />
                )}
            </div>
        </div>
    );
}
