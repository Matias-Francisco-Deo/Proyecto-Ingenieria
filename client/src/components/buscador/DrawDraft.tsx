interface FiltrosDropdownUIProps {
    localidad: string;
    setLocalidad: (localidad: string) => void;
    loading: boolean;
    isVisible: boolean;
    onAplicarFiltros: () => void;
}

export default function FiltrosDropdownUI({
    localidad,
    setLocalidad,
    loading,
    isVisible,
    onAplicarFiltros,
}: FiltrosDropdownUIProps) {
    return (
        <div
            id="filter-dropdown"
            className={`
                bg-neutral-900 rounded-2xl shadow-lg 
                transition-all duration-300 ease-in-out
                overflow-hidden
                ${
                    isVisible
                        ? "max-h-96 opacity-100 mt-4"
                        : "max-h-0 opacity-0 mt-0"
                } 
            `}
        >
            <div className="p-4">
                <div className="mb-6">
                    <label className="flex flex-col text-gray-300 font-semibold">
                        <input
                            type="text"
                            placeholder="Buscar por localidad..."
                            value={localidad}
                            onChange={(e) => setLocalidad(e.target.value)}
                            className="w-full p-2 rounded-xl bg-neutral-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                    </label>
                </div>

                <div className="flex justify-end mt-4">
                    <button
                        onClick={onAplicarFiltros}
                        className="px-6 py-3 bg-amber-500 text-white font-bold rounded-xl cursor-pointer hover:bg-amber-600 transition duration-150 shadow-lg disabled:opacity-50"
                        disabled={loading}
                    >
                        Aplicar Filtros y Buscar
                    </button>
                </div>
            </div>
        </div>
    );
}
