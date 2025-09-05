// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Header({ ...props }: HeaderProps) {
  return (
    <header {...props}>
      <div className="flex">Pepe</div>
    </header>
  );
}
