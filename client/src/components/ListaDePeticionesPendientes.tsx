import type { PeticionPendiente } from "@/types/types";
import { Link } from "wouter";

interface ListaResultadosProps {
  resultados: PeticionPendiente[];
}

export default function ListaDePeticionesPendientes({
  resultados,
}: ListaResultadosProps) {
  return (
    <ul className="mt-4 w-3/4 bg-gray-900 rounded-2xl p-10">
      <h1 className="text-3xl ">Peticiones pendientes:</h1>
      {resultados.map((petition) => (
        <Link href={`/publicacion?id=${petition.id}`}>
          <li
            key={petition.id}
            className="rounded-2xl bg-gray-700 mt-2 pl-2 p-2 flex flex-row justify-between"
          >
            <div className="p-4 bg-gray ">
              <p>
                <strong>Cliente:</strong> {petition.client_name}
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
