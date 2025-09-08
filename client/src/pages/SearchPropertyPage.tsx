import { useEffect, useState } from "react";

type Inmueble = {
  id: number;
  name: string;
  description: string;
  ubication: string;
  price: number;
  conditions: string;
  start: string;
  end: string;
  capacity: number;
  cancellation: string;
};

export default function ListaInmuebles() {
  const [inmuebles, setInmuebles] = useState<Inmueble[]>([]);
  const [nombre, setNombre] = useState("");
  const [resultados, setResultados] = useState<Inmueble[]>([]);

  const handleBuscar = () => {
    fetch(`http://localhost:8080/property/buscar/${nombre}`)
      .then(res => res.json())
      .then(data => {
        setResultados(data);
        console.log(data);
      });
  };

  useEffect(() => {
    fetch("http://localhost:8080/property")
      .then(res => res.json())
      .then(data => setInmuebles(data));
  }, []);

  return (
    <div className="grid gap-4 p-4">
      <div className="p-4">
        <input
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          placeholder="Buscar inmueble..."
          className="border p-2 rounded"
        />
        <button onClick={handleBuscar} className="ml-2 p-2 bg-blue-500 text-white rounded">
          Buscar
        </button>

        <ul className="mt-4">
          {resultados.map(inm => (
            <li key={inm.id}>{inm.name} - {inm.description}</li>
          ))}
        </ul>
      </div>

      {inmuebles.map(inm => (
        <div key={inm.id} className="p-4 shadow rounded bg-gray">
          <h2 className="text-xl font-bold">{inm.name}</h2>
          <p>{inm.description}</p>
          <p><strong>Ubicación:</strong> {inm.ubication}</p>
          <p><strong>Capacidad:</strong> {inm.capacity}</p>
          <p><strong>Precio:</strong> ${inm.price}</p>
          <p><strong>Política:</strong> {inm.cancellation}</p>
          <p><strong>Hora inicio:</strong> {inm.start}</p>
          <p><strong>Hora fin:</strong> {inm.end}</p>
          {/* <img src={inm.imagenUrl} alt={inm.nombre} className="w-64 h-40 object-cover mt-2"/> */}
        </div>
      ))}
    </div>
  );
}
