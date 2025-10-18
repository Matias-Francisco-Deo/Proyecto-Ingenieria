import React, { useState, useRef, useEffect } from "react";
import { useToast } from "../../hooks/useToast";

interface CampoPasswordUser {
  password: string;
  mostrarPassword: boolean;
  setMostrarPassword: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | number;
}

export default function CampoPassword({
  password,
  mostrarPassword,
  setMostrarPassword,
  userId,
}: CampoPasswordUser) {
  const [editando, setEditando] = useState(false);
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { toastError } = useToast();

  const apiUrl = import.meta.env.VITE_API_URL;

  const [displayPassword, setDisplayPassword] = useState(password);

  const showError = (msg: string) => {
    toastError(msg);
    setHasError(true);
    setTimeout(() => setHasError(false), 3000);
  };

  const handleGuardar = async () => {
    if (!nuevaPassword.trim()) {
      showError("Ingrese una contraseña.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/auth/modifyUserPassword/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ valor: nuevaPassword }),
      });

      if (!res.ok) {
        const data = await res.json();
        toastError(data.error);
      }

      setDisplayPassword(nuevaPassword);
      setEditando(false);
      setNuevaPassword("");
      setHasError(false);
    } catch {
      toastError("Hubo un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    setEditando(false);
    setNuevaPassword("");
    setHasError(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        handleCancelar();
      }
    };
    if (editando) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [editando]);

  return (
    <div
      ref={wrapperRef}
      className="flex flex-col gap-1 text-xl md:text-2xl text-gray-300"
    >
      <div className="flex items-center gap-4">
        <span className="font-medium text-white w-32">Contraseña:</span>

        {editando ? (
          <div className="flex items-center gap-2">
            <input
              type={mostrarPassword ? "text" : "password"}
              placeholder="Nueva contraseña"
              onKeyDown={(e) => {
                if (e.key === " ") e.preventDefault();
              }}
              value={nuevaPassword}
              onChange={(e) => setNuevaPassword(e.target.value)}
              className={`px-2 py-1 bg-gray-600 text-white rounded-md border-2 transition-all duration-300 w-52 focus:outline-none focus:ring-2 ${
                hasError
                  ? "border-red-600 ring-red-600"
                  : "border-transparent focus:ring-indigo-600"
              }`}
              autoFocus
            />

            <button
              type="button"
              onClick={() => setMostrarPassword((prev) => !prev)}
              className="text-gray-400 hover:text-white transition cursor-pointer"
              title={
                mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5S14.76 17 12 17zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                {mostrarPassword && (
                  <line
                    x1="3"
                    y1="3"
                    x2="21"
                    y2="21"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                )}
              </svg>
            </button>

            <button
              type="button"
              onClick={handleGuardar}
              disabled={loading}
              className={`bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-md px-3 py-1 transition ${
                loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>

            <button
              type="button"
              onClick={handleCancelar}
              className="text-gray-400 hover:text-white transition cursor-pointer ml-1"
              title="Cancelar"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span>
              {mostrarPassword
                ? displayPassword
                : "•".repeat(displayPassword.length)}
            </span>

            <button
              type="button"
              onClick={() => setMostrarPassword((prev) => !prev)}
              className="text-gray-400 hover:text-white transition cursor-pointer ml-2"
              title={
                mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5S14.76 17 12 17zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                {mostrarPassword && (
                  <line
                    x1="3"
                    y1="3"
                    x2="21"
                    y2="21"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                )}
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setEditando(true)}
              className="text-gray-400 hover:text-white transition cursor-pointer"
              title="Editar contraseña"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4 14v-2h7v2zm0-4V8h11v2zm0-4V4h11v2zm9 14v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-5.5 5.5z" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
