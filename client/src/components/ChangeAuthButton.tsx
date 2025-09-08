type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onClickFunc: () => void;
} & { message: string };

export function ChangeAuthButton({ onClickFunc, message, ...props }: Props) {
  return (
    <button
      type="submit"
      onClick={onClickFunc}
      {...props}
      className="flex w-full justify-center rounded-md px-3 py-1.5 font-semibold text-sm/6 text-white shadow-xs  focus-visible:outline-2  focus-visible:outline-offset-2"
    >
      {message}
    </button>
  );
}
