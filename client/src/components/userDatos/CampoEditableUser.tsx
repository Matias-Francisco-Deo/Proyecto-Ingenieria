import React, { useState, useRef, useEffect } from "react";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleGuardar = async () => {
    if (tipo === "email") {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(tempValue)) {
        setHasError(true);
        setErrorMessage("El mail debe ser del formato example@email.com");
        resetError();
        return;
      }
    } else if (tipo === "nombre") {
      const nombreRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]+$/;
      if (!nombreRegex.test(tempValue)) {
        setHasError(true);
        setErrorMessage("Escriba un nombre de usuario sin caracteres especiales");
        resetError();
        return;
      }
    }

    setHasError(false);
    setErrorMessage("");
    setLoading(true);

    if (onUpdate) {
      try {
        await onUpdate(tempValue);
        setEditing(false);
      }catch(err: any){
        setHasError(true);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    setEditing(false);
    setTempValue(valor);
    setHasError(false);
    setErrorMessage("");
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

  function resetError() {
    setTimeout(() => {
      setHasError(false);
      setErrorMessage("");
    }, 5000);
  }

  return (
    <div className="flex flex-col gap-1 text-xl md:text-2xl text-gray-300" ref={containerRef}>
      <div className="flex items-center gap-4">
        <span className="font-medium text-white w-32">{label}:</span>

        {editing ? (
          <>
            <input
              type="text"
              onKeyDown={(e) => {
                if (e.key === " ") e.preventDefault();
              }}
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className={`px-2 py-1 bg-gray-600 text-white rounded-md border-none focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
                hasError ? "border-red-500 border" : ""
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4 14v-2h7v2zm0-4V8h11v2zm0-4V4h11v2zm9 14v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-5.5 5.5zm7.5-6.575l-.925-.925zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45l-3.05 3.025zm3.525-3.525l-.475-.45l.925.925z" />
            </svg>
          </button>
        )}
      </div>

      {hasError && <span className="text-red-500 text-sm ml-32">{errorMessage}</span>}
    </div>
  );
}