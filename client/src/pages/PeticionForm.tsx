import { useState, useEffect } from "react";
import CalendarioCarrusel from "../components/CalendarioCarrusel";

type Inmueble = {
  id: number;
  name: string;
  price: number;
  ubication: string;
  condition: string;
  description: string;
  cancellation: string;
};

export default function PeticionForm() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [inmueble, setInmueble] = useState<Inmueble | null>(null);
  const [loading, setLoading] = useState(true);

  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) return;

    const fetchInmueble = async () => {
      try {
        const res = await fetch(`http://localhost:8081/property/${id}`);
        if (!res.ok) throw new Error("Inmueble no encontrado");
        const data = await res.json();
        setInmueble(data);
      } catch (err) {
        console.error(err);
        setInmueble(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInmueble();
  }, [id]);

  if (loading) return <p className="text-white">Cargando...</p>;
  if (!inmueble) return <p className="text-white">Inmueble no encontrado</p>;

  return (
    <div className="flex flex-col items-center text-white">
      <h2 className="text-3xl font-bold mb-4 text-center">Elija su horario</h2>

      <div className="w-[80%] flex-shrink-0">
        <CalendarioCarrusel onDaySelect={setSelectedDate} />
      </div>

      <div className="mt-8 flex w-[80%] gap-6 min-h-[55vh]">
        <div className="w-1/2 bg-gray-800 rounded-xl p-4"></div>

        <div className="w-1/2 bg-gray-700 rounded-xl p-4 flex flex-col justify-start space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-3xl font-extrabold">{inmueble.name}</h3>
            <p className="text-2xl font-bold text-amber-400">${inmueble.price}</p>
          </div>
          <p className="text-lg font-semibold">
            Localidad: <span className="font-normal">{inmueble.ubication}</span>
          </p>
          <p className="text-lg font-semibold">
            Condiciones: <span className="font-normal">{inmueble.condition}</span>
          </p>
          <p className="text-lg font-semibold">
            Política de cancelación: <span className="font-normal">{inmueble.cancellation}</span>
          </p>
          <p className="text-lg font-semibold">
            Descripción: <span className="font-normal">{inmueble.description}</span>
          </p>

          <div className="mt-auto flex justify-center">
            <button className="bg-gray-500 text-white font-bold py-2 px-8 rounded-xl ">
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}