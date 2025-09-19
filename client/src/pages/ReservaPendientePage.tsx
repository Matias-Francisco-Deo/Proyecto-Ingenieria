import { useState, useEffect } from "react";
import Carrusel from "../components/Carrusel";
import { Link } from "wouter";

type PendingPetition = {
  id: number;
  name: string;
  description: string;
  ubication: string;
  price: number;
  date_start: string;
  date_end: string;
  capacity: number;
  client_name: string;
  client_email: string;
};

export default function Publicacion() {
  const examplePendingPetition: PendingPetition = {
    id: 1,
    name: "Pepe yoga class",
    description: "I wanted to fly.",
    ubication: "Central Park, NYC",
    price: 100,
    date_start: "2025-10-01 17:00",
    date_end: "2025-10-01 21:00",
    capacity: 30,
    client_name: "Tuvi Eja",
    client_email: "tu.mama@si.com",
  };

  const [petition, setPetition] = useState<PendingPetition | null>(
    examplePendingPetition
  );
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  useEffect(() => {
    if (!id) return;

    const fetchInmueble = async () => {
      try {
        const res = await fetch(`http://localhost:8081/reserva/pending/${id}`);
        if (!res.ok) throw new Error("Reserva no encontrada.");
        const data = await res.json();
        setPetition(data);
      } catch (err) {
        console.error(err);
        setPetition(null);
      }
    };

    const fetchImages = async () => {
      try {
        const res = await fetch(
          `http://localhost:8081/reserva/pending/${id}/images`
        );
        if (!res.ok) throw new Error("Imágenes no encontradas.");
        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.error(err);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInmueble();
    fetchImages();
  }, [id]);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  if (loading) return <p>Cargando...</p>;
  if (!petition) return <p>Reserva no encontrada</p>;

  return (
    <div className="p-6 text-white border border-gray-700 rounded-xl ">
      {popUpRechazo()}
      <div className="flex justify-between items-center mb-4">
        <div className="border border-gray-600 rounded-lg px-4 py-2 ml-4 flex items-center gap-3"></div>
      </div>
      <div className="flex gap-6">
        <div className="w-3/5">
          <Carrusel
            images={images}
            currentIndex={currentIndex}
            nextImage={nextImage}
            prevImage={prevImage}
          />
        </div>
        <div className="w-2/5 flex flex-col  ">
          <div className="bg-gray-800 rounded-xl px-4 flex flex-col pt-6 pb-4 gap-10 ">
            <div className="w-fit mx-auto">
              <p className="text-2xl font-bold text-amber-400">
                Inmueble: {petition.name}
              </p>
            </div>

            <div className="space-y-3  flex text-xl flex-col justify-center py-8 gap-10">
              <div className=" flex justify-between px-4">
                <p>
                  <span className="font-semibold text-lg ">Localidad: </span>
                  {petition.ubication}
                </p>
                <p>
                  <span className="font-semibold text-lg">Capacidad: </span>
                  {petition.capacity}
                </p>
              </div>

              <div className="w-fit mx-auto">
                <p className="">
                  <span className="font-semibold text-lg ">Comienza: </span>
                  {petition.date_start}
                </p>
                <p className="">
                  <span className="font-semibold text-lg ">Termina: </span>
                  {petition.date_end}
                </p>
              </div>

              <p className="text-2xl">
                Cliente: {petition.client_name} - {petition.client_email}
              </p>
            </div>
          </div>

          <div className="flex justify-start mt-6 gap-8 items-start">
            <div className="text-2xl text-amber-400 bg-gray-800 rounded-xl py-6 w-1/3 text-center min-w-1/4">
              <p>Precio: ${petition.price}</p>
            </div>

            <div className="flex mt-6 gap-4">
              <button className="bg-green-900 hover:bg-green-500 text-white font-bold py-2 px-7 rounded-xl cursor-pointer">
                Aceptar
              </button>
              <button
                onClick={() => setIsRejecting(true)}
                className="bg-red-950 hover:bg-red-800 text-white font-bold py-2 px-7 rounded-xl cursor-pointer"
              >
                Rechazar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function popUpRechazo() {
    return (
      <div
        className={
          " w-1/3 flex absolute z-100 justify-self-center top-1/4 flex-col gap-20 p-14 bg-gray-800/60 min-w-96 transition duration-300 ease-in-out " +
          `${
            isRejecting
              ? "opacity-100 pointer-events-auto "
              : "opacity-0 pointer-events-none "
          }`
        }
      >
        <p className="text-2xl">Motivo del rechazo:</p>
        <form
          className="flex flex-col gap-10"
          onSubmit={(evt) => rejectPetition(evt)}
        >
          <textarea
            placeholder="Ingrese el motivo..."
            className="w-full resize-none h-20 bg-gray-800 placeholder-white rounded-xl"
          ></textarea>
          <button className="bg-red-950 hover:bg-red-800 text-white font-bold py-2 px-7 rounded-xl cursor-pointer">
            Confirmar el rechazo
          </button>
        </form>
        <div className="top-0 right-0 absolute ">
          <button
            type="button"
            onClick={() => {
              setIsRejecting(false);
            }}
            className="hover:cursor-pointer absolute top-0 right-0 bg-red-950 hover:bg-red-800 text-white rounded-full w-10 h-10 flex items-center justify-center text-xs"
          >
            X
          </button>
        </div>
      </div>
    );
  }
  function rejectPetition(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    // todo sale bien
    setIsRejecting(false);
  }
}
