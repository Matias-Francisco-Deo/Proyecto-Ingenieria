import { useRef } from "react";
import { toast } from "react-toastify";

type Props = {
  selectedDays: Set<string>;
  setSelectedDays: React.Dispatch<React.SetStateAction<Set<string>>>;
};

export default function Dias({ selectedDays, setSelectedDays }: Props) {
  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (selectedDay: string) => {
    const newSet = new Set(selectedDays);
    const upperEngDay = convertToUppercaseEng(selectedDay);

    if (newSet.has(upperEngDay) && newSet.size > 1) {
      newSet.delete(upperEngDay);
    } else if (!newSet.has(upperEngDay)) {
      newSet.add(upperEngDay);
    } else {
      toast.warning("Debe seleccionar al menos un día");
    }

    setSelectedDays(newSet);
  };

  function convertToUppercaseEng(day: string): string {
    return day
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase();
  }

  return (
    <div className="w-full text-white rounded-xl p-4 relative">
      <div className="text-center mb-3">
        <h2 className="text-xl">Seleccione los días disponibles:</h2>
      </div>

      {/* Layout de 4 días arriba y 3 abajo centrados */}
      <div
        ref={containerRef}
        className="flex flex-col items-center gap-4"
      >
        {/* Fila 1: 4 días */}
        <div className="flex justify-center gap-4">
          {days.slice(0, 4).map((day) => renderButton(day))}
        </div>

        {/* Fila 2: 3 días */}
        <div className="flex justify-center gap-4">
          {days.slice(4).map((day) => renderButton(day))}
        </div>
      </div>
    </div>
  );

  function renderButton(day: string) {
    const uppercaseDay = convertToUppercaseEng(day);
    const isSelected = selectedDays.has(uppercaseDay);

    return (
      <button
        key={day}
        onClick={(evt) => {
          evt.preventDefault();
          handleSelect(day);
        }}
        className={`w-28 px-4 py-3 rounded-lg transition-colors text-sm ${
          isSelected
            ? "bg-amber-500 text-black font-bold"
            : "bg-gray-800 hover:bg-gray-700"
        }`}
        style={{ cursor: "pointer" }}
      >
        {day}
      </button>
    );
  }
}
