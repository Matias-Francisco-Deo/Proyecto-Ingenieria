import ResultadosDeInmuebles from "@/components/buscador/ResultadosDeInmuebles";
import BarraDeBusqueda from "@/components/buscador/BarraBuscadora";
import FiltrosDropdownUI from "@/components/buscador/DrawDraft";
import { useBusquedaInmuebles } from "@/hooks/useBusquedaInmuebles";
import { useState } from "react";

export default function BuscadorDeInmuebles() {
    const { nombre, setNombre, data, loading, handleBuscar } =
        useBusquedaInmuebles();
    const [isFiltrosDropdownOpen, setIsFiltrosDropdownOpen] = useState(false);
    const [localidad, setLocalidad] = useState("");

    const toggleFiltrosDropdown = () =>
        setIsFiltrosDropdownOpen((prev) => !prev);
    const onAplicarFiltros = () => {
        toggleFiltrosDropdown();
        handleBuscar(0);
    };

    return (
        <div className="mt-4 relative">
            <BarraDeBusqueda
                nombre={nombre}
                setNombre={setNombre}
                handleBuscar={handleBuscar}
                loading={loading}
                toggleFiltrosDropdown={toggleFiltrosDropdown}
            />
            <FiltrosDropdownUI
                localidad={localidad}
                setLocalidad={setLocalidad}
                loading={loading}
                isVisible={isFiltrosDropdownOpen}
                onAplicarFiltros={onAplicarFiltros}
            />
            <ResultadosDeInmuebles
                data={data}
                loading={loading}
                onPageChange={handleBuscar}
            />
        </div>
    );
}
