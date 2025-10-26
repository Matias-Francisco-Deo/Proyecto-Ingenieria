type Props = {
    availableDays: string[];
};

export default function DiasReadOnly({ availableDays }: Props) {
    const days = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
    ];

    function convertToUppercaseEng(day: string): string {
        return day
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toUpperCase();
    }

    const selectedDaysSet = new Set(availableDays);

    function renderDay(day: string) {
        const uppercaseDay = convertToUppercaseEng(day);
        const isSelected = selectedDaysSet.has(uppercaseDay);

        return (
            <div
                key={day}
                className={`w-28 px-4 py-3 rounded-lg text-sm text-center ${
                    isSelected
                        ? "bg-amber-500 text-black font-bold"
                        : "bg-gray-900 text-gray-400"
                }`}
            >
                {day}
            </div>
        );
    }

    return (
        <div className="w-full text-white rounded-xl p-4 relative">
            <div className="text-center mb-3">
                <h2 className="text-xl">Días disponibles:</h2>
            </div>

            {/* Layout de 4 días arriba y 3 abajo centrados */}
            <div className="flex flex-col items-center gap-4">
                {/* Fila 1: 4 días */}
                <div className="flex justify-center gap-4">
                    {days.slice(0, 4).map((day) => renderDay(day))}
                </div>

                {/* Fila 2: 3 días */}
                <div className="flex justify-center gap-4">
                    {days.slice(4).map((day) => renderDay(day))}
                </div>
            </div>
        </div>
    );
}
