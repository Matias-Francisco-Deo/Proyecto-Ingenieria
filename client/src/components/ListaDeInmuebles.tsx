import type { Inmueble } from "@/types/types";
import { Link } from "wouter";

interface ListaResultadosProps {
  resultados: Inmueble[];
}

export default function ListaDeInmuebles({ resultados }: ListaResultadosProps) {
  return (
    <ul className="mt-4">
      {resultados.map((inm) => (
        <Link href={`/publicacion?id=${inm.id}`}>
          <li key={inm.id} className="border-2 border-amber-600 mt-2 pl-2 p-2">
            <div className="p-4 shadow rounded bg-gray">
              <h2 className="text-xl font-bold">{inm.name}</h2>
              <p>
                <strong>Ubicación: </strong> {inm.ubication}{inm.street}{inm.number}
              </p>
              <p>
                <strong>Precio: </strong> ${inm.price}
              </p>
              <p>
                <strong>Nombre del dueño:</strong> {inm.nameDelDuenio}
              </p>
              <p>
                <strong>Email:</strong> {inm.email}
              </p>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}
