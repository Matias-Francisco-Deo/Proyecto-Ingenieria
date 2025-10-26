import type { PendingPetitionDraft } from "@/types/types";
import { useState } from "react";
import BotonDeclararPago from "@/components/BotonDeclararPago";

interface ListaResultadosProps {
    resultados: PendingPetitionDraft[];
}

export default function ListaDePeticionesVigentes({
    resultados,
}: ListaResultadosProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleOpen = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const [petitionsState, setPetitionsState] = useState(resultados);

    const handlePagoDeclarado = (petitionId: number) => {
        setPetitionsState((prev) =>
            prev.map((p) => (p.id === petitionId ? { ...p, pagado: true } : p))
        );
    };

    return (
        <div className="mt-4 w-3/4 bg-gray-900 rounded-2xl p-10 min-w-max">
            <h1 className="text-3xl mb-4">Peticiones Aceptadas:</h1>
            <ul className="space-y-4">
                {petitionsState.map((petition, index) => (
                    <li
                        key={petition.id}
                        className="rounded-2xl bg-gray-700 p-4 transition flex flex-col"
                    >
                        <button
                            onClick={() => toggleOpen(index)}
                            className="flex justify-between items-center w-full text-left"
                        >
                            <div>
                                <p>
                                    <strong>Cliente:</strong>{" "}
                                    {petition.client_name}
                                </p>
                                <h2 className="text-xl font-bold">
                                    Inmueble: {petition.property_name}
                                </h2>
                            </div>
                            <div>
                                <p>
                                    <strong>Emitida:</strong>{" "}
                                    {petition.created_date}
                                </p>
                                {petition.pagado !== undefined && (
                                    <p className="text-orange-400 text-2xl font-bold mt-1">
                                        {petition.pagado
                                            ? "Pagado"
                                            : "No pagado"}
                                    </p>
                                )}
                            </div>
                        </button>

                        {openIndex === index && (
                            <div className="mt-3 space-y-2 bg-gray-800 rounded-lg p-3">
                                <div className="flex justify-between text-sm text-gray-200">
                                    <span>{petition.client_email}</span>
                                    <span>${petition.price}</span>
                                    <span>{petition.event_date}</span>
                                    <span>
                                        {petition.requested_date_start} -{" "}
                                        {petition.requested_date_end}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Botón siempre visible al final del recuadro si no está pagado */}
                        {!petition.pagado && (
                            <div className="flex justify-center mt-4">
                                <BotonDeclararPago
                                    reservaId={petition.id}
                                    onPagoDeclarado={() =>
                                        handlePagoDeclarado(petition.id)
                                    }
                                />
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
