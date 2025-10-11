import type { Inmueble } from "@/types/types";
import { Link } from "wouter";

interface ListaResultadosProps {
  resultados: Inmueble[];
}

export default function ListaDeInmuebles({ resultados }: ListaResultadosProps) {
  return (
    <ul className="mt-6 space-y-4">
      {resultados.map((inm) => (
        <Link href={`/publicacion?id=${inm.id}`} key={inm.id}>
          <li className="mt-6 block p-4 bg-[#1a1a1a] border border-amber-600 rounded-lg shadow-xl cursor-pointer transition duration-300 hover:bg-[#2a2a2a] hover:shadow-2xl">
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
              <div className="flex-1 text-white">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-2xl font-bold text-gray-100 truncate">
                    {inm.name}
                  </h2>
                  <p className="text-sm font-semibold text-amber-500 ml-4">
                    {inm.ownerName}
                  </p>
                </div>

                <p className="text-gray-400 text-base mb-2">
                  <span className="font-semibold">Localidad:</span>{" "}
                  {inm.ubication}
                </p>
                <div className="mt-auto pt-2">
                  <span className="text-xl font-extrabold text-amber-500">
                    ${inm.price.toLocaleString("es-AR")}
                  </span>
                </div>
              </div>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}
