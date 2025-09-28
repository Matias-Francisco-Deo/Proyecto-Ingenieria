import ListaDeInmuebles from "@/components/buscador/ListaDeInmuebles";
import Paginacion from "@/components/Paginacion";
import type { Inmueble } from "@/types/types";

interface InmueblesSummaryResponse {
    content: Inmueble[];
    totalPages: number;
    number: number;
}

interface ResultadosProps {
    data: InmueblesSummaryResponse | undefined | null;
    loading: boolean;
    onPageChange: (page: number) => void;
}

export default function ResultadosDeInmuebles({
    data,
    loading,
    onPageChange,
}: ResultadosProps) {
    if (loading) {
        return <p className="mt-4 text-center text-lg">Cargando... ⏳</p>;
    }
    if (data === null) {
        return <p className="text-red-500 mt-4 p-4 ">Sin coincidencias</p>;
    }

    if (!data || data.content.length === 0) {
        return <p className="mt-4 text-gray-500 text-center"></p>;
    }

    return (
        <>
            <ListaDeInmuebles resultados={data.content} />
            {data.totalPages > 1 && (
                <div className="mt-4 flex justify-center">
                    <Paginacion
                        paginaActual={data.number + 1}
                        totalPaginas={data.totalPages}
                        onPageChange={(nro) => onPageChange(nro - 1)}
                    />
                </div>
            )}
        </>
    );
}
