import { useState, useEffect } from "react";
import Carrusel from "../components/Carrusel";
import { Link } from "wouter";
import type { Inmueble } from "@/types/types";
import InmuebleEditable from "../components/InmuebleEditable";
import InmuebleReadOnly from "../components/InmuebleReadOnly";
import { useUser } from "@/hooks/useUser";

export default function Publicacion() {
  const [inmueble, setInmueble] = useState<Inmueble | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id"); // id de la publicación

  const { getId } = useUser(); // Id del usuario

  useEffect(() => {
    if (!id) return;

    const fetchInmueble = async () => {
      try {
        const res = await fetch(`http://localhost:8081/property/${id}`);
        if (!res.ok) throw new Error("publicación no encontrada");
        const data = await res.json();
        setInmueble(data);
      } catch (err) {
        console.error(err);
        setInmueble(null);
      }
    };

    const fetchImages = async () => {
      try {
        const res = await fetch(`http://localhost:8081/property/${id}/images`);
        if (!res.ok) throw new Error("imágenes no encontradas");
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
  if (!inmueble) return <p>Inmueble no encontrado</p>;

  // const isOwner = inmueble.ownerId === getId(); // acá iría la comprobación para editar la publicación, necesito desde el back en el endpoint traer el ownerId
  const isOwner = 109 === getId(); // ahora lo hardcodié a esto

  return (
    <div className="p-6 text-white border border-gray-700 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-extrabold">{inmueble.name}</h1>
        <div className="border border-gray-600 rounded-lg px-4 py-2 ml-4 flex items-center gap-3">
          <p className="text-base text-white">{inmueble.ownerEmail}</p>
          <p className="text-lg font-semibold text-gray-200">
            {inmueble.ownerName}
          </p>
        </div>
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

        <div className="w-2/5 bg-gray-800 rounded-xl p-4 flex flex-col justify-between">
          {editando ? (
            <InmuebleEditable
              inmueble={inmueble}
              images={images}
              onCancelar={() => setEditando(false)}
              onGuardar={async (data, nuevasImgs) => {
                try {
                  // 1. Enviar PUT con los datos editados
                  const res = await fetch(`http://localhost:8081/property/${inmueble.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                  });

                  if (!res.ok) throw new Error("Error al actualizar el inmueble");

                  const actualizado = await res.json();
                  setInmueble(actualizado);

                  // 2. Enviar imágenes nuevas (si tu backend lo soporta en otra ruta)
                  // acá podrías usar un fetch separado tipo POST / DELETE según corresponda
                  setImages(nuevasImgs);

                  // 3. Salir de modo edición
                  setEditando(false);
                } catch (err) {
                  console.error("Error al guardar:", err);
                }
              }}
            />
          ) : (
            <InmuebleReadOnly inmueble={inmueble} />
          )}

          {/* Botones */}
          <div className="flex justify-center mt-6 gap-4">
            {!editando && (
              <>
                <Link href={`/hacer-reserva?id=${inmueble.id}`}>
                  <button className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-6 rounded-xl cursor-pointer">
                    Reservar
                  </button>
                </Link>

                {isOwner && (
                  <button
                    onClick={() => setEditando(true)}
                    className="bg-amber-500 px-3 py-1 rounded cursor-pointer hover:bg-amber-700"
                  >
                    Editar
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
