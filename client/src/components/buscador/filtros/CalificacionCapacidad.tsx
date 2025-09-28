import React from "react";

interface RatingAndCapacityUIProps {
    calificacion: number | undefined;
    capacidad: number | undefined;
    onCalificacionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCapacidadChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RatingAndCapacityUI: React.FC<RatingAndCapacityUIProps> = ({
    calificacion,
    capacidad,
    onCalificacionChange,
    onCapacidadChange,
}) => (
    <div className="mb-6 grid grid-cols-2 gap-4">
        <label className="flex flex-col text-gray-400">
            Calificación Mínima ($1-5$):
            <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                placeholder="Ej: 4.5"
                value={calificacion ?? ""}
                onChange={onCalificacionChange}
                className="no-spin mt-2 p-2 rounded-xl bg-neutral-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
        </label>
        <label className="flex flex-col text-gray-400">
            Capacidad Mínima (Personas):
            <input
                type="number"
                min="1"
                placeholder="Ej: 10"
                value={capacidad ?? ""}
                onChange={onCapacidadChange}
                className="no-spin mt-2 p-2 rounded-xl bg-neutral-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
        </label>
    </div>
);

export default RatingAndCapacityUI;
