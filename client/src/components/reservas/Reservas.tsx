import Paginacion from "@/components/Paginacion";
import ListaReservas from "./ListaReservas";
import ListaReservasCanceladas from "./ListaReservasCanceladas";
import { useUser } from "@/hooks/useUser";
import { usePagedFetch } from "@/hooks/usePagedFetch";
import type { ReservaDTO, ReservaCanceladasDTO } from "@/types/types";

interface ReservasProps {
    state: "pendientes" | "aceptadas" | "deprecadas" | "canceladas";
}

export default function Reservas({ state }: ReservasProps) {
    const { getId } = useUser();

    const { data, loading, fetchPage } = usePagedFetch<
        ReservaDTO | ReservaCanceladasDTO
    >({
        endpoint: `/mis-reservas/${state}/${getId()}`,
        deps: [state, getId()],
    });

    const renderLista = () => {
        if (!data || data.content.length === 0) return null;
        return state === "canceladas" ? (
            <ListaReservasCanceladas
                state={state}
                reservas={data.content as ReservaCanceladasDTO[]}
            />
        ) : (
            <ListaReservas
                state={state}
                reservas={data.content as ReservaDTO[]}
            />
        );
    };

    return (
        <div>
            {loading && <p>Cargando...</p>}
            {!loading && data === null && (
                <p className="text-white-500 mt-2">No hay reservas {state}.</p>
            )}
            {!loading && data && data.content.length > 0 && (
                <div className="flex flex-col items-center">
                    {renderLista()}
                    <div className="mt-4 bottom-6 sticky">
                        <Paginacion
                            paginaActual={data.number + 1}
                            totalPaginas={data.totalPages}
                            onPageChange={(page) => fetchPage(page - 1)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
