import StatusPage from "@/components/statusPages/StatusPage";
import Reservas from "@/components/reservas/Reservas";

export default function ReservasPage() {
    const sections = [
        {
            name: "Pendientes",
            route: "pendientes",
            component: <Reservas state="pendientes" />,
        },
        {
            name: "Aceptadas",
            route: "aceptadas",
            component: <Reservas state="aceptadas" />,
        },
        {
            name: "Deprecadas",
            route: "deprecadas",
            component: <div>No hay reservas deprecadas</div>,
        },
        {
            name: "Canceladas",
            route: "canceladas",
            component: <Reservas state="canceladas" />,
        },
    ];

    return (
        <StatusPage
            basePath="/reservas"
            sections={sections}
        />
    );
}
