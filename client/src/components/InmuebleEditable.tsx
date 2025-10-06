import { useState } from "react";
import type { Inmueble } from "@/types/types";
import Dias from "./Dias";

export default function InmuebleEditable({
  inmueble,
  onCancelar,
  onGuardar,
}: {
  inmueble: Inmueble;
  onCancelar: () => void;
  onGuardar: (data: Inmueble) => void;
}) {
  const [formData, setFormData] = useState(inmueble);
  // const [nuevasImgs, setNuevasImgs] = useState<File[]>([]);
  // const [imgsActuales, setImgsActuales] = useState<string[]>(
  //   inmueble.images || []
  // );
  /* IMAGENES ACÁ ARRIBA */

  const days = new Set(inmueble.availableDays);
  
  const [selectedDays, setSelectedDays] = useState<Set<string>>(days);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const agregarImagenes = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setNuevasImgs(Array.from(e.target.files));
  //   }
  // };

  // const eliminarImagen = (img: string) => {
  //   setImgsActuales(imgsActuales.filter((i) => i !== img));
  // };

  const handleGuardar = async () => {
    onGuardar({
      ...formData,
      availableDays: Array.from(selectedDays)
    });
  };

  return (
    <div className="space-y-3">
      <div className="space-y-4 p-4 bg-gray-800 rounded-lg">
        <div className="flex flex-col gap-1 text-amber-400">
          <label htmlFor="name">Nombre:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre"
            className="rounded-md bg-gray-600 px-3 py-1.5 text-base text-white outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div className="flex flex-col gap-1 text-amber-400">
          <label htmlFor="price">Precio Por Hora:</label>
          <input
            id="price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Precio"
            onKeyDown={(e) => {
              if (
                e.key === "e" ||
                e.key === "E" ||
                e.key === "+" ||
                e.key === "-"
              ) {
                e.preventDefault();
              }
            }}
            className="no-spin rounded-md bg-gray-600 px-3 py-1.5 text-base text-white outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div className="flex flex-col gap-1 text-amber-400">
          <label>Horario:</label>
          <div className="flex gap-2">
            <input
              type="time"
              name="start"
              step="3600"
              value={formData.start}
              onChange={handleChange}
              placeholder="Desde"
              className="no-time-picker flex-[1] min-w-[90px] rounded-md bg-gray-600 px-3 py-1.5 text-base text-white outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <input
              type="time"
              name="end"
              step="3600"
              value={formData.end}
              onChange={handleChange}
              placeholder="Hasta"
              className="no-time-picker flex-[1] min-w-[90px] rounded-md bg-gray-600 px-3 py-1.5 text-base text-white outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>

        
        <div className="flex flex-col gap-1 text-amber-400">
          <label>Dirección:</label>
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              name="ubication"
              value={formData.ubication}
              onChange={handleChange}
              placeholder="Localidad"
              className="flex-[2] min-w-[120px] rounded-md bg-gray-600 px-3 py-1.5 text-base text-white outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="Calle"
              className="flex-[1] min-w-[90px] rounded-md bg-gray-600 px-3 py-1.5 text-base text-white outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <input
              type="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="Altura"
              className="no-spin flex-[1] min-w-[90px] rounded-md bg-gray-600 px-3 py-1.5 text-base text-white outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>

        <Dias
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
        ></Dias>

        <div className="flex flex-col gap-1 text-amber-400">
          <label htmlFor="condition">Condiciones:</label>
          <input
            id="condition"
            type="text"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            placeholder="Condiciones"
            className="rounded-md bg-gray-600 px-3 py-1.5 text-base text-white outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div className="flex flex-col gap-1 text-amber-400">
          <label htmlFor="cancellation">Política de cancelación:</label>
          <select
            name="cancellation"
            id="cancellation"
            value={formData.cancellation}
            onChange={handleChange}
            className="rounded-md bg-gray-600 px-3 py-1.5 text-base text-white outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="SIN_RETRIBUCION">Sin restricción</option>
            <option value="FLEXIBLE">Flexible</option>
            <option value="SEVERO">Severo</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 text-amber-400">
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Agrega una descripción"
            className="w-full h-25 rounded-md bg-gray-600 px-3 py-1.5 text-base text-white outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleGuardar}
            className="bg-amber-500 hover:bg-amber-700 px-3 py-1 rounded text-white cursor-pointer"
          >
            Guardar
          </button>
          <button
            onClick={onCancelar}
            className="bg-gray-500 hover:bg-gray-700 px-3 py-1 rounded text-white cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

// Código para agregar las imagenes al form
// selectedFiles.forEach((file) => {
//       formData.append("images", file);
//     });