import { useState, useRef, useEffect } from "react";
import BotonesCarrusel from "./BotonesCarrusel";

type Props = { onDaySelect?: (date: Date) => void };

export default function CalendarioCarrusel({ onDaySelect }: Props) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [isSelectingDate, setIsSelectingDate] = useState(false);
  const [monthsOfSelectedYear, setMonthsOfSelectedYear] = useState<string[]>(
    []
  );
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const containerRef = useRef<HTMLDivElement>(null);

  const days = Array.from({ length: 365 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Mayo",
    "Abril",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const years = [today.getFullYear(), today.getFullYear() + 1];

  const scrollToDay = (index: number) => {
    containerRef.current?.children[index].scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });
  };

  const handleSelectDay = (day: Date) => {
    setSelectedDate(day);
    onDaySelect?.(day);
    scrollToDay(days.findIndex((d) => d.toDateString() === day.toDateString()));
  };

  const handleSelectMonth = (monthIndex: number) => {
    monthIndex = monthIndex + 1;
    const currentMonth = today.getMonth() + 1;
    monthIndex =
      selectedYear === today.getFullYear()
        ? monthIndex + today.getMonth()
        : monthIndex;
    const day = getDayOfMonthSelection(currentMonth, monthIndex);

    const date = new Date(`${selectedYear}-${monthIndex}-${day}`);

    handleSelectDay(date);
    setIsSelectingDate(false);
  };

  const handleSelectYear = (year: number) => {
    const monthsOfYear: string[] = [];
    const currentMonth = today.getMonth();

    // dame los meses que faltan
    if (today.getFullYear() == year) {
      months.forEach((month, index) => {
        if (index >= currentMonth) monthsOfYear.push(month);
      });
      // dame todos los meses hasta llegar a este mes del siguiente año
    } else {
      months.forEach((month, index) => {
        if (index <= currentMonth) monthsOfYear.push(month);
      });
    }

    setSelectedYear(year);
    setMonthsOfSelectedYear(monthsOfYear);
  };

  const moveDay = (step: number) => {
    const index = days.findIndex(
      (d) => d.toDateString() === selectedDate.toDateString()
    );
    handleSelectDay(days[Math.min(days.length - 1, Math.max(0, index + step))]);
  };

  useEffect(() => handleSelectDay(selectedDate), []);

  const monthYearFormatter = new Intl.DateTimeFormat("es-ES", {
    month: "long",
    year: "numeric",
  });
  const dayNameFormatter = new Intl.DateTimeFormat("es-ES", {
    weekday: "short",
  });

  return (
    <div className="w-full bg-gray-900 text-white rounded-xl p-2 relative">
      <div className="text-center mb-3">
        <div
          className={
            "flex flex-col justify-center gap-1 transition duration-300 ease-in-out " +
            `${
              isSelectingDate
                ? "opacity-100 pointer-events-auto "
                : "opacity-0 pointer-events-none "
            }`
          }
        >
          <div className="flex flex-row text-xl justify-center gap-4 transition duration-300 ease-in-out ">
            {years.map((year) => (
              <button
                onClick={() => {
                  handleSelectYear(year);
                }}
                key={year}
                className="cursor-pointer hover:text-amber-500 font-bold"
              >
                {year}
              </button>
            ))}
          </div>
          <div className="flex flex-row justify-center gap-4 transition duration-300 ease-in-out ">
            {monthsOfSelectedYear.map((month, index) => (
              <button
                onClick={() => handleSelectMonth(index)}
                key={month}
                className="cursor-pointer hover:text-amber-500"
              >
                {month}
              </button>
            ))}
          </div>
        </div>
        <button onClick={() => setIsSelectingDate(true)}>
          <h2 className="text-xl font-bold cursor-pointer hover:text-amber-500">
            {monthYearFormatter.format(selectedDate)}
          </h2>
        </button>
      </div>

      <BotonesCarrusel onNext={() => moveDay(1)} onPrev={() => moveDay(-1)} />

      <div className="flex justify-center overflow-hidden">
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto py-4 w-[80%]"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            scrollSnapType: "x mandatory",
          }}
        >
          {days.map((day) => {
            const isSelected =
              day.toDateString() === selectedDate.toDateString();
            return (
              <button
                key={day.toDateString()}
                onClick={() => handleSelectDay(day)}
                className={`flex flex-col items-center min-w-[80px] px-4 py-3 rounded-lg transition-colors ${
                  isSelected
                    ? "bg-amber-500 text-black font-bold"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
                style={{ cursor: "pointer", scrollSnapAlign: "center" }}
              >
                <span className="text-sm">
                  {dayNameFormatter.format(day).toUpperCase()}
                </span>
                <span className="text-lg">{day.getDate()}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  function getDayOfMonthSelection(currentMonth: number, monthIndex: number) {
    let day = 1;
    if (today.getFullYear() === selectedYear && currentMonth === monthIndex)
      day = today.getDate();
    console.log(day, currentMonth, monthIndex);
    return day;
  }
}
