import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";
import { Link, useLocation } from "wouter";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Header({ ...props }: HeaderProps) {
  const { logout } = useAuth();

  const { getUsername } = useUser();
  const { isAuthenticated } = useAuth();

  return (
    <header
      {...props}
      className="sticky top-0 z-50 flex items-center justify-between px-4 py-2 bg-amber-600 text-white"
    >
      <div className="flex items-center gap-4">
        {getUsername()}

        <Link
          to="/home"
          className="bg-amber-500 hover:bg-amber-700 text-white px-3 py-1 rounded transition-colors"
        >
          Inicio
        </Link>

        <Link
          to={isAuthenticated ? "/alta-inmueble" : "/signin"}
          className="bg-amber-500 hover:bg-amber-700 text-white px-3 py-1 rounded transition-colors"
        >
          Dar de alta una propiedad
        </Link>

        <Link
          to={isAuthenticated ? "/mis-peticiones" : "/signin"}
          className="bg-amber-500 hover:bg-amber-700 text-white px-3 py-1 rounded transition-colors"
        >
          Ver peticiones
        </Link>
      </div>

      {isAuthenticated ? (
        <button
          onClick={logout}
          className="bg-amber-500 hover:bg-amber-700 text-white px-3 py-1 rounded transition-colors"
        >
          Cerrar Sesión
        </button>
      ) : (
        <Link
          to="/signin"
          className="bg-amber-500 hover:bg-amber-700 text-white px-3 py-1 rounded transition-colors"
        >
          Iniciar Sesión
        </Link>
      )}
    </header>
  );
}
