import { useState, useEffect } from "react";
import Carrusel from "../components/Carrusel";
import { Link } from "wouter";
import type { ErrorResponse, Inmueble } from "@/types/types";
import InmuebleEditable from "../components/InmuebleEditable";
import InmuebleReadOnly from "../components/InmuebleReadOnly";
import { useUser } from "@/hooks/useUser";
import CarruselEditable from "@/components/CarruselEditable";
import { toast } from "react-toastify";

export default function Publicacion() {
  const [inmueble, setInmueble] = useState<Inmueble | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(false);

  const [eliminando, setEliminando] = useState(false);

  // Imágenes

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setSelectedFiles((prev) => [...prev, ...newFiles]);

    const urls = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...urls]);

    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id"); // id de la publicación

  const { getId } = useUser(); // Id del usuario
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    if (!id) return;

    const fetchInmueble = async () => {
      try {
        const res = await fetch(`${apiUrl}/property/${id}`);
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
        const res = await fetch(`${apiUrl}/property/${id}/images`);
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

  // Paginación
  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  // ELIMINAR IMÁGENES del carrusel
  const handleRemoveImage = async (index: number) => {
    if (!id) return;

    if (images.length <= 1) {
      toast.warning("Debe haber al menos una imagen en la publicación.");
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/property/${id}/removeImages`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imagesToRemove: [index] }),
      });

      if (!res.ok) throw new Error("Error al eliminar la imagen");

      setImages((prev) => prev.filter((_, i) => i !== index));

      setCurrentIndex((prev) =>
        prev >= images.length - 1 ? Math.max(0, prev - 1) : prev
      );
    } catch (err) {
      toast.error("Error al eliminar imagen:" + err);
    }
  };

  function popUpDarDeBaja() {
    return (
      <div
        className={
          "absolute z-100 top-1/4 flex flex-col gap-6 p-14 bg-gray-800 rounded-2xl border-2 border-amber-400 transition duration-300 ease-in-out w-[500px] " +
          `${
            eliminando
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`
        }
        style={{ left: "50%", transform: "translateX(-50%)" }}
      >
        <h2 className="text-3xl text-center ">
          ¿Realmente desea dar de baja la propiedad?
        </h2>
        <form
          className="flex flex-col gap-10"
          onSubmit={(evt) => eliminarPublicacion(evt)}
        >
          <button className="bg-red-950 hover:bg-red-800 text-white font-bold py-3 px-10 rounded-2xl text-xl cursor-pointer mx-auto">
            Confirmar baja
          </button>
          {/* <p className="text-red-500">{cancelError}</p> */}
        </form>
        <div className="top-0 right-0 absolute">
          <button
            type="button"
            onClick={() => setEliminando(false)}
            className="hover:cursor-pointer absolute -top-3 -right-3 bg-black hover:bg-red-800 text-white rounded-full border-2 border-amber-400 w-10 h-10 flex items-center justify-center text-xs"
          >
            X
          </button>
        </div>
      </div>
    );
  }

  async function eliminarPublicacion(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const response = await fetch(`${apiUrl}/property/${inmueble?.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).catch(() => {
      toast.error("Hubo un error inesperado.");
      return;
    });

    if (!response) return;

    if (response.ok) {
      toast.success(`Se ha dado de baja el inmueble: ${inmueble?.name}`);
      setTimeout(() => {
        location.href = "/mis-publicaciones";
      }, 2500);
      return;
    }

    const cancelErrorResponse = (await response.json()) as ErrorResponse;
    if (cancelErrorResponse.error) {
      toast.error(cancelErrorResponse.error);
      setTimeout(() => {
        location.href = "/mis-publicaciones";
      }, 2500);
      return;
    }
  }

  if (loading) return <p>Cargando...</p>;
  if (!inmueble) return <p>Inmueble no encontrado</p>;

  const isOwner = inmueble.ownerId === getId(); // habilita botón de edición

  return (
    <div className="p-6 text-white border border-gray-700 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        {editando ? (
            <div className="flex items-center gap-1 text-amber-400">
                <label htmlFor="name">Nombre:</label>
                <input
                id="name"
                type="text"
                name="name"
                value={inmueble.name ?? ""}
                onChange={(e) =>
                    setInmueble((prev) =>
                    prev ? { ...prev, name: e.target.value } : prev
                    )
                }
                placeholder="Nombre"
                className="rounded-md bg-gray-600 px-3 py-1.5 text-base text-white outline-none focus:ring-2"
                />
            </div>
            ) : (
            <h1 className="text-3xl font-extrabold">{inmueble.name}</h1>
        )}
        <div className="border border-gray-600 rounded-lg px-4 py-2 ml-4 flex items-center gap-3">
          <p className="text-base text-white">{inmueble.ownerEmail}</p>
          <p className="text-lg font-semibold text-gray-200">
            {inmueble.ownerName}
          </p>
        </div>
      </div>

      {popUpDarDeBaja()}

      <div className="flex gap-6">
        {editando ? (
          <>
            {/* Carrusel */}
            <div className="w-3/5">
              <CarruselEditable
                images={images}
                currentIndex={currentIndex}
                nextImage={nextImage}
                prevImage={prevImage}
                onRemoveImage={handleRemoveImage}
              />

              <div className="mt-2 flex w-1/2 gap-2 flex-wrap">
                <label htmlFor="images" className="block font-medium text-sm/6">
                  Subir imagenes
                </label>
                <input
                  id="images"
                  name="images"
                  type="file"
                  multiple
                  required
                  autoComplete="images"
                  onChange={handleImageChange}
                  className={`loginInput -outline-offset-1 focus:-outline-offset-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1  focus:outline-2 focus:outline-indigo-600 sm:text-sm/6`}
                />
                {previewImages.map((img, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={img}
                      alt={`Preview ${idx}`}
                      className="w-32 h-32 object-contain border rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Edición */}
            <div className="w-2/5 bg-gray-800 rounded-xl p-4 flex flex-col justify-between">
              <InmuebleEditable
                inmueble={inmueble}
                onCancelar={() => setEditando(false)}
                onGuardar={async (data) => {
                  const response = await fetch(`${apiUrl}/property/${inmueble.id}`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                  }).catch(() => {
                    toast.error("Hubo un error inesperado.");
                    return;
                  });

                  if (selectedFiles.length > 0) {
                    const formData = new FormData();
                    selectedFiles.forEach((file) => {
                      formData.append("images", file);
                    });

                    await fetch(`${apiUrl}/property/${inmueble.id}/addImages`, {
                      method: "PATCH",
                      body: formData,
                    });
                  }

                  if (!response) return;

                  if (response.ok) {
                    setSelectedFiles([]);
                    setPreviewImages([]);
                    setEditando(false);
                    location.href = `/publicacion?id=${inmueble.id}`;
                  }

                  const updateError = (await response.json()) as ErrorResponse;
                  if (updateError.error) {
                    toast.error(updateError.error);
                    
                    if (updateError.error === "No existe la publicación que quiere modificar") {
                      setTimeout(() => {
                        location.href = "/mis-publicaciones";
                      }, 2500);
                    }
                    return;
                  }
                }}
              />
            </div>
          </>
        ) : (
          // Sección de solo vista
          <>
            {/* Carrusel */}
            <div className="w-3/5">
              <Carrusel
                images={images}
                currentIndex={currentIndex}
                nextImage={nextImage}
                prevImage={prevImage}
              />
            </div>

            {/* Contenido */}
            <div className="w-2/5 bg-gray-800 rounded-xl p-4 flex flex-col justify-between">
              <InmuebleReadOnly inmueble={inmueble} />
              {isOwner && (
                <>
                  {/* Botón para editar la publicación am */}
                  <div className="flex justify-center mt-6 gap-4 content-center">
                    <button
                      onClick={() => setEditando(true)}
                      className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-1 px-4 rounded-xl cursor-pointer flex items-center"
                      aria-label="Editar publicación"
                    >
                      Editar
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M4 14v-2h7v2zm0-4V8h11v2zm0-4V4h11v2zm9 14v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-5.5 5.5zm7.5-6.575l-.925-.925zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45l-3.05 3.025zm3.525-3.525l-.475-.45l.925.925z"
                        />
                      </svg>
                    </button>

                    {/* Botón para eliminar publiación pa */}
                    <button
                      onClick={() => setEliminando(true)}
                      className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-1 px-4 rounded-xl cursor-pointer flex items-center"
                      aria-label="Eliminar publicación"
                    >
                      Eliminar
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zm3-4q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17"
                        />
                      </svg>
                    </button>
                  </div>
                </>
              )}
              <div className="flex justify-center mt-6 gap-4">
                {!isOwner && (
                  <Link href={`/hacer-reserva?id=${inmueble.id}`}>
                    <button className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-6 rounded-xl cursor-pointer">
                      Reservar
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
