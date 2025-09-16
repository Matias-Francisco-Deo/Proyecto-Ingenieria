import { useRef, useState } from "react";
// import BotonesCarrusel from "./BotonesCarrusel";

type Props = {
  selectedDays: Set<string>;
  setSelectedDays: React.Dispatch<React.SetStateAction<Set<string>>>;
};

export default function Dias({ selectedDays, setSelectedDays }: Props) {
  const days = new Set([
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ]);

  const [generalErrorMessage, setGeneralErrorMessage] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (selectedDay: string) => {
    const newSet = new Set(selectedDays);
    const upperEngDay = convertToUppercaseEng(selectedDay);

    if (newSet.has(upperEngDay) && newSet.size > 1) {
      newSet.delete(upperEngDay);
    } else if (!newSet.has(upperEngDay)) {
      newSet.add(upperEngDay);
    } else {
      setGeneralErrorMessage("Debe seleccionar al menos un día.");
      resetErrorMessage();
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
        {/* <h2 className="text-xl font-bold">{selectedDays}</h2> */}
        <h2 className="text-xl">Seleccione los días disponibles:</h2>
        {generalErrorMessage && (
          <p className="mt-2 text-sm text-red-600">{generalErrorMessage}</p>
        )}
      </div>

      {/* <BotonesCarrusel onNext={() => moveDay(1)} onPrev={() => moveDay(-1)} /> */}

      <div className="flex justify-center overflow-hidden">
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto py-4 w-[100%]"
        >
          {Array.from(days).map((day) => {
            const uppercaseDay = convertToUppercaseEng(day);
            console.log(uppercaseDay);
            const isSelected = selectedDays.has(uppercaseDay);
            // console.log(uppercaseDay, isSelected);

            return (
              <button
                key={day}
                onClick={(evt) => {
                  evt.preventDefault();
                  handleSelect(day);
                }}
                className={`flex flex-col items-center min-w-[70px] px-4 py-3 rounded-lg transition-colors ${
                  isSelected
                    ? "bg-amber-500 text-black font-bold"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
                style={{ cursor: "pointer", scrollSnapAlign: "center" }}
              >
                {/* <span className="text-sm">{day}</span> */}
                <span className="text-sm">{day}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  function resetErrorMessage() {
    setTimeout(() => {
      setGeneralErrorMessage("");
    }, 3000);
  }
}
