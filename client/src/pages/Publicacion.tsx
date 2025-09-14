import { useState, useEffect } from "react";
import Carrusel from "../components/Carrusel";
import { Link } from "wouter";

type Inmueble = {
    id: number;
    name: string;
    description: string;
    ubication: string;
    price: number;
    condition: string;
    start: string;
    end: string;
    capacity: number;
    cancellation: string;
    ownerName: string; 
    ownerEmail: string;
};

export default function Publicacion() {
    const [inmueble, setInmueble] = useState<Inmueble | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

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
                    <div className="space-y-3">
                        <p className="text-2xl font-bold text-amber-400">
                            Precio: ${inmueble.price}
                        </p>
                        <p>
                            <span className="font-semibold text-lg">Horario:</span>{" "}
                            {inmueble.start} - {inmueble.end}
                        </p>
                        <p>
                            <span className="font-semibold text-lg">Localidad:</span>{" "}
                            {inmueble.ubication}
                        </p>
                        <p>
                            <span className="font-semibold text-lg">Condiciones:</span>{" "}
                            {inmueble.condition}
                        </p>
                        <p>
                            <span className="font-semibold text-lg">
                                Política de cancelación:
                            </span>{" "}
                            {inmueble.cancellation}
                        </p>
                        <p>
                            <span className="font-semibold text-lg">Descripción:</span>{" "}
                            {inmueble.description}
                        </p>
                    </div>

                    <div className="flex justify-center mt-6">
                        <Link href={`/peticion?id=${inmueble.id}`}>
                            <button className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-6 rounded-xl cursor-pointer">
                            Reservar
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}