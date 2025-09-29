function ScheduleInputUI() {
    return (
        <div className="mb-6">
            <label className="text-gray-300 font-semibold mb-3 block">
                Buscar por horario
            </label>
            <div className="flex justify-between">
                <div className="flex items-center p-2 rounded-xl bg-neutral-800 text-gray-300 gap-6">
                    <span>De:</span>
                    <input
                        type="time"
                        step={3600}
                        className="no-time-picker bg-neutral-800 text-gray-300"
                    />
                </div>
                <div className="flex items-center p-2 rounded-xl bg-neutral-800 text-gray-300 gap-6">
                    <span>Hasta:</span>
                    <input
                        type="time"
                        step={3600}
                        className="no-time-picker bg-neutral-800 text-gray-300"
                    />
                </div>
            </div>
        </div>
    );
}
export default ScheduleInputUI;
