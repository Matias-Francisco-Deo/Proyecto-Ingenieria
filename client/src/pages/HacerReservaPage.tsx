import { useState, useEffect, useRef, useLayoutEffect } from "react";
import CalendarioCarrusel from "../components/CalendarioCarrusel";
import CarruselHorarios from "../components/CarruselHorarios";
import { useUser } from "../hooks/useUser";
import type { HorarioDTO, Inmueble, MappedHorarioDTO } from "@/types/types";
import { useToast } from "@/hooks/useToast";

export default function PeticionForm() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [inmueble, setInmueble] = useState<Inmueble | null>(null);
    const [loading, setLoading] = useState(true);
    const [horariosSeleccionados, setHorariosSeleccionados] = useState<
        number[]
    >([]);
    const [horariosOcupados, setHorariosOcupados] = useState<
        MappedHorarioDTO[]
    >([]);
    const [sending, setSending] = useState(false);
    const [message, setMessage] = useState("");

    const horariosRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);
    const [altoHorarios, setAltoHorarios] = useState<number>(0);

    const { getId } = useUser();
    const { toastError } = useToast();
    const apiUrl = import.meta.env.VITE_API_URL;

    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");

    useEffect(() => {
        if (!id) return;

        const fetchInmueble = async () => {
            try {
                const res = await fetch(`${apiUrl}/property/${id}`);
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

    // Ajustar alto del contenedor de horarios según info del inmueble

    useLayoutEffect(() => {
        if (infoRef.current) setAltoHorarios(infoRef.current.clientHeight);
    }, [inmueble]);

    // Reiniciar selección de horarios al cambiar la fecha

    useEffect(() => {
        setHorariosSeleccionados([]);
    }, [selectedDate]);

    // Fetch de horarios ocupados según fecha seleccionada

    useEffect(() => {
        if (!selectedDate || !inmueble) return;

        const fetchHorariosOcupados = async () => {
            try {
                const yyyy = selectedDate.getFullYear();
                const mm = String(selectedDate.getMonth() + 1).padStart(2, "0");
                const dd = String(selectedDate.getDate()).padStart(2, "0");
                const dateStr = `${yyyy}-${mm}-${dd}`;

                const res = await fetch(
                    `http://localhost:8081/peticion/vigentes/${inmueble.id}/${dateStr}`
                );
                if (!res.ok)
                    throw new Error("Error al traer horarios ocupados.");

                const data = await res.json();
                const ocupados: MappedHorarioDTO[] = data.map(
                    (h: HorarioDTO) => ({
                        horaInicio: parseInt(h.horaInicio.split(":")[0], 10),
                        horaFin: parseInt(h.horaFin.split(":")[0], 10),
                    })
                );
                setHorariosOcupados(ocupados);
            } catch (err) {
                console.log(err);
                setHorariosOcupados([]);
            }
        };

        fetchHorariosOcupados();
    }, [selectedDate, inmueble]);

    if (loading) return <p className="text-white">Cargando...</p>;
    if (!inmueble) return <p className="text-white">Inmueble no encontrado</p>;

    // Cálculo de horas disponibles

    const inicio = parseInt(inmueble.start.split(":")[0], 10) || 8;
    const fin = parseInt(inmueble.end.split(":")[0], 10) || 20;

    const inicioSeleccion =
        horariosSeleccionados.length > 0
            ? Math.min(...horariosSeleccionados)
            : null;
    const finSeleccion =
        horariosSeleccionados.length > 1
            ? Math.max(...horariosSeleccionados)
            : null;

    const precioTotal =
        inicioSeleccion !== null && finSeleccion !== null
            ? (finSeleccion - inicioSeleccion) * inmueble.price
            : 0;

    // Función para reiniciar componentes (carrusel e info)

    const resetComponents = () => {
        setHorariosSeleccionados([]); // reinicia selección
        setSelectedDate((prev) => (prev ? new Date(prev) : null)); // refresca carrusel
    };

    const handleEnviar = async () => {
        if (
            !selectedDate ||
            inicioSeleccion === null ||
            finSeleccion === null
        ) {
            setMessage("Seleccione un día y un rango de horarios válido");
            resetComponents();
            setTimeout(() => setMessage(""), 5000); // limpiar mensaje después de 4s
            return;
        }

        setSending(true);

        try {
            const userId = getId();
            if (!userId) throw new Error("Usuario no logueado");

            const horaInicioLocalTime = `${inicioSeleccion
                .toString()
                .padStart(2, "0")}:00:00`;
            const horaFinLocalTime = `${finSeleccion
                .toString()
                .padStart(2, "0")}:00:00`;

            const payload = {
                userId,
                inmuebleId: inmueble.id,
                fecha: selectedDate.toISOString().split("T")[0],
                horaInicio: horaInicioLocalTime,
                horaFin: horaFinLocalTime,
                precioTotal,
            };

            const res = await fetch("http://localhost:8081/peticion/enviar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errData = await res.json();
                setMessage(errData?.message || "Error al enviar la petición");
                return;
            }

            setMessage("✅ Petición enviada exitosamente!");
            resetComponents(); // reiniciamos componentes sin borrar mensaje
            setTimeout(() => setMessage(""), 4000);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error(err);
            toastError("Hubo un error inesperado.");
            resetComponents();
            setTimeout(() => setMessage(""), 4000);
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="flex flex-col items-center text-white">
            <h2 className="text-3xl font-bold mb-4 text-center">
                Elija su horario
            </h2>

            <div className="w-[80%]">
                <CalendarioCarrusel
                    onDaySelect={setSelectedDate}
                    availableDays={inmueble.availableDays ?? []}
                />
            </div>

            <div className="mt-8 flex w-[80%] gap-6 min-h-[55vh]">
                <div
                    ref={horariosRef}
                    className="w-1/2 bg-gray-800 rounded-xl p-4 overflow-y-auto scrollbar-hide"
                    style={{ height: altoHorarios }}
                >
                    <CarruselHorarios
                        horaInicio={inicio}
                        horaFin={fin}
                        onSelectHorarios={setHorariosSeleccionados}
                        horariosOcupados={horariosOcupados}
                        selectedDate={selectedDate ?? undefined}
                    />
                </div>

                <div
                    ref={infoRef}
                    className="w-1/2 bg-gray-700 rounded-xl p-4 flex flex-col justify-between "
                >
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-3xl font-extrabold">
                                {inmueble.name}
                            </h3>
                            <p className="text-2xl font-bold text-amber-400">
                                Total: ${precioTotal}
                            </p>
                        </div>
                        <div className="flex gap-6 text-lg">
                            <div className="flex items-center gap-1">
                                <span className="font-semibold">
                                    Localidad:
                                </span>
                                <span className="font-normal">
                                    {inmueble.ubication}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="font-semibold">Calle:</span>
                                <span className="font-normal">
                                    {inmueble.street}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="font-semibold">Altura:</span>
                                <span className="font-normal">
                                    {inmueble.number}
                                </span>
                            </div>
                        </div>
                        <p className="text-lg font-semibold">
                            Condiciones:{" "}
                            <span className="font-normal">
                                {inmueble.condition}
                            </span>
                        </p>
                        <p className="text-lg font-semibold">
                            Política de cancelación:{" "}
                            <span className="font-normal">
                                {inmueble.cancellation}
                            </span>
                        </p>
                        <p className="text-lg font-semibold">
                            Descripción:{" "}
                            <span className="font-normal">
                                {inmueble.description}
                            </span>
                        </p>
                    </div>

                    {horariosSeleccionados.length > 0 && (
                        <div className="flex justify-between font-bold text-lg text-white mt-4 mb-2">
                            <span>Inicio: {inicioSeleccion}:00 hs</span>
                            {finSeleccion !== null && (
                                <span>Fin: {finSeleccion}:00 hs</span>
                            )}
                        </div>
                    )}

                    <div className="flex flex-col items-center gap-2">
                        <button
                            disabled={sending}
                            onClick={handleEnviar}
                            className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-8 rounded-xl cursor-pointer w-full disabled:opacity-50"
                        >
                            {sending ? "Enviando..." : "Enviar"}
                        </button>
                        {message && (
                            <p
                                className={`text-sm ${
                                    message.includes("exitosamente")
                                        ? "text-green-400"
                                        : "text-red-500"
                                }`}
                            >
                                {message}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
