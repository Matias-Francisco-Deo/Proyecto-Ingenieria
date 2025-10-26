import Carrusel from "@/components/Carrusel";
import InmuebleReadOnly from "@/components/inmueble/InmuebleReadOnly";
import { Link } from "wouter";
import type { Inmueble } from "@/types/types";

interface PublicacionViewModeProps {
    inmueble: Inmueble;
    images: string[];
    currentIndex: number;
    nextImage: () => void;
    prevImage: () => void;
    isOwner: boolean;
    onEditar: () => void;
    onEliminar: () => void;
}

export default function PublicacionViewMode({
    inmueble,
    images,
    currentIndex,
    nextImage,
    prevImage,
    isOwner,
    onEditar,
    onEliminar,
}: PublicacionViewModeProps) {
    return (
        <>
            <div className="w-3/5">
                <Carrusel
                    images={images}
                    currentIndex={currentIndex}
                    nextImage={nextImage}
                    prevImage={prevImage}
                />
            </div>

            <div className="w-2/5 bg-gray-800 rounded-xl p-4 flex flex-col justify-between">
                <InmuebleReadOnly inmueble={inmueble} />
                {isOwner && (
                    <div className="flex justify-center mt-6 gap-4 content-center">
                        <button
                            onClick={onEditar}
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

                        <button
                            onClick={onEliminar}
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
    );
}
