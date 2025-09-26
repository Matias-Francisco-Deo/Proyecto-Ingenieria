import SectionSelectButton from "@/components/SectionSelectButton";
import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import Reservas from "@/components/reservas/Reservas";

export default function ReservasPage() {
    const [, setLocation] = useLocation();
    const [activeSection, setActiveSection] = useState("");

    const [match, params] = useRoute("/mis-reservas/:estado");
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
                return <Reservas state="pendientes" />;
            case "Vigentes":
                return <Reservas state="vigentes" />;
            case "Deprecadas":
                return <div>No hay reservas</div>;
            case "Canceladas/Rechazadas":
                return <Reservas state="canceladas-rechazadas" />;
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
                        onClick={() => setLocation("/reservas/pendientes")}
                    />
                    <SectionSelectButton
                        sectionName="Vigentes"
                        activeSection={activeSection}
                        setActive={setActiveSection}
                        onClick={() => setLocation("/reservas/vigentes")}
                    />
                    <SectionSelectButton
                        sectionName="Deprecadas"
                        activeSection={activeSection}
                        setActive={setActiveSection}
                        onClick={() => setLocation("/reservas/deprecadas")}
                    />
                    <SectionSelectButton
                        sectionName="Canceladas/Rechazadas"
                        activeSection={activeSection}
                        setActive={setActiveSection}
                        onClick={() =>
                            setLocation("/reservas/canceladas-rechazadas")
                        }
                    />
                </div>
                {getListForActiveSection()}
            </div>
        </div>
    );
}
