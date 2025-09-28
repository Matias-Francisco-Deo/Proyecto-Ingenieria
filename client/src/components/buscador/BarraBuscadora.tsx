interface BarraDeBusquedaProps {
    nombre: string;
    setNombre: (nombre: string) => void;
    handleBuscar: (page?: number) => Promise<void>;
    loading: boolean;
    toggleFiltrosDropdown: () => void;
}

export default function BarraDeBusqueda({
    nombre,
    setNombre,
    loading,
    handleBuscar,
    toggleFiltrosDropdown,
}: BarraDeBusquedaProps) {
    // Se elimina handleIconoClick y se llama a toggleFiltrosDropdown directamente en el botón.

    return (
        <div className="p-4 max-w-2xl mx-auto bg-neutral-900 flex rounded-2xl">
            <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Buscar propiedad..."
                className="p-3 flex-1 bg-neutral-800 text-gray-300 rounded-2xl focus:outline-none"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleBuscar(0);
                    }
                }}
            />

            {/* Botón de Buscar: Visible en escritorio */}
            <button
                onClick={() => handleBuscar(0)}
                className="ml-2 p-3 bg-amber-500 text-white rounded-2xl cursor-pointer hover:bg-amber-600 transition duration-150 shadow-lg disabled:opacity-50 hidden sm:block"
                disabled={loading}
            >
                {loading ? "Buscando..." : "Buscar"}
            </button>

            {/* Botón de Filtros: Usa el icono de filtros y llama a toggleFiltrosDropdown */}
            <button
                onClick={toggleFiltrosDropdown} // Llamada directa a la función
                className="ml-2 p-3 bg-amber-500 text-white rounded-2xl flex items-center cursor-pointer justify-center hover:bg-amber-600 transition duration-150 shadow-lg"
                disabled={loading}
            >
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
    );
}
