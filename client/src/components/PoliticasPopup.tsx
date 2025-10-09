import type { Dispatch, SetStateAction } from "react";

interface PoliticasPopupProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export default function PoliticasPopup({ show, setShow }: PoliticasPopupProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-gray-800 p-6 rounded-xl max-w-lg w-full relative text-white">
        <h2 className="text-xl font-bold mb-4 text-center">Políticas de Cancelación</h2>
        <div className="flex flex-col gap-2">
          <p className="bg-gray-700 p-2 rounded">
            <strong>Flexible:</strong> en caso de una cancelación dentro de los últimos 7 días, el cliente deberá abonar el 30% de la reserva
          </p>
          <p className="bg-gray-700 p-2 rounded">
            <strong>Severa:</strong> en caso de cancelar entre los 30 y 7 días previos a la reserva, el cliente deberá abonar el 50% de la reserva. En caso de cancelar en los 7 días previos, el cliente deberá abonar el total.
          </p>
          <p className="bg-gray-700 p-2 rounded">
            <strong>Sin Devolución:</strong> en caso de cancelación, el cliente deberá abonar la reserva completa
          </p>
        </div>

        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 text-white hover:text-amber-500 text-xl font-bold cursor-pointer"
        >
          ×
        </button>
      </div>
    </div>
  );
}