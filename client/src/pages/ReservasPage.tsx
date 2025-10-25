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
            name: "Vigentes",
            route: "vigentes",
            component: <Reservas state="vigentes" />,
        },
        {
            name: "Deprecadas",
            route: "deprecadas",
            component: <div>No hay reservas</div>,
        },
        {
            name: "Canceladas/Rechazadas",
            route: "canceladas-rechazadas",
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
