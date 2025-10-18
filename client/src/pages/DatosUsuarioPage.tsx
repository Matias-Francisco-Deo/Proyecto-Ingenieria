import { useState, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { useToast } from "../hooks/useToast";
import CampoEditableUser from "../components/userDatos/CampoEditableUser";
import CampoPassword from "../components/userDatos/CampoPasswordUser";
import BotonEliminarCuenta from "../components/userDatos/BotonEliminarCuenta";
import EliminarCuentaPopup from "@/components/EliminarCuentaPopup";
import { useAuth } from "@/hooks/useAuth";

interface Usuario {
  nombre: string;
  email: string;
  password: string;
}

export default function DatosUsuarioPage() {
  const { logoutSPA } = useAuth();
  const { getId, setUsername } = useUser();
  const userId = getId();
  const { toastError } = useToast();
  const { logout } = useAuth();

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchUsuario = async (cancelled: boolean) => {
    try {
      console.log("Fetching usuario for id:", userId);
      const res = await fetch(`${API_URL}/auth/datos-usuario/${userId}`);
      if (!res.ok) throw new Error("Hubo un error inesperado.");
      const data = await res.json();

      if (!cancelled) {
        setUsuario({
          nombre: data.nombre,
          email: data.email,
          password: data.password,
        });
        setServerError(false);
      }
    } catch (err: unknown) {
      if (!cancelled) {
        setServerError(true);
        const message =
          err instanceof Error ? err.message : "Hubo un error inesperado.";
        toastError(message);
      }
    } finally {
      if (!cancelled) setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    fetchUsuario(cancelled);

    return () => {
      cancelled = true;
    };
  }, []);

  const actualizarCampo = async (campo: "nombre" | "email", valor: string) => {
    const endpointMap = {
      nombre: "modifyUserName",
      email: "modifyUserEmail",
    };
    try {
      const res = await fetch(
        `${API_URL}/auth/${endpointMap[campo]}/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ valor }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        toastError(data.error);
        logoutSPA();
        return;
      }

      setUsuario((prev) =>
        prev
          ? {
              ...prev,
              [campo]: valor,
            }
          : prev
      );

      if (campo === "nombre") {
        setUsername(valor);
      }
    } catch (error) {
      console.log(error);
      toastError("Hubo un error inesperado");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-24 px-4">
        <span className="text-white text-xl">Cargando datos...</span>
      </div>
    );
  }

  if (serverError || !usuario) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-red-500 text-xl font-semibold">
          No se pudieron recuperar los datos del usuario.
        </span>
      </div>
    );
  }

  async function handleConfirm() {
    try {
      const res = await fetch(`${API_URL}/auth/${userId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        toastError(data.error);
        if (data.error == "No existe el usuario que quiere eliminar.")
          logoutSPA();
        return;
      }
      logout();
      setShowDeletePopup(false);
    } catch (error) {
      console.error(error);
      toastError("Hubo un error inesperado.");
    }
  }

  return (
    <div className="flex justify-center pt-24 px-4 min-h-screen">
      <div className="flex flex-col w-full max-w-2xl h-[600px] p-12 bg-[#0f1a2a] rounded-3xl shadow-xl text-left">
        <div className="flex flex-col justify-between h-full space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white">
            Datos de mi cuenta
          </h2>

          <CampoEditableUser
            label="Usuario"
            valor={usuario.nombre}
            tipo="nombre"
            onUpdate={(nuevoValor) => actualizarCampo("nombre", nuevoValor)}
          />

          <CampoEditableUser
            label="Email"
            valor={usuario.email}
            tipo="email"
            onUpdate={(nuevoValor) => actualizarCampo("email", nuevoValor)}
          />

          <CampoPassword
            password={usuario.password}
            mostrarPassword={mostrarPassword}
            setMostrarPassword={setMostrarPassword}
            userId={userId}
          />

          <div className="text-center">
            <BotonEliminarCuenta onEliminar={() => setShowDeletePopup(true)} />

            {showDeletePopup && (
              <EliminarCuentaPopup
                onConfirm={handleConfirm}
                onClose={() => setShowDeletePopup(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
