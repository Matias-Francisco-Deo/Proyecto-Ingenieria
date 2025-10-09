import { useState } from "react";

interface Usuario {
  nombre: string;
  email: string;
  password: string;
}

export default function DatosUsuarioPage() {
  const [usuario] = useState<Usuario>({
    nombre: "Joel Cabral",
    email: "joel@example.com",
    password: "123456",
  });
  const [mostrarPassword, setMostrarPassword] = useState(false);

  return (
    <div className="flex justify-center pt-24 px-4 min-h-screen">
      <div className="flex flex-col w-full max-w-2xl h-[600px] p-12 bg-[#0f1a2a] rounded-3xl shadow-xl text-left">
        <div className="flex flex-col justify-between h-full space-y-6">
          
          {/* Título */}
          <h2 className="text-3xl md:text-4xl font-bold text-center">Datos de mi cuenta</h2>

          {/* Usuario */}
          <div className="flex items-center gap-4 text-xl md:text-2xl text-gray-300">
            <span className="font-medium text-white w-32">Usuario:</span>
            <span>{usuario.nombre}</span>
            <button
              type="button"
              className="text-gray-400 hover:text-white transition cursor-pointer"
              title="Editar usuario"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 14v-2h7v2zm0-4V8h11v2zm0-4V4h11v2zm9 14v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-5.5 5.5zm7.5-6.575l-.925-.925zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45l-3.05 3.025zm3.525-3.525l-.475-.45l.925.925z" />
              </svg>
            </button>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4 text-xl md:text-2xl text-gray-300">
            <span className="font-medium text-white w-32">Email:</span>
            <span>{usuario.email}</span>
            <button
              type="button"
              className="text-gray-400 hover:text-white transition cursor-pointer"
              title="Editar email"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 14v-2h7v2zm0-4V8h11v2zm0-4V4h11v2zm9 14v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-5.5 5.5zm7.5-6.575l-.925-.925zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45l-3.05 3.025zm3.525-3.525l-.475-.45l.925.925z" />
              </svg>
            </button>
          </div>

          {/* Contraseña */}
          <div className="flex items-center gap-4 text-xl md:text-2xl text-gray-300">
            <span className="font-medium text-white w-32">Contraseña:</span>
            <span>{mostrarPassword ? usuario.password : "•".repeat(usuario.password.length)}</span>

            <button
              type="button"
              onClick={() => setMostrarPassword((prev) => !prev)}
              className="text-gray-400 hover:text-white transition cursor-pointer"
              title={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                {/* Ojo */}
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5S14.76 17 12 17zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                {/* Línea de tachado solo si se descensura */}
                {mostrarPassword && (
                  <line x1="4" y1="20" x2="20" y2="4" stroke="currentColor" strokeWidth="2" />
                )}
              </svg>
            </button>

            <button
              type="button"
              className="text-gray-400 hover:text-white transition cursor-pointer"
              title="Editar contraseña"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 14v-2h7v2zm0-4V8h11v2zm0-4V4h11v2zm9 14v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-5.5 5.5zm7.5-6.575l-.925-.925zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45l-3.05 3.025zm3.525-3.525l-.475-.45l.925.925z" />
              </svg>
            </button>
          </div>

          {/* Botón eliminar cuenta */}
          <div className="text-center">
            <button className="bg-red-600 hover:bg-red-700 transition text-white font-medium px-6 py-3 rounded-lg text-xl md:text-2xl cursor-pointer">
              Eliminar cuenta
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}