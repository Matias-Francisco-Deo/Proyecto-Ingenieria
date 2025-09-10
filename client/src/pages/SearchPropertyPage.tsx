import ListaDeInmuebles from "@/components/ListaDeInmuebles";
import type { Inmueble } from "@/types/types";
import { useState } from "react";

export default function ListaInmuebles() {
    const [nombre, setNombre] = useState("");
    const [resultados, setResultados] = useState<Inmueble[]>([]);

    const handleBuscar = () => {
        fetch(`http://localhost:8081/property/buscar/${nombre}`)
            .then((res) => res.json())
            .then((data) => {
                setResultados(data);
                console.log(data);
            });
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

                <ListaDeInmuebles resultados={resultados} />
            </div>
        </div>
    );
}
