import { useState } from "react";

interface EliminarCuentaPopupProps {
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

export default function EliminarCuentaPopup({
  onConfirm,
  onClose,
}: EliminarCuentaPopupProps) {
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
        className="relative bg-gray-800 text-white p-6 rounded-xl shadow-lg flex flex-col items-center gap-2"
        style={{ minWidth: "300px" }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full border-2 border-amber-600 text-white font-bold text-xl cursor-pointer hover:bg-red-600"
        >
          X
        </button>

        <h2 className="text-2xl text-center mb-2 text-red-600">
          Eliminar cuenta
        </h2>
        <p className="text-center mb-4">
          ¿Está seguro que desea eliminar su cuenta? (Todas sus publicaciones
          también se darán de baja).
        </p>

        <button
          onClick={handleClick}
          className="bg-red-600 hover:bg-red-700 transition text-white font-medium px-4 py-2 rounded-lg md:text-xl cursor-pointer"
          disabled={loading}
        >
          {loading ? "Procesando..." : "Confirmar baja de mi cuenta"}
        </button>
      </div>
    </div>
  );
}
