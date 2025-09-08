import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";
import { Link, useLocation } from 'wouter'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Header({ ...props }: HeaderProps) {
  const { logout } = useAuth();

  const { getUsername } = useUser();

  return (
    <header {...props}>
      <div className="flex">{getUsername()}</div>
      <div className="flex">
        <Link type="button" to="/alta-inmueble">
          Dar de alta un sitio
        </Link>
      </div>
      <button
        onClick={logout}
        className="bg-amber-500 h-1/4 absolute right-0 px-2.5"
      >
        Logout
      </button>
    </header>
  );
}
