import type { PendingPetitionDraft } from "@/types/types";
import { useState } from "react";

interface ListaResultadosProps {
  resultados: PendingPetitionDraft[];
}

export default function ListaDePeticionesCanceladas({
  resultados,
}: ListaResultadosProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-4 w-3/4 bg-gray-900 rounded-2xl p-10 min-w-max">
      <h1 className="text-3xl mb-4">Peticiones Canceladas y Rechazadas:</h1>
      <ul className="space-y-4">
        {resultados.map((petition, index) => (
          <li
            key={petition.id}
            className="rounded-2xl bg-gray-700 p-4 transition"
          >
            <button
              onClick={() => toggleOpen(index)}
              className="flex justify-between items-center w-full text-left"
            >
              <div>
                <p>
                  <strong>Cliente:</strong> {petition.client_name}
                </p>
                <h2 className="text-xl font-bold">
                  Inmueble: {petition.property_name}
                </h2>
              </div>
              <div>
                <p>
                  <strong>Emitida:</strong> {petition.created_date}
                </p>
              </div>
            </button>

            {openIndex === index && (
              <div className="mt-3 space-y-2 bg-gray-800 rounded-lg p-3">
                <div className="flex justify-between text-sm text-gray-200">
                  <span>{petition.client_email}</span>
                  <span>${petition.price}</span>
                  <span>{petition.event_date}</span>
                  <span>
                    {petition.requested_date_start} - {petition.requested_date_end}
                  </span>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}