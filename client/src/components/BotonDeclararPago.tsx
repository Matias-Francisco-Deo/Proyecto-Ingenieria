import { useState } from "react";
import ConfirmacionPagoPopup from "./ConfirmacionPagoPopup"; // renombrado al nuevo componente

interface BotonDeclararPagoProps {
  reservaId: number | string;
  onPagoDeclarado: () => void;
}

export default function BotonDeclararPago({ reservaId, onPagoDeclarado }: BotonDeclararPagoProps) {
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8081/peticion/declararPago/${reservaId}`, {
        method: "PATCH",
      });

      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

      onPagoDeclarado();
      setShowPopup(false);

    } catch (error) {
      console.error(error);
      alert("No se pudo declarar el pago.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={(e) => { e.stopPropagation(); e.preventDefault(); setShowPopup(true); }}
        className="mt-1 px-4 py-2 bg-amber-600 text-white text-lg font-bold rounded-xl hover:bg-amber-700 disabled:opacity-50 cursor-pointer"
        disabled={loading}
      >
        {loading ? "Procesando..." : "Declarar Pago Realizado"}
      </button>

      {showPopup && (
        <ConfirmacionPagoPopup
          onConfirm={handleConfirm}
          onClose={() => setShowPopup(false)} // coincide con el nombre de la prop del cartel
        />
      )}
    </>
  );
}