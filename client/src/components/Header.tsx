import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";
import { Link, useLocation } from 'wouter'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Header({ ...props }: HeaderProps) {
  const { logout } = useAuth();

  const { getUsername } = useUser();

  return (
    <header
      {...props}
      className="sticky top-0 z-50 flex items-center justify-between px-4 py-2 bg-amber-600 text-white"
    >
      <div className="flex items-center gap-4">
        {getUsername()}

        <Link
          to="/alta-inmueble"
          className="bg-amber-500 hover:bg-amber-700 text-white px-3 py-1 rounded transition-colors"
        >
          Dar de alta un sitio
        </Link>
      </div>

      <button
        onClick={logout}
        className="bg-amber-500 hover:bg-amber-700 text-white px-3 py-1 rounded transition-colors"
      >
        Logout
      </button>
    </header>
  );
}