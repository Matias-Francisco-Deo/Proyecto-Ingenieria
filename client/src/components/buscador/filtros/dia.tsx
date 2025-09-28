import React from "react";

interface DaySelectorUIProps {
    dias: string[];
    diasSeleccionados: string[];
    toggleDia: (dia: string) => void;
}

const DaySelectorUI: React.FC<DaySelectorUIProps> = ({
    dias,
    diasSeleccionados,
    toggleDia,
}) => (
    <div className="mb-6">
        <p className="text-gray-300 font-semibold mb-3">Días de la Semana:</p>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {dias.map((dia) => (
                <span
                    key={dia}
                    onClick={() => toggleDia(dia)}
                    className={`p-2 text-center rounded-xl cursor-pointer text-sm font-medium transition duration-150 select-none ${
                        diasSeleccionados.includes(dia)
                            ? "bg-amber-500 text-white shadow-md"
                            : "bg-neutral-700 text-gray-300 hover:bg-neutral-600"
                    }`}
                >
                    {dia.slice(0, 3)}
                </span>
            ))}
        </div>
    </div>
);

export default DaySelectorUI;
