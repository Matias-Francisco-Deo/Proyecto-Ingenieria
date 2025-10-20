import ResultadosDeInmuebles from "@/components/buscador/ResultadosDeInmuebles";
import BarraDeBusqueda from "@/components/buscador/BarraBuscadora";
import FiltrosDropdownUI from "@/components/buscador/FiltrosDropdownUI";

import type { UseBusquedaInmueblesResult } from "@/hooks/useBusquedaInmuebles";
import { useState } from "react";
import { useToast } from "@/hooks/useToast";

type BuscadorDeInmueblesProps = UseBusquedaInmueblesResult;

export default function BuscadorDeInmuebles(props: BuscadorDeInmueblesProps) {
  const {
    nombre,
    setNombre,
    localidad,
    setLocalidad,
    setRangoPrecio,
    setRangoHorario,
    capacity,
    setCapacity,
    data,
    loading,
    handleBuscar,
  } = props;

  const [isFiltrosDropdownOpen, setIsFiltrosDropdownOpen] = useState(false);
  const { toastError } = useToast();

  const toggleFiltrosDropdown = () => setIsFiltrosDropdownOpen((prev) => !prev);

  const onBuscarPrincipal = () => {
    handleBuscar(0);
  };

  const onAplicarFiltros = () => {
    if (capacity == 0) {
      toastError("La capacidad mínima es 1.");
      return;
    }
    toggleFiltrosDropdown();
    handleBuscar(0);
  };

  return (
    <div className="mt-4">
      <div className="relative z-10 max-w-md mx-auto">
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
          setRangoPrecio={setRangoPrecio}
          setRangoHorario={setRangoHorario}
          setCapacity={setCapacity}
          loading={loading}
          isVisible={isFiltrosDropdownOpen}
          onAplicarFiltros={onAplicarFiltros}
        />
      </div>
      <div className="w-full max-w-4xl mx-auto mt-8">
        <ResultadosDeInmuebles
          data={data}
          loading={loading}
          onPageChange={handleBuscar}
        />
      </div>
    </div>
  );
}
