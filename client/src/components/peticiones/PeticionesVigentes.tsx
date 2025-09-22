import Paginacion from "@/components/Paginacion";
import { useUser } from "@/hooks/useUser";
import type { PendingPetitionDraft } from "@/types/types";
import { useEffect, useState } from "react";
import ListaDePeticionesVigentes from "@/components/peticiones/ListaDePeticionesVigentes";

export default function PeticionesVigentes() {
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

  const handleApprovePetitionsFetch = async (page: number = 0) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8081/peticion/owner/vigente/${getId()}?page=${page}`
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
    handleApprovePetitionsFetch(0);
  }, []);

  return (
    <div>
      {loading && <p>Cargando...</p>}
      {!loading && data === null && (
        <p className="text-white-500 mt-2">No hay peticiones.</p>
      )}
      {!loading && data && data.content.length > 0 && (
        <div className="flex flex-col items-center ">
          <ListaDePeticionesVigentes
            resultados={data.content}
          ></ListaDePeticionesVigentes>
          <div className="mt-4 bottom-6 sticky">
            <Paginacion
              paginaActual={data.number + 1}
              totalPaginas={data.totalPages}
              onPageChange={(page) => handleApprovePetitionsFetch(page - 1)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
