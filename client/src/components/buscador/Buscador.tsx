import ResultadosDeInmuebles from "@/components/buscador/ResultadosDeInmuebles";
import BarraDeBusqueda from "@/components/buscador/BarraBuscadora";
import FiltrosDropdownUI from "@/components/buscador/DrawDraft";
import { useBusquedaInmuebles } from "@/hooks/useBusquedaInmuebles";
import { useState } from "react";

export default function BuscadorDeInmuebles() {
    const {
        nombre,
        setNombre,
        localidad,
        setLocalidad,
        data,
        loading,
        handleBuscar,
    } = useBusquedaInmuebles();

    const [isFiltrosDropdownOpen, setIsFiltrosDropdownOpen] = useState(false);

    const toggleFiltrosDropdown = () =>
        setIsFiltrosDropdownOpen((prev) => !prev);

    const onBuscarPrincipal = () => {
        handleBuscar(0);
    };

    const onAplicarFiltros = () => {
        toggleFiltrosDropdown();
        handleBuscar(0);
    };
    return (
        <div className="mt-4">
            <div className="relative z-10 max-w-2xl mx-auto">
                <BarraDeBusqueda
                    nombre={nombre}
                    setNombre={setNombre}
                    onAplicarFiltros={onBuscarPrincipal}
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
            </div>
            <ResultadosDeInmuebles
                data={data}
                loading={loading}
                onPageChange={handleBuscar}
            />
        </div>
    );
}
