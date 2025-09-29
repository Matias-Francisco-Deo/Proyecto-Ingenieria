function DaySelectorUI() {
    const dias = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
    ];

    return (
        <div>
            <p className="text-gray-400 font-semibold mb-3">
                Que tenga disponibles los días:
            </p>
            <div className="flex flex-col items-center gap-2">
                <div className="flex justify-center gap-2">
                    {dias.slice(0, 4).map((dia) => (
                        <span
                            key={dia}
                            className="px-4 py-2 rounded-xl cursor-pointer text-sm bg-neutral-800 text-gray-300"
                        >
                            {dia}
                        </span>
                    ))}
                </div>
                <div className="flex justify-center gap-2">
                    {dias.slice(4).map((dia) => (
                        <span
                            key={dia}
                            className="px-4 py-2 rounded-xl cursor-pointer text-sm bg-neutral-800 text-gray-300"
                        >
                            {dia}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DaySelectorUI;
