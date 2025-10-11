import React from "react";

interface CampoPasswordUser {
  password: string;
  mostrarPassword: boolean;
  setMostrarPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CampoPassword({ password, mostrarPassword, setMostrarPassword }: CampoPasswordUser) {
  return (
    <div className="flex items-center gap-4 text-xl md:text-2xl text-gray-300">
      <span className="font-medium text-white w-32">Contraseña:</span>
      <span>{mostrarPassword ? password : "•".repeat(password.length)}</span>

      <button
        type="button"
        onClick={() => setMostrarPassword(prev => !prev)}
        className="text-gray-400 hover:text-white transition cursor-pointer"
        title={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5S14.76 17 12 17zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
          {mostrarPassword && <line x1="4" y1="20" x2="20" y2="4" stroke="currentColor" strokeWidth="2"/>}
        </svg>
      </button>

      <button
        type="button"
        className="text-gray-400 hover:text-white transition cursor-pointer"
        title="Editar contraseña"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 14v-2h7v2zm0-4V8h11v2zm0-4V4h11v2zm9 14v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-5.5 5.5zm7.5-6.575l-.925-.925zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45l-3.05 3.025zm3.525-3.525l-.475-.45l.925.925z"/>
        </svg>
      </button>
    </div>
  );
}