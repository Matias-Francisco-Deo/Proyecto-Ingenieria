import { useState } from "react";
import type { ReservaCanceladasDTO } from "@/types/types";
import DetalleReservaCancelada from "./DetalleReservaCancelada";

interface ListaReservasCanceladasProps {
    state: string;
    reservas: ReservaCanceladasDTO[];
    detalleLink?: (reserva: ReservaCanceladasDTO) => string;
}

export default function ListaReservasCanceladas({
    state,
    reservas,
}: ListaReservasCanceladasProps) {
    const [reservaExpandida, setReservaExpandida] = useState<number | null>(
        null
    );

    const toggleExpandir = (id: number) => {
        setReservaExpandida(reservaExpandida === id ? null : id);
    };

    return (
        <ul className="mt-4 w-full md:w-3/4 bg-gray-900 rounded-2xl p-4 md:p-10 mx-auto">
            <h1 className="text-3xl mb-4">Reservas {state}</h1>

            {reservas.length === 0 && (
                <p className="text-gray-400">
                    No hay reservas {state} disponibles.
                </p>
            )}

            {reservas.map((reserva) => (
                <li
                    key={reserva.id}
                    className="rounded-2xl bg-gray-700 mt-4 overflow-hidden shadow-lg"
                >
                    <div
                        className={`p-4 cursor-pointer transition-colors ${
                            reservaExpandida !== reserva.id
                                ? "hover:bg-gray-600"
                                : "bg-gray-600"
                        }`}
                        onClick={() => toggleExpandir(reserva.id)}
                    >
                        <div className="flex justify-between items-center text-sm text-gray-300 mb-1">
                            <p>
                                <strong>Dueño:</strong>{" "}
                                {reserva.inmuebleDTO.owner.nameOwner} (
                                {reserva.inmuebleDTO.owner.email})
                            </p>
                            <p>
                                <strong>Emitida:</strong> {reserva.dateEmision}
                            </p>
                        </div>

                        <h2 className="text-xl font-bold text-white">
                            Inmueble: {reserva.inmuebleDTO.nameInmueble}
                        </h2>
                    </div>
                    {reservaExpandida === reserva.id && (
                        <DetalleReservaCancelada reserva={reserva} />
                    )}
                </li>
            ))}
        </ul>
    );
}
