import ListaDePeticionesPendientes from "@/components/peticiones/ListaDePeticionesPendientes";
import Paginacion from "@/components/Paginacion";
import SectionSelectButton from "@/components/SectionSelectButton";
import { useUser } from "@/hooks/useUser";
import type { PendingPetitionDraft, PeticionPendiente } from "@/types/types";
import { useEffect, useState } from "react";
// import { useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import ListaDePeticionesVigentes from "@/components/peticiones/ListaDePeticionesVigentes";
import ListaDePeticionesDeprecadas from "@/components/peticiones/ListaDePeticionesDeprecadas";
import ListaDePeticionesCanceladasRechazadas from "@/components/peticiones/ListaDePeticionesCanceladasRechazadas";

interface PetitionsSummaryResponse {
  content: PeticionPendiente[];
  totalPages: number;
  number: number;
}

export default function PetitionsPage() {
  const [data, setData] = useState<
    PetitionsSummaryResponse | null | undefined
  >();
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { getId } = useUser();
  const [activeSection, setActiveSection] = useState("Pendientes");

  // LO NUEVO
  const [match, params] = useRoute("/peticiones/:estado");
  const estado = match ? params.estado : "pendientes";

  useEffect(() => {
    if (estado === "pendientes") handlePendingPetitionsFetch(0);
  }, [estado]);

  const handlePendingPetitionsFetch = async (page: number = 0) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8081/peticion/owner/${getId()}?page=${page}`
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

  const getListForActiveSection = (content: PendingPetitionDraft[]) => {
    switch (activeSection) {
      case "Pendientes":
        return <ListaDePeticionesPendientes resultados={content} />;
      case "Vigentes":
        return <ListaDePeticionesVigentes resultados={content} />;
      case "Deprecadas":
        return <ListaDePeticionesDeprecadas resultados={content} />;
      case "Canceladas/Rechazadas":
        return <ListaDePeticionesCanceladasRechazadas resultados={content} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center ">
      <div className="flex flex-col gap-4 p-4 ">
        <div className="sticky top-10 flex justify-center gap-10 px-10 py-8 bg-gray-900 text-white rounded-xl w-full">
          <SectionSelectButton
            sectionName="Pendientes"
            activeSection={activeSection}
            setActive={setActiveSection}
            onClick={() => setLocation("/mis-peticiones/pendientes")}
          ></SectionSelectButton>
          <SectionSelectButton
            sectionName="Vigentes"
            activeSection={activeSection}
            setActive={setActiveSection}
            onClick={() => setLocation("/mis-peticiones/vigentes")}
          ></SectionSelectButton>
          <SectionSelectButton
            sectionName="Deprecadas"
            activeSection={activeSection}
            setActive={setActiveSection}
            onClick={() => setLocation("/mis-peticiones/deprecadas")}
          ></SectionSelectButton>
          <SectionSelectButton
            sectionName="Canceladas/Rechazadas"
            activeSection={activeSection}
            setActive={setActiveSection}
            onClick={() => setLocation("/mis-peticiones/canceladas-rechazadas")}
          ></SectionSelectButton>
        </div>
        {loading && <p>Cargando...</p>}
        {!loading && data === null && (
          <p className="text-white-500 mt-2">No hay peticiones.</p>
        )}
        {!loading && data && data.content.length > 0 && (
          <div className="flex flex-col items-center ">
            {getListForActiveSection(data.content)}
            <div className="mt-4 bottom-6 sticky">
              <Paginacion
                paginaActual={data.number + 1}
                totalPaginas={data.totalPages}
                onPageChange={(page) => handlePendingPetitionsFetch(page - 1)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
