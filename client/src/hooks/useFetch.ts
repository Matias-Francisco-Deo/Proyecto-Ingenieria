import { useToast } from "./useToast";

export function useFetch() {
  const { toastError } = useToast();
  const errorHandledFetch = async (
    url: string,
    fetchBody: RequestInit,
    notOkFunc?: () => void,
    errorFunc?: () => void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    okFunc?: (data: any) => void
  ) => {
    try {
      const res = await fetch(url, fetchBody);
      /* NOT OK */
      if (!res.ok) {
        if (notOkFunc === undefined) return;
        notOkFunc();
        return;
      }

      /* OK */
      const data = await res.json();
      if (okFunc === undefined) return;
      okFunc(data);

      /* ERROR */
    } catch (error) {
      console.error(error);
      toastError("Hubo un error inesperado.");

      if (errorFunc === undefined) return;
      errorFunc();
    }
  };

  return {
    // avatar: data?.avatar,
    errorHandledFetch,
  };
}
