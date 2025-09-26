import Paginacion from "@/components/Paginacion";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import type { ReservaDTO } from "@/types/types";
import ListaReservas from "./ListaReservas";

interface ReservationsSummaryResponse {
    content: ReservaDTO[];
    totalPages: number;
    number: number;
}
interface ReservasProps {
    state: string;
}

export default function Reservas({ state }: ReservasProps) {
    const [data, setData] = useState<
        ReservationsSummaryResponse | null | undefined
    >();
    const [loading, setLoading] = useState(false);
    const { getId } = useUser();

    const handlePendingReservationsFetch = async (page: number = 0) => {
        setLoading(true);
        try {
            const res = await fetch(
                `http://localhost:8081/mis-reservas/${state}/${getId()}?page=${page}`
            );

            if (!res.ok) {
                if (res.status === 404) {
                    setData(null);
                } else {
                    throw new Error(`Error HTTP: ${res.status}`);
                }
                return;
            }

            const json: ReservationsSummaryResponse = await res.json();
            setData(json);
        } catch {
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handlePendingReservationsFetch(0);
    }, [state]);

    return (
        <div>
            {loading && <p>Cargando...</p>}
            {!loading && data === null && (
                <p className="text-white-500 mt-2">No hay reservas {state}.</p>
            )}
            {!loading && data && data.content.length > 0 && (
                <div className="flex flex-col items-center ">
                    <ListaReservas
                        state={state}
                        reservas={data.content}
                    />
                    <div className="mt-4 bottom-6 sticky">
                        <Paginacion
                            paginaActual={data.number + 1}
                            totalPaginas={data.totalPages}
                            onPageChange={(page) =>
                                handlePendingReservationsFetch(page - 1)
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
