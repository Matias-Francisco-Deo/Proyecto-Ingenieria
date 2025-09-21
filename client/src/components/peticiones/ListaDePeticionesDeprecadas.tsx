import type { PendingPetitionDraft } from "@/types/types";
import { Link } from "wouter";

interface ListaResultadosProps {
  resultados: PendingPetitionDraft[];
}

export default function ListaDePeticionesPendientes({
  resultados,
}: ListaResultadosProps) {
  return (
    <ul className="mt-4 w-3/4 bg-gray-900 rounded-2xl p-10 min-w-max">
      <h1 className="text-3xl ">Peticiones Pendientes:</h1>
      {resultados.map((petition) => (
        <Link key={petition.id} href={`/peticion/pendiente?id=${petition.id}`}>
          <li className="rounded-2xl bg-gray-700 mt-2 pl-2 p-2 flex flex-row justify-between min-w-80">
            <div className="p-4 bg-gray ">
              <p>
                <strong>Cliente:</strong> {petition.client_name}
              </p>

              <p>
                <strong>Fecha del evento: </strong>
                {petition.event_date}
              </p>

              <p>
                <strong>Empieza: </strong>
                {petition.requested_date_start}
              </p>
              <p>
                <strong>Termina: </strong>
                {petition.requested_date_end}
              </p>

              <h2 className="text-xl font-bold">
                Inmueble: {petition.property_name}
              </h2>
            </div>
            <div className="px-20 bg-gray flex items-center ">
              <p>
                <strong>Emitida: </strong>
                {petition.created_date}
              </p>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}
