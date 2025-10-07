import { useState, useEffect, useRef } from "react";
import Carrusel from "../components/Carrusel";
import { useUser } from "@/hooks/useUser";
import type { ErrorResponse, PendingPetition } from "@/types/types";
import { useToast } from "@/hooks/useToast";

export default function CancelarReservaPage() {
    const [petition, setPetition] = useState<PendingPetition | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);
    const [cancelError, setCancelError] = useState("");
    const [generalError, setGeneralError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const cancellationMotive = useRef<HTMLTextAreaElement>(null);
    const { getId } = useUser();
    const { toastError } = useToast();
    const apiUrl = import.meta.env.VITE_API_URL;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    useEffect(() => {
        if (!id) return;

        const fetchInmueble = async () => {
            try {
                const res = await fetch(`${apiUrl}/peticion/pendiente/${id}`);
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
                    `${apiUrl}/peticion/pendiente/${id}/images`
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

    const nextImage = () =>
        setCurrentIndex((prev) => (prev + 1) % images.length);
    const prevImage = () =>
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    if (loading) return <p>Cargando...</p>;
    if (!petition) return <p>Reserva no encontrada</p>;

    return (
        <div className="p-6 text-white border border-gray-700 rounded-xl">
            {popUpCancelacion()}

            <div className="flex gap-6">
                <div className="w-3/5">
                    <Carrusel
                        images={images}
                        currentIndex={currentIndex}
                        nextImage={nextImage}
                        prevImage={prevImage}
                    />
                </div>

                <div
                    className="w-2/5 flex flex-col"
                    style={{ minHeight: "100%" }}
                >
                    <div className="bg-gray-800 rounded-xl px-6 py-6 flex flex-col gap-4 flex-1 overflow-y-auto">
                        <p className="text-2xl font-bold text-amber-400">
                            {petition.name}
                        </p>
                        <p className="text-lg">
                            <span className="font-semibold">Dueño: </span>
                            {petition.owner_name} - {petition.owner_email}
                        </p>
                        <p className="text-left text-lg flex-1 overflow-y-auto">
                            <span className="font-semibold">Descripción: </span>
                            {petition.description}
                        </p>

                        <div className="flex justify-between text-lg gap-4">
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold">
                                    Localidad: {petition.ubication}
                                </span>
                                <span>
                                    <span className="font-semibold">
                                        Calle:{" "}
                                    </span>
                                    {petition.street} &nbsp;
                                    <span className="font-semibold">
                                        Altura:{" "}
                                    </span>
                                    {petition.number}
                                </span>
                            </div>
                            <div className="flex items-center mr-15">
                                <span className="font-semibold">
                                    Capacidad:{" "}
                                </span>{" "}
                                {petition.capacity}
                            </div>
                        </div>

                        <p className="text-lg">
                            <span className="font-semibold">
                                Fecha del evento:{" "}
                            </span>
                            {petition.date_start.split(" ")[0]}
                        </p>
                        <p className="text-lg">
                            <span className="font-semibold">De: </span>
                            {petition.date_start.split(" ")[1]}
                            <span className="font-semibold"> - Hasta: </span>
                            {petition.date_end.split(" ")[1]}
                        </p>
                    </div>

                    <div className="flex mt-4 gap-4 h-[80px]">
                        <div className="bg-gray-800 text-2xl text-amber-400 rounded-xl flex items-center justify-center w-1/2">
                            <p>Precio: ${petition.price}</p>
                        </div>

                        <div className="w-1/2 flex items-center justify-center">
                            <button
                                onClick={() => setIsCancelling(true)}
                                className="bg-red-950 hover:bg-red-800 text-white font-bold py-3 px-10 rounded-xl w-full cursor-pointer"
                            >
                                Cancelar mi reserva
                            </button>
                        </div>
                    </div>

                    <p className="text-red-500 mt-2">{generalError}</p>
                </div>
            </div>
        </div>
    );

    function popUpCancelacion() {
        return (
            <div
                className={
                    "absolute z-100 top-1/4 flex flex-col gap-6 p-14 bg-gray-800 rounded-2xl border-2 border-amber-400 transition duration-300 ease-in-out w-[500px] " +
                    `${
                        isCancelling
                            ? "opacity-100 pointer-events-auto"
                            : "opacity-0 pointer-events-none"
                    }`
                }
                style={{ left: "50%", transform: "translateX(-50%)" }}
            >
                <h2 className="text-3xl text-center ">Cancelar reserva</h2>

                {petition?.status === "Vigente" && (
                    <>
                        <p className="text-2xl text-white">
                            Se le aplicarán estas políticas de cancelación:
                        </p>
                        <p className="text-2xl text-white">
                            {petition.cancellationPolicy}
                        </p>
                    </>
                )}
                <p className="text-2xl">Motivo de la cancelación:</p>
                <form
                    className="flex flex-col gap-10"
                    onSubmit={(evt) => cancelReservation(evt)}
                >
                    <textarea
                        placeholder="Ingrese el motivo..."
                        className="p-2 w-full resize-none h-20 bg-gray-900 placeholder-white rounded-xl"
                        ref={cancellationMotive}
                    ></textarea>
                    <button className="bg-red-950 hover:bg-red-800 text-white font-bold py-3 px-10 rounded-2xl text-xl cursor-pointer mx-auto">
                        Cancelar mi reserva
                    </button>
                    <p className="text-red-500">{cancelError}</p>
                    {successMessage && (
                        <p className="text-green-500">{successMessage}</p>
                    )}
                </form>
                <div className="top-0 right-0 absolute">
                    <button
                        type="button"
                        onClick={() => setIsCancelling(false)}
                        className="hover:cursor-pointer absolute -top-3 -right-3 bg-black hover:bg-red-800 text-white rounded-full border-2 border-amber-400 w-10 h-10 flex items-center justify-center text-xs"
                    >
                        X
                    </button>
                </div>
            </div>
        );
    }

    async function cancelReservation(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        const response = await fetch("${apiUrl}    /peticion/cancelar", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ownerId: getId(),
                peticionId: id,
                motivoDeCancelacion: cancellationMotive.current?.value,
            }),
        }).catch(() => {
            toastError("Hubo un error inesperado.");
            return;
        });

        if (!response) return;

        if (response.ok) {
            setGeneralError("");
            setSuccessMessage("La reserva se canceló correctamente");
            setTimeout(() => {
                location.href = "/reservas/pendientes";
            }, 2000);
            return;
        }

        const cancelErrorResponse = (await response.json()) as ErrorResponse;
        if (cancelErrorResponse.error) {
            setCancelError(cancelErrorResponse.error);
            return;
        }
    }
}
