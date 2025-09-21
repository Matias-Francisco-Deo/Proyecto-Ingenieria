import ListaDePeticionesPendientes from "@/components/peticiones/ListaDePeticionesPendientes";
import Paginacion from "@/components/Paginacion";
import SectionSelectButton from "@/components/SectionSelectButton";
import { useUser } from "@/hooks/useUser";
import type { PendingPetitionDraft } from "@/types/types";
import { useEffect, useState } from "react";
// import { useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import ListaDePeticionesVigentes from "@/components/peticiones/ListaDePeticionesVigentes";
import ListaDePeticionesDeprecadas from "@/components/peticiones/ListaDePeticionesDeprecadas";
import ListaDePeticionesCanceladasRechazadas from "@/components/peticiones/ListaDePeticionesCanceladasRechazadas";
import PeticionesPendientes from "@/components/peticiones/PeticionesPendientes";
import PeticionesCanceladas from "@/components/peticiones/PeticionesCanceladas";
import PeticionesVigentes from "@/components/peticiones/PeticionesVigentes";

interface PetitionsSummaryResponse {
  content: PendingPetitionDraft[];
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
  const [activeSection, setActiveSection] = useState("");

  const [match, params] = useRoute("/mis-peticiones/:estado");
  const estadoURL = match ? params.estado : "pendientes";

  useEffect(() => {
    switch (estadoURL) {
      case "pendientes":
        setActiveSection("Pendientes");

        break;
      case "vigentes":
        setActiveSection("Vigentes");
        break;
      case "canceladas-rechazadas":
        setActiveSection("Canceladas/Rechazadas");

        break;
    }
  }, [estadoURL]);

  const getListForActiveSection = () => {
    switch (activeSection) {
      case "Pendientes":
        return <PeticionesPendientes></PeticionesPendientes>;
      case "Vigentes":
        return <PeticionesVigentes></PeticionesVigentes>;
      case "Deprecadas":
        return <div>No hay peticiones</div>;
      case "Canceladas/Rechazadas":
        return <PeticionesCanceladas></PeticionesCanceladas>;
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
        {getListForActiveSection()}
      </div>
    </div>
  );
}
