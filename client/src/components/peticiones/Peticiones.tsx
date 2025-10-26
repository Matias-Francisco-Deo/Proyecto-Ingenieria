import Paginacion from "@/components/Paginacion";
import { useUser } from "@/hooks/useUser";
import { usePagedFetch } from "@/hooks/usePagedFetch";
import type {
    PendingPetitionDraft,
    CancelledRejectedPetitionDraft,
} from "@/types/types";
import ListaDePeticionesPendientes from "@/components/peticiones/listas/ListaDePeticionesPendientes";
import ListaDePeticionesVigentes from "@/components/peticiones/listas/ListaDePeticionesVigentes";
import ListaDePeticionesCanceladasRechazadas from "@/components/peticiones/listas/ListaDePeticionesCanceladasRechazadas";

interface PeticionesProps {
    state: "pendiente" | "aceptadas" | "canceladas";
}

export default function Peticiones({ state }: PeticionesProps) {
    const { getId } = useUser();

    const { data, loading, fetchPage } = usePagedFetch<
        PendingPetitionDraft | CancelledRejectedPetitionDraft
    >({
        endpoint: `/peticion/owner/${state}/${getId()}`,
        deps: [state, getId()],
    });

    const renderLista = () => {
        if (!data || data.content.length === 0) return null;

        switch (state) {
            case "pendiente":
                return (
                    <ListaDePeticionesPendientes
                        resultados={data.content as PendingPetitionDraft[]}
                    />
                );
            case "aceptadas":
                return (
                    <ListaDePeticionesVigentes
                        resultados={data.content as PendingPetitionDraft[]}
                    />
                );
            case "canceladas":
                return (
                    <ListaDePeticionesCanceladasRechazadas
                        resultados={
                            data.content as CancelledRejectedPetitionDraft[]
                        }
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div>
            {loading && <p>Cargando...</p>}
            {!loading && data === null && (
                <p className="text-white-500 mt-2">
                    No hay peticiones {state}.
                </p>
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
