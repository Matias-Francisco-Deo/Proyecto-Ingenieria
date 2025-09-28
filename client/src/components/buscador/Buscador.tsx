import ResultadosDeInmuebles from "@/components/buscador/ResultadosDeInmuebles";
// Importamos el hook que contiene toda la lógica
import { useBusquedaInmuebles } from "@/hooks/useBusquedaInmuebles";

export default function BuscadorDeInmuebles() {
    const { nombre, setNombre, data, loading, handleBuscar } =
        useBusquedaInmuebles();

    return (
        <div className="w-full">
            <div className="p-4 w-full bg-neutral-900 flex rounded-2xl">
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Buscar propiedad..." // Estilo Input: Fondo gris oscuro, texto/placeholder en gris más claro, bordes redondeados completos
                    className="p-3 flex-1 bg-neutral-800 text-gray-300 rounded-2xl focus:outline-none"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleBuscar(0);
                        }
                    }}
                />

                <button
                    onClick={() => handleBuscar(0)}
                    className="ml-2 p-3 bg-amber-500 text-white rounded-2xl cursor-pointer"
                    disabled={loading}
                >
                    {loading ? "Buscando..." : "Buscar"}
                </button>
                <button className="ml-2 p-3 bg-amber-500 text-white rounded-2xl flex items-center cursor-pointer justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                        />
                    </svg>
                </button>
            </div>

            <ResultadosDeInmuebles
                data={data}
                loading={loading}
                onPageChange={handleBuscar}
            />
        </div>
    );
}
