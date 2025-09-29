function RatingAndCapacityUI() {
    return (
        <div className="mb-6 flex flex-col gap-4">
            <input
                type="number"
                placeholder="Buscar por calificación"
                className="no-spin w-[55%] p-2 rounded-xl bg-neutral-800 text-gray-300"
            />
            <input
                type="number"
                placeholder="Buscar por capacidad"
                className="no-spin w-[55%] p-2 rounded-xl bg-neutral-800 text-gray-300"
            />
        </div>
    );
}

export default RatingAndCapacityUI;
