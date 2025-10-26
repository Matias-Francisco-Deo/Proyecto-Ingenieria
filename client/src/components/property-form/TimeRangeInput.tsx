interface TimeRangeInputProps {
    startError?: boolean;
    endError?: boolean;
}

export default function TimeRangeInput({
    startError,
    endError,
}: TimeRangeInputProps) {
    return (
        <div>
            <div className="flex items-center justify-between">
                <label className="block font-medium text-sm/6">
                    Ingresar horarios
                </label>
            </div>
            <div className="mt-2 flex gap-4">
                <div className="flex-1">
                    <label
                        htmlFor="start-event"
                        className="block font-medium text-sm/6"
                    >
                        Inicio
                    </label>
                    <input
                        id="start-event"
                        name="start-event"
                        type="time"
                        step="3600"
                        required
                        autoComplete="start-event"
                        className={`no-time-picker ${
                            startError ? "inputError" : ""
                        } loginInput -outline-offset-1 focus:-outline-offset-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6`}
                    />
                </div>
                <div className="flex-1">
                    <label
                        htmlFor="end-event"
                        className="block font-medium text-sm/6"
                    >
                        Fin
                    </label>
                    <input
                        id="end-event"
                        name="end-event"
                        type="time"
                        step="3600"
                        required
                        autoComplete="end-event"
                        className={`no-time-picker ${
                            endError ? "inputError" : ""
                        } loginInput -outline-offset-1 focus:-outline-offset-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6`}
                    />
                </div>
            </div>
        </div>
    );
}
