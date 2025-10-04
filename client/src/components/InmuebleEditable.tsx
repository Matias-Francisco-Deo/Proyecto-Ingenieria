import { useState } from "react";
import type { Inmueble } from "@/types/types";

export default function InmuebleEditable({
  inmueble,
  onCancelar,
  onGuardar,
}: {
  inmueble: Inmueble;
  onCancelar: () => void;
  onGuardar: (data: Inmueble, nuevasImgs: File[]) => void;
}) {
  const [formData, setFormData] = useState(inmueble);
  const [nuevasImgs, setNuevasImgs] = useState<File[]>([]);
  const [imgsActuales, setImgsActuales] = useState<string[]>(
    inmueble.images || []
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImagenes = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNuevasImgs(Array.from(e.target.files));
    }
  };

  const eliminarImagen = (img: string) => {
    setImgsActuales(imgsActuales.filter((i) => i !== img));
  };

  const handleGuardar = async () => {
    onGuardar({ ...formData, images: imgsActuales }, nuevasImgs);
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
            className="rounded-md bg-gray-600 px-3 py-1.5 text-base text-white outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div className="flex flex-col gap-1 text-amber-400">
          <label>Horario:</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="start"
              value={formData.start}
              onChange={handleChange}
              placeholder="Desde"
              className="flex-1 rounded-md bg-gray-600 px-3 py-1.5 text-base text-white outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <input
              type="text"
              name="end"
              value={formData.end}
              onChange={handleChange}
              placeholder="Hasta"
              className="flex-1 rounded-md bg-gray-600 px-3 py-1.5 text-base text-white outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 text-amber-400">
          <label>Dirección:</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="ubication"
              value={formData.ubication}
              onChange={handleChange}
              placeholder="Localidad"
              className="flex-1 rounded-md bg-gray-600 px-3 py-1.5 text-base text-white outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="Calle"
              className="flex-1 rounded-md bg-gray-600 px-3 py-1.5 text-base text-white outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="Altura"
              className="flex-1 rounded-md bg-gray-600 px-3 py-1.5 text-base text-white outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>

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
            name="cancellation-policy"
            id="cancellation-policy"
            required
            className="rounded-md bg-gray-600 px-3 py-1.5 text-base text-white outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="non-restriction">Sin restricción</option>
            <option value="Flexible">Flexible</option>
            <option value="Severo">Severo</option>
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
            className="w-full rounded-md bg-gray-600 px-3 py-1.5 text-base text-white outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        {/* SE(X)CCIÓN DE IMAGENES */}
        <div>
          <p className="text-amber-400 font-bold">Imágenes actuales:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {imgsActuales.map((img) => (
              <div key={img} className="relative">
                <img src={img} alt="preview" className="w-24 h-24 rounded" />
                <button
                  type="button"
                  onClick={() => eliminarImagen(img)}
                  className="absolute top-0 right-0 bg-red-600 text-white px-1 rounded"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-amber-400">
            Agregar imágenes nuevas:
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagenes}
              className="mt-2"
            />
          </label>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleGuardar}
            className="bg-green-600 px-3 py-1 rounded text-white"
          >
            Guardar
          </button>
          <button
            onClick={onCancelar}
            className="bg-gray-600 px-3 py-1 rounded text-white"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
