import ListaDePeticionesPendientes from "@/components/ListaDePeticionesPendientes";
import Paginacion from "@/components/Paginacion";
import SectionSelectButton from "@/components/SectionSelectButton";
import type { PeticionPendiente } from "@/types/types";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "wouter";

interface PetitionsSummaryResponse {
  content: PeticionPendiente[];
  totalPages: number;
  page: number;
}

export default function PetitionsPage() {
  const [data, setData] = useState<
    PetitionsSummaryResponse | null | undefined
  >();
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useLocation();
  const [activeSection, setActiveSection] = useState("Pendientes");

  const handlePendingPetitionsFetch = async (page: number) => {
    setLocation("/peticiones?q=pendientes");
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8081/peticion/owner/1`); // TODO revisar el hardcodeo uwu
      if (!res.ok) {
        if (res.status === 404) {
          setData(null);
        } else {
          throw new Error(`Error HTTP: ${res.status}`);
        }
        return;
      }
      const json: PeticionPendiente[] = await res.json();
      setData({
        content: json,
        totalPages: 5,
        page,
      });
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
    <div className="flex justify-center ">
      <div className="flex flex-col gap-4 p-4 ">
        <div className="sticky top-10 flex justify-center gap-10 px-10 py-8 bg-gray-900 text-white rounded-xl w-full">
          <SectionSelectButton
            sectionName="Pendientes"
            activeSection={activeSection}
            setActive={setActiveSection}
            onClick={() => {
              handlePendingPetitionsFetch(0);
            }}
          ></SectionSelectButton>
          <SectionSelectButton
            sectionName="Vigentes"
            activeSection={activeSection}
            setActive={setActiveSection}
            onClick={() => {}}
          ></SectionSelectButton>
          <SectionSelectButton
            sectionName="Deprecadas"
            activeSection={activeSection}
            setActive={setActiveSection}
            onClick={() => {}}
          ></SectionSelectButton>
          <SectionSelectButton
            sectionName="Canceladas/Rechazadas"
            activeSection={activeSection}
            setActive={setActiveSection}
            onClick={() => {}}
          ></SectionSelectButton>
        </div>

        {loading && <p>Cargando...</p>}
        {!loading && data === null && (
          <p className="text-white-500 mt-2">No hay peticiones.</p>
        )}
        {!loading && data && data.content.length > 0 && (
          <div className="flex flex-col items-center ">
            <ListaDePeticionesPendientes resultados={data.content} />
            <div className="mt-4 bottom-6 sticky">
              <Paginacion
                paginaActual={data.page + 1}
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
