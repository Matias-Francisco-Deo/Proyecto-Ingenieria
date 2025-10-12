import React, { useState, useRef, useEffect } from "react";
import { useToast } from "../../hooks/useToast";

interface CampoEditableUserProps {
  label: string;
  valor: string;
  tipo?: "nombre" | "email";
  onEdit?: () => void;
  onUpdate?: (nuevoValor: string) => Promise<void>;
}

export default function CampoEditableUser({
  label,
  valor,
  tipo = "nombre",
  onEdit,
  onUpdate,
}: CampoEditableUserProps) {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(valor);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toastError } = useToast();

  const handleGuardar = async () => {

    if (tipo === "email") {
      if (!tempValue.trim()) return showError("Ingrese un Email");
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(tempValue)) return showError("El mail debe ser del formato example@email.com");
    } else if (tipo === "nombre") {
      if (!tempValue.trim()) return showError("Ingrese un nombre");
      const nombreRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]+$/;
      if (!nombreRegex.test(tempValue)) return showError("Escriba un nombre de usuario sin caracteres especiales");
    }

    setHasError(false);
    setLoading(true);

    if (onUpdate) {
      try {
        await onUpdate(tempValue);
        setEditing(false);
      } catch (err: any) {
        showError(err.message || "Hubo un error inesperado.");

      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const showError = (msg: string) => {
    toastError(msg);
    setHasError(true);
    setTimeout(() => setHasError(false), 3000);
  };

  const handleCancelar = () => {
    setEditing(false);
    setTempValue(valor);
    setHasError(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleCancelar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [valor]);

  return (
    <div className="flex flex-col gap-1 text-xl md:text-2xl text-gray-300" ref={containerRef}>
      <div className="flex items-center gap-4">
        <span className="font-medium text-white w-32">{label}:</span>

        {editing ? (
          <>
            <input
              type="text"
              onKeyDown={(e) => e.key === " " && e.preventDefault()}
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className={`px-2 py-1 bg-gray-600 text-white rounded-md border transition-all duration-300 focus:outline-none focus:ring-2 ${
                hasError
                  ? "border-red-600 ring-red-600"
                  : "border-transparent focus:ring-indigo-600"
              }`}
            />
            <button
              type="button"
              onClick={handleGuardar}
              disabled={loading}
              className={`bg-amber-500 px-3 py-1 rounded-md transition text-white font-semibold ${
                loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
            <button
              type="button"
              onClick={handleCancelar}
              className="text-gray-400 hover:text-white transition cursor-pointer"
              title="Cancelar"
            >
              ✕
            </button>
          </>
        ) : (
          <span>{valor}</span>
        )}

        {!editing && (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-gray-400 hover:text-white transition cursor-pointer"
            title={`Editar ${label.toLowerCase()}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 14v-2h7v2zm0-4V8h11v2zm0-4V4h11v2zm9 14v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-5.5 5.5z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}