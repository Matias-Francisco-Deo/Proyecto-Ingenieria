import React from "react";
import type { Dispatch, SetStateAction } from "react";

interface ScheduleInputUIProps {
    horarioDesde: string | undefined;
    horarioHasta: string | undefined;
    setHorarioDesde: Dispatch<SetStateAction<string | undefined>>;
    setHorarioHasta: Dispatch<SetStateAction<string | undefined>>;
}

const ScheduleInputUI: React.FC<ScheduleInputUIProps> = ({
    horarioDesde,
    horarioHasta,
    setHorarioDesde,
    setHorarioHasta,
}) => (
    <div className="mb-6">
        <label className="text-gray-300 font-semibold mb-3 block">
            Horario de Disponibilidad
        </label>
        <div className="flex justify-between gap-4">
            <label className="flex flex-col text-gray-400 flex-1">
                Desde:
                <input
                    type="time"
                    step={3600}
                    value={horarioDesde ?? ""}
                    onChange={(e) => setHorarioDesde(e.target.value)}
                    className="mt-2 p-2 rounded-xl bg-neutral-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
            </label>
            <label className="flex flex-col text-gray-400 flex-1">
                Hasta:
                <input
                    type="time"
                    step={3600}
                    value={horarioHasta ?? ""}
                    onChange={(e) => setHorarioHasta(e.target.value)}
                    className="mt-2 p-2 rounded-xl bg-neutral-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
            </label>
        </div>
    </div>
);

export default ScheduleInputUI;
