import ListaDeMisPropiedades from "@/components/ListaDeMisPropiedades";
import Paginacion from "@/components/Paginacion";
import { useUser } from "@/hooks/useUser";
import type { Inmueble } from "@/types/types";
import { useEffect, useState } from "react";

interface InmueblesSummaryResponse {
  content: Inmueble[];
  totalPages: number;
  number: number;
}

export default function ListaDePublicaciones() {
  const [data, setData] = useState<
    InmueblesSummaryResponse | null | undefined
  >();
  const [loading, setLoading] = useState(false);
  const { getId } = useUser();

  const handleListProperties = async (page: number = 0) => {
    console.log(getId());
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8081/property/owner/${getId()}?page=${page}`
      );

      if (!res.ok) {
        if (res.status === 404) {
          setData(null);
        } else {
          throw new Error(`Error HTTP: ${res.status}`);
        }
        return;
      }

      const json: InmueblesSummaryResponse = await res.json();
      console.log(json.content[0]);
      setData(json);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleListProperties(0);
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <div className="w-2/3">
          {loading && <p>Cargando...</p>}
          {!loading && data === null && (
            <p className="text-white-500 mt-2">No hay propiedades.</p>
          )}
          {!loading && data && data.content.length > 0 && (
            <div>
              <ListaDeMisPropiedades resultados={data.content} />
              {data.totalPages > 1 && (
                <div className="mt-4 flex justify-center">
                  <Paginacion
                    paginaActual={data.number + 1}
                    totalPaginas={data.totalPages}
                    onPageChange={(page) => handleListProperties(page - 1)}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
