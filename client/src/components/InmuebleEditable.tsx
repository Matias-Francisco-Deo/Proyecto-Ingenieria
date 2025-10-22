import { useEffect, useState } from "react";
import type { Inmueble } from "@/types/types";
import Dias from "./Dias";
import { toast } from "react-toastify";
import PoliticasPopup from "./PoliticasPopup";

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
  const days = new Set(inmueble.availableDays);
  const [selectedDays, setSelectedDays] = useState<Set<string>>(days);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setFormData(inmueble);
    setSelectedDays(new Set(inmueble.availableDays));
  }, [inmueble]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};

    const requiredFields = [
      "name",
      "price",
      "start",
      "end",
      "ubication",
      "street",
      "number",
      "condition",
      "capacity",
      "description",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field as keyof Inmueble]) {
        newErrors[field] = true;
        toast.error("Faltan campos por llenar");
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleGuardar = async () => {
    if (!validateForm()) return;

    onGuardar({
      ...formData,
      availableDays: Array.from(selectedDays),
    });
  };

  const inputClass = (name: string) =>
    `rounded-md bg-gray-600 px-3 py-1.5 text-base text-white outline-none focus:ring-2 ${
      errors[name]
        ? "border-2 border-red-500 focus:ring-red-500"
        : "focus:ring-indigo-600"
    }`;

  return (
    <div className="space-y-3">
      <div className="space-y-4 p-4 bg-gray-800 rounded-lg">
        {/* Precio */}
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
              if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
            }}
            className={`no-spin ${inputClass("price")}`}
          />
        </div>

        {/* Horario */}
        <div className="flex flex-col gap-1 text-amber-400">
          <label>Horario:</label>
          <div className="flex gap-2">
            <input
              type="time"
              name="start"
              step="3600"
              value={formData.start}
              onChange={handleChange}
              className={`no-time-picker flex-[1] min-w-[90px] ${inputClass(
                "start"
              )}`}
            />
            <input
              type="time"
              name="end"
              step="3600"
              value={formData.end}
              onChange={handleChange}
              className={`no-time-picker flex-[1] min-w-[90px] ${inputClass(
                "end"
              )}`}
            />
          </div>
        </div>

        {/* Dirección */}
        <div className="flex flex-col gap-1 text-amber-400">
          <label>Dirección:</label>
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              name="ubication"
              value={formData.ubication}
              onChange={handleChange}
              placeholder="Localidad"
              className={`flex-[2] min-w-[120px] ${inputClass("ubication")}`}
            />
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="Calle"
              className={`flex-[1] min-w-[90px] ${inputClass("street")}`}
            />
            <input
              type="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="Altura"
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
              className={`no-spin flex-[1] min-w-[90px] ${inputClass(
                "number"
              )}`}
            />
          </div>
        </div>

        {/* Días */}
        <div
          className={
            errors["availableDays"]
              ? "border-2 border-red-500 p-2 rounded-md"
              : ""
          }
        >
          <Dias selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
        </div>

        {/* Condiciones */}
        <div className="flex flex-col gap-1 text-amber-400">
          <label htmlFor="condition">Condiciones:</label>
          <input
            id="condition"
            type="text"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            placeholder="Condiciones"
            className={inputClass("condition")}
          />
        </div>

        {/* Cancelación */}
        <div className="flex flex-row gap-1 text-amber-400 relative">
          <div className="flex-[1]">
            <label htmlFor="cancellation">Política de cancelación:</label>
            <div className="flex items-center gap-2">
              <select
                name="cancellation"
                id="cancellation"
                value={formData.cancellation}
                onChange={handleChange}
                className={inputClass("cancellation")}
              >
                <option value="Sin_Devolucion">Sin devolución</option>
                <option value="Flexible">Flexible</option>
                <option value="Severo">Severo</option>
              </select>
              <button
                type="button"
                onClick={() => setShowPopup(true)}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-amber-500 transition cursor-pointer"
                aria-label="Información sobre políticas de cancelación"
              >
                ?
              </button>
            </div>
            <PoliticasPopup show={showPopup} setShow={setShowPopup} />
          </div>

          <div className="flex-[1]">
            <label htmlFor="capacity">Capacidad</label>
            <input
              id="capacity"
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
              }}
              className={`no-spin  ${inputClass("capacity")}`}
            />
          </div>
        </div>

        {/* Descripción */}
        <div className="flex flex-col gap-1 text-amber-400">
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Agrega una descripción"
            className={`w-full h-25 ${inputClass("description")}`}
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
