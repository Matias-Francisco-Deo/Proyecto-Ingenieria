import Paginacion from "@/components/Paginacion";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import type {
    ReservaDTO,
    ReservaCanceladasDTO,
    ReservationsSummaryResponse,
} from "@/types/types";
import ListaReservas from "./ListaReservas";
import ListaReservasCanceladas from "./ListaReservasCanceladas";

interface ReservasProps {
    state: string;
}

export default function Reservas({ state }: ReservasProps) {
    const [dataNormal, setDataNormal] =
        useState<ReservationsSummaryResponse<ReservaDTO> | null>(null);
    const [dataCanceladas, setDataCanceladas] =
        useState<ReservationsSummaryResponse<ReservaCanceladasDTO> | null>(
            null
        );
    const [loading, setLoading] = useState(false);
    const { getId } = useUser();

    const handleReservationsFetch = async (page: number = 0) => {
        setLoading(true);
        try {
            const res = await fetch(
                `http://localhost:8081/mis-reservas/${state}/${getId()}?page=${page}`
            );

            if (!res.ok) {
                if (res.status === 404) {
                    setDataNormal(null);
                    setDataCanceladas(null);
                } else {
                    throw new Error(`Error HTTP: ${res.status}`);
                }
                return;
            }
            const json = await res.json();

            if (state === "canceladas-rechazadas") {
                setDataCanceladas(json);
                setDataNormal(null);
            } else {
                setDataNormal(json);
                setDataCanceladas(null);
            }
        } catch {
            setDataNormal(null);
            setDataCanceladas(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleReservationsFetch(0);
    }, [state]);

    const renderLista = () => {
        if (state === "canceladas-rechazadas") {
            if (!dataCanceladas || dataCanceladas.content.length === 0)
                return null;
            return (
                <ListaReservasCanceladas
                    state={state}
                    reservas={dataCanceladas.content}
                />
            );
        } else {
            if (!dataNormal || dataNormal.content.length === 0) return null;
            return (
                <ListaReservas
                    state={state}
                    reservas={dataNormal.content}
                />
            );
        }
    };

    const getCurrentData = () => {
        return state === "canceladas-rechazadas" ? dataCanceladas : dataNormal;
    };

    const currentData = getCurrentData();

    return (
        <div>
            {loading && <p>Cargando...</p>}
            {!loading && currentData === null && (
                <p className="text-white-500 mt-2">No hay reservas {state}.</p>
            )}
            {!loading && currentData && currentData.content.length > 0 && (
                <div className="flex flex-col items-center">
                    {renderLista()}
                    <div className="mt-4 bottom-6 sticky">
                        <Paginacion
                            paginaActual={currentData.number + 1}
                            totalPaginas={currentData.totalPages}
                            onPageChange={(page) =>
                                handleReservationsFetch(page - 1)
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
