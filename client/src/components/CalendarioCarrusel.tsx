import { useState, useRef, useEffect } from "react";
import BotonesCarrusel from "./BotonesCarrusel";

type Props = { onDaySelect?: (date: Date) => void };

export default function CalendarioCarrusel({ onDaySelect }: Props) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const containerRef = useRef<HTMLDivElement>(null);

  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  const scrollToDay = (index: number) => {
    containerRef.current?.children[index].scrollIntoView({ behavior: "smooth", inline: "center" });
  };

  const handleSelect = (day: Date) => {
    setSelectedDate(day);
    onDaySelect?.(day);
    scrollToDay(days.findIndex(d => d.toDateString() === day.toDateString()));
  };

  const moveDay = (step: number) => {
    const index = days.findIndex(d => d.toDateString() === selectedDate.toDateString());
    handleSelect(days[Math.min(days.length - 1, Math.max(0, index + step))]);
  };

  useEffect(() => handleSelect(selectedDate), []);

  const monthYearFormatter = new Intl.DateTimeFormat("es-ES", { month: "long", year: "numeric" });
  const dayNameFormatter = new Intl.DateTimeFormat("es-ES", { weekday: "short" });

  return (
    <div className="w-full bg-gray-900 text-white rounded-xl p-4 relative">
      <div className="text-center mb-3">
        <h2 className="text-xl font-bold">{monthYearFormatter.format(selectedDate)}</h2>
      </div>

      <BotonesCarrusel onNext={() => moveDay(1)} onPrev={() => moveDay(-1)} />

      <div className="flex justify-center overflow-hidden">
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto py-4 w-[80%]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollSnapType: "x mandatory" }}
        >
          {days.map(day => {
            const isSelected = day.toDateString() === selectedDate.toDateString();
            return (
              <button
                key={day.toDateString()}
                onClick={() => handleSelect(day)}
                className={`flex flex-col items-center min-w-[80px] px-4 py-3 rounded-lg transition-colors ${
                  isSelected ? "bg-amber-500 text-black font-bold" : "bg-gray-800 hover:bg-gray-700"
                }`}
                style={{ cursor: "pointer", scrollSnapAlign: "center" }}
              >
                <span className="text-sm">{dayNameFormatter.format(day).toUpperCase()}</span>
                <span className="text-lg">{day.getDate()}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}