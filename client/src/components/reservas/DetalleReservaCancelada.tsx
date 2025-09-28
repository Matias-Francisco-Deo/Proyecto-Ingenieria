import type { ReservaCanceladasDTO } from "@/types/types";

interface DetalleReservaCanceladaProps {
    reserva: ReservaCanceladasDTO;
}

export default function DetalleReservaCancelada({
    reserva,
}: DetalleReservaCanceladaProps) {
    return (
        // Contenido desplegable extraído
        <div className="m-3 space-y-2 bg-gray-800 rounded-lg p-3">
            <div className="flex flex-wrap justify-between text-sm text-gray-200 gap-2">
                <span>
                    Ubicación: {reserva.inmuebleDTO.ubication} -{" "}
                    {reserva.inmuebleDTO.calle} Nº
                    {reserva.inmuebleDTO.altura}
                </span>
                <span>Precio: ${reserva.priceToPay}</span>
                <span>Fecha: {reserva.dateEvento}</span>
                <span>
                    Horario: {reserva.horaInicio} - {reserva.horaFin}
                </span>
            </div>
            {/* El campo en ReservaCanceladasDTO es 'motivoCancelacion' */}
            {reserva?.motivoCancelacion ? (
                <div>
                    <span className="font-bold">
                        {"Motivo de cancelación: "}
                    </span>
                    <span>{reserva.motivoCancelacion}</span>
                </div>
            ) : (
                <div>No se especifican motivos de cancelación.</div>
            )}
        </div>
    );
}
