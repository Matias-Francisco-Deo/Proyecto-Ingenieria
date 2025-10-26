import StatusPage from "@/components/statusPages/StatusPage";
import Peticiones from "@/components/peticiones/Peticiones";

export default function PetitionsPage() {
    const sections = [
        {
            name: "Pendientes",
            route: "pendientes",
            component: <Peticiones state="pendiente" />,
        },
        {
            name: "Aceptadas",
            route: "aceptadas",
            component: <Peticiones state="aceptadas" />,
        },
        {
            name: "Deprecadas",
            route: "deprecadas",
            component: <div>No hay peticiones deprecadas</div>,
        },
        {
            name: "Canceladas",
            route: "canceladas-rechazadas",
            component: <Peticiones state="canceladas" />,
        },
    ];

    return (
        <StatusPage
            basePath="/mis-peticiones"
            sections={sections}
        />
    );
}
