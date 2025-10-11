import { Link } from "wouter";
import type { ReservaDTO } from "@/types/types";

interface ListaReservasProps {
    state: string;
    reservas: ReservaDTO[];
    detalleLink?: (reserva: ReservaDTO) => string;
}

export default function ListaReservas({
    state,
    reservas,
    detalleLink = (reserva) => `/reserva/${state}?id=${reserva.id}`,
}: ListaReservasProps) {
    return (
        <ul className="mt-4 w-3/4 bg-gray-900 rounded-2xl p-10 min-w-max">
            <h1 className="text-3xl mb-4">Reservas {state}</h1>
            {reservas.map((reserva) => (
                <Link
                    key={reserva.id}
                    href={detalleLink(reserva)}
                >
                    <li className="rounded-2xl bg-gray-700 mt-2 pl-2 p-2 flex flex-row justify-between min-w-80">
                        <div className="p-4 bg-gray ">
                            <p>
                                <strong>Dueño:</strong> {reserva.nameOwner} (
                                {reserva.email})
                            </p>
                            <p>
                                <strong>Fecha del evento:</strong>{" "}
                                {reserva.dateEvento}
                            </p>
                            <p>
                                <strong>Horario:</strong> {reserva.horaInicio} -{" "}
                                {reserva.horaFin}
                            </p>
                            <h2 className="text-xl font-bold ">
                                Inmueble: {reserva.nameInmueble}
                            </h2>
                        </div>

                        <div className="px-20 bg-gray flex flex-col items-start justify-center">
                            <p>
                                <strong>Emitida: </strong>
                                {reserva.dateEmision}
                            </p>

                            
                            {reserva.pagado !== undefined && (
                                <p className="text-orange-400 text-lg font-bold mt-1">
                                    {reserva.pagado ? "Pagado" : "No pagado"}
                                </p>
                            )}
                        </div>
                    </li>
                </Link>
            ))}
        </ul>
    );
}