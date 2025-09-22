import type { MappedHorarioDTO } from "@/types/types";
import { useState, useEffect } from "react";

type CarruselHorariosProps = {
  horaInicio: number;
  horaFin: number;
  onSelectHorarios?: (seleccionadas: number[]) => void; // callback para devolver selección
  horariosOcupados?: MappedHorarioDTO[];
  selectedDate?: Date;
};

export default function CarruselHorarios({
  horaInicio,
  horaFin,
  onSelectHorarios,
  horariosOcupados = [],
  selectedDate,
}: CarruselHorariosProps) {
  const [seleccionadas, setSeleccionadas] = useState<number[]>([]);

  const [horasDisponibles, setHorasDisponibles] = useState<number[]>([]);

  // Reiniciar selección cuando cambia la fecha seleccionada

  useEffect(() => {
    setSeleccionadas([]);
    onSelectHorarios?.([]);
  }, [selectedDate]);

  // Lista de todas las horas
  const todasHoras: number[] = [];
  for (let h = horaInicio; h < horaFin; h++) todasHoras.push(h);

  // Función para saber si un horario está ocupado
  const estaOcupada = (hora: number) =>
    horariosOcupados.some(
      (dto) => hora >= dto.horaInicio && hora < dto.horaFin
    );

  // Calcular horarios disponibles según seleccionadas, ocupadas y hora actual

  useEffect(() => {
    let disponibles = todasHoras.filter((h) => !estaOcupada(h));

    if (selectedDate) {
      const ahora = new Date();
      const isHoy =
        selectedDate.getFullYear() === ahora.getFullYear() &&
        selectedDate.getMonth() === ahora.getMonth() &&
        selectedDate.getDate() === ahora.getDate();

      // Filtro de horas que ya pasaron en el dia de hoy
      if (isHoy) {
        disponibles = disponibles.filter((h) => h > ahora.getHours());
      }

      // Lógica si hay 1 horario seleccionado

      if (seleccionadas.length === 1) {
        const primer = seleccionadas[0];
        const finPosible = primer + 1;

        const posteriores: number[] = [];
        for (let h = primer + 1; h < horaFin; h++) {
          if (estaOcupada(h)) break;
          if (!isHoy || h > ahora.getHours()) posteriores.push(h);
        }

        const anteriores: number[] = [];
        for (let h = primer - 1; h >= horaInicio; h--) {
          if (estaOcupada(h)) break;
          if (!isHoy || h > ahora.getHours()) anteriores.push(h);
        }

        disponibles = [...anteriores, primer, ...posteriores];

        // Agregamos finPosible si no está bloqueado
        if (!disponibles.includes(finPosible) && finPosible < horaFin) {
          if (!isHoy || finPosible > ahora.getHours())
            disponibles.push(finPosible);
        }

        // Si no hay bloqueos en medio, agregamos horaFin
        const tieneOcupadoEnMedio = horariosOcupados.some(
          (dto) => dto.horaInicio < horaFin && dto.horaFin > primer
        );
        if (!tieneOcupadoEnMedio) {
          if (!isHoy || horaFin > ahora.getHours()) disponibles.push(horaFin);
        }

        // Eliminamos duplicados y ordenamos
        disponibles = Array.from(new Set(disponibles)).sort((a, b) => a - b);
      }

      // Lógica si hay 2 horarios seleccionados

      if (seleccionadas.length === 2) {
        const minSel = Math.min(...seleccionadas);
        const maxSel = Math.max(...seleccionadas);

        disponibles = todasHoras.filter(
          (h) =>
            (!estaOcupada(h) &&
              h >= minSel &&
              h <= maxSel &&
              (!isHoy || h > ahora.getHours())) ||
            seleccionadas.includes(h)
        );
      }
    }

    setHorasDisponibles(disponibles.sort((a, b) => a - b));
  }, [seleccionadas, horariosOcupados, selectedDate]);

  // Función para seleccionar o deseleccionar horarios

  const toggleSeleccion = (hora: number) => {
    let nuevas: number[];

    if (seleccionadas.includes(hora)) {
      // Si ya estaba seleccionado, lo quitamos
      if (seleccionadas.length === 2 && hora === Math.min(...seleccionadas)) {
        nuevas = [];
      } else {
        nuevas = seleccionadas.filter((h) => h !== hora);
      }
    } else if (seleccionadas.length < 2) {
      // Si no estaba seleccionado, agregamos hasta 2
      nuevas = [...seleccionadas, hora];
    } else {
      return;
    }

    setSeleccionadas(nuevas);
    onSelectHorarios?.(nuevas);
  };

  return (
    <div className="flex flex-col gap-3 w-full h-full overflow-y-auto scrollbar-hide pr-2">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

      {todasHoras.concat(horaFin).map((hora) => {
        const isSelected = seleccionadas.includes(hora);
        const isDisabled = !horasDisponibles.includes(hora) && !isSelected;

        return (
          <div
            key={hora}
            onClick={() => !isDisabled && toggleSeleccion(hora)}
            className={`rounded-lg py-6 text-center font-bold text-lg w-full cursor-pointer transition-colors
              ${
                isSelected
                  ? "bg-white text-black"
                  : "bg-gray-600 hover:bg-gray-500 text-white"
              }
              ${isDisabled ? "opacity-40 cursor-not-allowed" : ""}`}
          >
            {hora}:00 hs
          </div>
        );
      })}
    </div>
  );
}
