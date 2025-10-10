import { useState, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { useToast } from "../hooks/useToast";
import CampoEditableUser from "../components/userDatos/CampoEditableUser";
import CampoPassword from "../components/userDatos/CampoPasswordUser";
import BotonEliminarCuenta from "../components/userDatos/BotonEliminarCuenta";

interface Usuario {
  nombre: string;
  email: string;
  password: string;
}

export default function DatosUsuarioPage() {
  const { getId } = useUser();
  const userId = getId();
  const { toastError } = useToast();

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchUsuario = async () => {
      try {
        const res = await fetch(`http://localhost:8081/auth/datos-usuario/${userId}`);
        if (!res.ok) throw new Error("Error al recuperar usuario");
        const data = await res.json();

        if (!cancelled) {
          setUsuario({
            nombre: data.nombre,
            email: data.email,
            password: data.password,
          });
          setServerError(false);
        }
      } catch (err) {
        if (!cancelled) {
          setServerError(true);
          toastError("Hubo un error inesperado.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchUsuario();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-24 px-4">
        <span className="text-white text-xl">Cargando datos...</span>
      </div>
    );
  }

  if (serverError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-red-500 text-xl font-semibold">
          No se pudieron recuperar los datos del usuario.
        </span>
      </div>
    );
  }

  const actualizarCampo = async (campo: "nombre" | "email", valor: string) => {
    try {
      const endpointMap = {
        nombre: "modifyUserName",
        email: "modifyUserEmail",
      };

      const res = await fetch(
        `http://localhost:8081/auth/${endpointMap[campo]}/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ valor }),
        }
      );

      if (!res.ok) throw new Error(`No se pudo actualizar ${campo}`);

      setUsuario((prev) =>
        prev
          ? {
              ...prev,
              [campo]: valor,
            }
          : prev
      );
    } catch (err: any) {
      toastError(err.message || `Error al actualizar ${campo}`);
    }
  };

  return (
    <div className="flex justify-center pt-24 px-4 min-h-screen">
      <div className="flex flex-col w-full max-w-2xl h-[600px] p-12 bg-[#0f1a2a] rounded-3xl shadow-xl text-left">
        <div className="flex flex-col justify-between h-full space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white">
            Datos de mi cuenta
          </h2>

          <CampoEditableUser
            label="Usuario"
            valor={usuario!.nombre}
            tipo="nombre"
            onUpdate={(nuevoValor) => actualizarCampo("nombre", nuevoValor)}
          />

          <CampoEditableUser
            label="Email"
            valor={usuario!.email}
            tipo="email"
            onUpdate={(nuevoValor) => actualizarCampo("email", nuevoValor)}
          />

          <CampoPassword
            password={usuario!.password}
            mostrarPassword={mostrarPassword}
            setMostrarPassword={setMostrarPassword}
            userId={userId}
          />

          <div className="text-center">
            <BotonEliminarCuenta onEliminar={() => console.log("Eliminar cuenta")} />
          </div>
        </div>
      </div>
    </div>
  );
}