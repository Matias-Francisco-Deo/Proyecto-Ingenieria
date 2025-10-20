import type { Inmueble } from "@/types/types";

export default function InmuebleReadOnly({ inmueble }: { inmueble: Inmueble }) {
  return (
    <div className="space-y-3">
      <p className="text-2xl font-bold text-amber-400">
        Precio Por Hora: ${inmueble.price}
      </p>

      <p>
        <span className="font-semibold text-lg">Horario: </span>
        {inmueble.start} - {inmueble.end}
      </p>
      <div className="flex gap-6">
        <div className="flex items-center gap-1">
          <span className="font-semibold text-lg">Localidad: </span>
          <span>{inmueble.ubication}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-semibold text-lg">Calle: </span>
          <span>{inmueble.street}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-semibold text-lg">Altura: </span>
          <span>{inmueble.number}</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <span className="font-semibold text-lg">Capacidad: </span>
        <span>{inmueble.capacity}</span>
      </div>

      <p>
        <span className="font-semibold text-lg">Condiciones: </span>
        {inmueble.condition}
      </p>
      <p>
        <span className="font-semibold text-lg">Política de cancelación: </span>
        {inmueble.cancellation}
      </p>
      <p>
        <span className="font-semibold text-lg">Descripción: </span>
        {inmueble.description}
      </p>
    </div>
  );
}
