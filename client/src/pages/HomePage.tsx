import BuscadorDeInmuebles from "@/components/buscador/Buscador";

import { useBusquedaInmuebles } from "@/hooks/useBusquedaInmuebles";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function HomePage() {
  const busquedaProps = useBusquedaInmuebles();
  const { hasResults } = busquedaProps;

  useEffect(() => {
    toast.warn("NO");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-white p-4">
      {!hasResults && (
        <h1 className="text-6xl font-light text-white w-1/2 text-center">
          RESERVO
        </h1>
      )}

      <div className="w-full max-w-2xl">
        <BuscadorDeInmuebles {...busquedaProps} />
      </div>
    </div>
  );
}
