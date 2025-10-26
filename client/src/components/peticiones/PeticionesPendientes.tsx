import ListaDePeticionesPendientes from "@/components/peticiones/listas/ListaDePeticionesPendientes";
import Paginacion from "@/components/Paginacion";
import { useUser } from "@/hooks/useUser";
import type { PendingPetitionDraft } from "@/types/types";
import { useEffect, useState } from "react";

export default function PeticionesPendientes() {
    interface PetitionsSummaryResponse {
        content: PendingPetitionDraft[];
        totalPages: number;
        number: number;
    }

    const [data, setData] = useState<
        PetitionsSummaryResponse | null | undefined
    >();
    const [loading, setLoading] = useState(false);
    const { getId } = useUser();
    const apiUrl = import.meta.env.VITE_API_URL;
    const handlePendingPetitionsFetch = async (page: number = 0) => {
        setLoading(true);
        try {
            const res = await fetch(
                `${apiUrl}/peticion/owner/pendiente/${getId()}?page=${page}`
            );

            if (!res.ok) {
                if (res.status === 404) {
                    setData(null);
                } else {
                    throw new Error(`Error HTTP: ${res.status}`);
                }
                return;
            }

            const json: PetitionsSummaryResponse = await res.json();
            setData(json);
        } catch {
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handlePendingPetitionsFetch(0);
    }, []);

    return (
        <div>
            {loading && <p>Cargando...</p>}
            {!loading && data === null && (
                <p className="text-white-500 mt-2">No hay peticiones.</p>
            )}
            {!loading && data && data.content.length > 0 && (
                <div className="flex flex-col items-center ">
                    <ListaDePeticionesPendientes
                        resultados={data.content}
                    ></ListaDePeticionesPendientes>
                    <div className="mt-4 bottom-6 sticky">
                        <Paginacion
                            paginaActual={data.number + 1}
                            totalPaginas={data.totalPages}
                            onPageChange={(page) =>
                                handlePendingPetitionsFetch(page - 1)
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
