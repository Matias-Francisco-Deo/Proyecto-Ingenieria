type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function ChangeAuthButton({ ...props }: Props) {
  return (
    <button
      type="submit"
      {...props}
      className="flex w-full justify-center rounded-md px-3 py-1.5 font-semibold text-sm/6 text-white shadow-xs  focus-visible:outline-2  focus-visible:outline-offset-2"
    ></button>
  );
}
