import { useState } from "react";
import PoliticasPopup from "@/components/PoliticasPopup";

interface CancellationPolicySelectProps {
    error?: boolean;
}

export default function CancellationPolicySelect({
    error,
}: CancellationPolicySelectProps) {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div>
            <div className="flex items-center justify-between">
                <label
                    htmlFor="cancellation-policy"
                    className="block font-medium text-sm/6"
                >
                    Políticas de cancelación
                </label>
                <button
                    type="button"
                    onClick={() => setShowPopup(true)}
                    className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-amber-500 transition cursor-pointer"
                    aria-label="Información sobre políticas de cancelación"
                >
                    ?
                </button>
                <PoliticasPopup
                    show={showPopup}
                    setShow={setShowPopup}
                />
            </div>
            <div className="mt-2">
                <select
                    name="cancellation-policy"
                    id="cancellation-policy"
                    required
                    className={`${
                        error ? "inputError" : ""
                    } loginInput -outline-offset-1 focus:-outline-offset-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6`}
                >
                    <option value="">Seleccione una opción</option>
                    <option value="Sin_Devolucion">Sin devolución</option>
                    <option value="Flexible">Flexible</option>
                    <option value="Severo">Severo</option>
                </select>
            </div>
        </div>
    );
}
