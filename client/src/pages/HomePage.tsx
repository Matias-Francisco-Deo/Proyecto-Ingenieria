import type { Inmueble } from "@/types/types";
import { useState } from "react";
import { Link } from "wouter";

function Buscador() {
    const [query, setQuery] = useState("");
    const [resultados, setResultados] = useState<Inmueble[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false); // Para saber si ya se buscó

    const buscar = async () => {
        setLoading(true);
        setSearched(true);

        try {
            const resp = await fetch(
                `http://localhost:8081/property/buscar/${query}?page=0`
            );
            const data = await resp.json();
            setResultados(data);
        } catch (e) {
            console.error(e);
            setResultados([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar objeto..."
                className="border p-2 rounded"
            />
            <button
                onClick={buscar}
                className="ml-2 px-4 py-2 bg-amber-500 hover:bg-amber-700 text-white rounded cursor-pointer"
            >
                Buscar
            </button>

            {loading && <p>Cargando...</p>}

            {!loading && searched && resultados.length === 0 && (
                <p className="text-red-500 mt-2">Sin coincidencias</p>
            )}

            {!loading && resultados.length > 0 && (
                <ul className="mt-2 list-disc pl-5 ">
                    {resultados.map((inm) => {
                        console.log(inm);
                        return (
                            <Link href={`/publicacion?id=${inm.id}`}>
                                <li
                                    key={inm.id}
                                    className="border-2 border-amber-600 mt-2 pl-2 p-2"
                                >
                                    {inm.name}
                                </li>
                            </Link>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export default Buscador;

// }
// const [inmuebles, setInmuebles] = useState<Inmueble[]>([]);
// const [nombre, setNombre] = useState("");
// const [resultados, setResultados] = useState<Inmueble[]>([]);

// const handleBuscar = () => {
//   fetch(`http://localhost:8081/property/buscar/${nombre}`)
//     .then(res => res.json())
//     .then(data => {
//       setResultados(data);
//       console.log(data);
//     });
// };

// useEffect(() => {
//   fetch("http://localhost:8081/property")
//     .then(res => res.json())
//     .then(data => setInmuebles(data));
// }, []);

// return (
//   <div className="grid gap-4 p-4">
//     <div className="p-4">
//       <input
//         type="text"
//         value={nombre}
//         onChange={e => setNombre(e.target.value)}
//         placeholder="Buscar inmueble..."
//         className="border p-2 rounded"
//       />
//       <button onClick={handleBuscar} className="ml-2 p-2 bg-blue-500 text-white rounded">
//         Buscar
//       </button>

//       <ul className="mt-4">
//         {resultados.map(inm => (
//           <li key={inm.id}>{inm.name} - {inm.description}</li>
//         ))}
//       </ul>
//     </div>

//     {inmuebles.map(inm => (
//       <div key={inm.id} className="p-4 shadow rounded bg-gray">
//         <h2 className="text-xl font-bold">{inm.name}</h2>
//         <p>{inm.description}</p>
//         <p><strong>Ubicación:</strong> {inm.ubication}</p>
//         <p><strong>Capacidad:</strong> {inm.capacity}</p>
//         <p><strong>Precio:</strong> ${inm.price}</p>
//         <p><strong>Política:</strong> {inm.cancellation}</p>
//         <p><strong>Hora inicio:</strong> {inm.start}</p>
//         <p><strong>Hora fin:</strong> {inm.end}</p>
//         {/* <img src={inm.imagenUrl} alt={inm.nombre} className="w-64 h-40 object-cover mt-2"/> */}
//       </div>
//     ))}
//   </div>
// );
