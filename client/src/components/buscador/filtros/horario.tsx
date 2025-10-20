import { useState, useEffect } from "react";

interface HorarioProps {
  setRangoHorario: (rangoHorario: string[]) => void;
}

export default function ScheduleInputUI({ setRangoHorario }: HorarioProps) {
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");

  useEffect(() => {
    if (!desde && !hasta) {
      setRangoHorario([]);
      return;
    }

    setRangoHorario([desde, hasta]);
  }, [desde, hasta, setRangoHorario]);

  return (
    <div className="mb-6">
      <label className="text-gray-300 font-semibold mb-3 block">
        Buscar por horario
      </label>
      <div className="flex justify-around gap-4">
        <div className="flex items-center p-2 rounded-xl bg-neutral-800 text-gray-300 gap-3 w-1/3">
          <span>De:</span>
          <input
            type="time"
            step={3600}
            value={desde}
            onChange={(e) => setDesde(e.target.value)}
            className="no-time-picker bg-neutral-800 text-gray-300"
          />
        </div>
        <div className="flex items-center p-2 rounded-xl bg-neutral-800 text-gray-300 gap-3 w-1/3">
          <span>Hasta:</span>
          <input
            type="time"
            step={3600}
            value={hasta}
            onChange={(e) => setHasta(e.target.value)}
            className="no-time-picker bg-neutral-800 text-gray-300"
          />
        </div>
      </div>
    </div>
  );
}