import type { Inmueble } from "@/types/types";
import { Link } from "wouter";

interface ListaResultadosProps {
  resultados: Inmueble[];
}

export default function ListaDeInmuebles({ resultados }: ListaResultadosProps) {
  return (
    <div>
      {resultados.map((inm) => (
        <Link href={`/publicacion?id=${inm.id}`} key={inm.id}>
          <li className="rounded-2xl bg-gray-700 mt-4 pl-2 p-2 flex flex-row justify-between min-w-80">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-32 h-32 rounded-md overflow-hidden">
                {inm.imageURL ? (
                  <img
                    src={inm.imageURL}
                    alt={`Imagen de ${inm.name}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#333] flex items-center justify-center text-gray-500 text-sm">
                    Sin Imagen
                  </div>
                )}
              </div>
              <div className="flex-2 text-white">
                <div className="items-start mb-2">
                  <h2 className="text-2xl font-bold text-gray-100 truncate">
                    Inmueble: {inm.name}
                  </h2>
                </div>

                    <p className="text-gray-400 text-base mb-2">
                        <span className="font-semibold">Localidad:</span>{" "}
                        {inm.ubication}
                        <span className="font-semibold"> - </span>{" "}
                        {inm.street}
                        <span className="font-semibold"> </span>{" "}
                        {inm.number}
                    </p>
                    <p className="text-gray-400 text-base mb-2">
                        <span className="font-semibold">Capacidad:</span>{" "}
                        {inm.capacity}
                    </p>
                <div className="mt-auto ">
                  <span className="text-xl ">
                    Horario disponible: {inm.start} - {inm.end}
                  </span>
                </div>
              </div>
            </div>
          </li>
        </Link>
      ))}
    </div>
  );
}
