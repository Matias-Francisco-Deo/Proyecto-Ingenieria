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

                <ul className="mt-4">
                    {resultados.map((inm) => (
                        <li
                            key={inm.id}
                            className="border-2 border-amber-600 mt-2 pl-2 p-2"
                        >
                            <div
                                key={inm.id}
                                className="p-4 shadow rounded bg-gray"
                            >
                                <h2 className="text-xl font-bold">
                                    {inm.name}
                                </h2>
                                <p>
                                    <strong>Ubicación: </strong> {inm.ubication}
                                </p>
                                <p>
                                    <strong>Precio: </strong> ${inm.price}
                                </p>
                                <p>
                                    <strong>Nombre del dueño:</strong>{" "}
                                    {inm.nameDelDuenio}
                                </p>
                                <p>
                                    <strong>Email:</strong> {inm.email}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
