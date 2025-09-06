import { useUser } from "../hooks/useUser";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Header({ ...props }: HeaderProps) {
  const { getUsername } = useUser();

  return (
    <header {...props}>
      <div className="flex">{getUsername()}</div>
    </header>
  );
}
