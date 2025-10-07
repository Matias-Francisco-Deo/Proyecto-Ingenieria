import React, { useState } from "react";

interface ConfirmacionPagoPopupProps {
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

export default function ConfirmacionPagoPopup({ onConfirm, onClose }: ConfirmacionPagoPopupProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0" onClick={() => {}} />

      <div
        className="relative bg-gray-800 text-white p-6 rounded-xl shadow-lg flex flex-col items-center"
        style={{ minWidth: "300px" }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full border-2 border-amber-600 text-white font-bold text-xl cursor-pointer hover:bg-red-600"
        >
          X
        </button>

        <h2 className="text-2xl font-bold text-center mb-2">Confirmar pago</h2>
        <p className="text-center mb-4">
          ¿Confirma que el cliente realizó el pago de la reserva?
        </p>

        <button
          onClick={handleClick}
          className="bg-amber-600 text-white text-lg font-bold rounded-xl hover:bg-amber-700 py-2 w-1/2 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Procesando..." : "Confirmar pago"}
        </button>
      </div>
    </div>
  );
}