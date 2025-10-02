import { toast } from "react-toastify";

export function useToast() {
  const toastError = (message: string) =>
    toast.error(message, {
      theme: "colored",
    });

  return {
    toastError,
  };
}
