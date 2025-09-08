import { useAuth } from "../hooks/useAuth";
import { useState, type FormEvent } from "react";

export default function SignInPage() {
  const { login } = useAuth();

  /*
  Constante para usar directamente sobre el <p> definido arriba del input de email
  */
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  /* Se usa para poner en rojo aquellos campos con errores */
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasPasswordError, setHasPasswordError] = useState(false);

  /* Se usa para poner el mensaje de error abajo del último input */
  const [generalErrorMessage, setGeneralErrorMessage] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    /*
    Toma los datos de los input y los envía al backend a /auth
    También si algo falla muestra el error (en este caso encima del campo de email)
    */

    const form = event.target as HTMLFormElement;
    const password = form.elements.namedItem("password") as HTMLInputElement;
    const email = form.elements.namedItem("email") as HTMLInputElement;

    const passwordIsBlank = password.value == "";
    const emailIsBlank = email.value == "";

    /* Pone en rojo a los campos que falten  */
    checkHasNoBlanks();

    /* Si faltan campos, tira error */
    if (passwordIsBlank || emailIsBlank) {
      setGeneralErrorMessage("Complete los campos faltantes.");
      resetAllErrors();
      return;
    }

    /* Si el formato del mail es erróneo, tira error */
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const hasWrongEmailFormat = !emailRegex.test(email.value);

    if (hasWrongEmailFormat) {
      setHasEmailError(true);
      setEmailErrorMessage("El mail debe ser del formato example@email.com");
      resetAllErrors();
      return;
    }

    const errorMessage = await login(email.value, password.value);

    if (errorMessage.error) {
      console.error(errorMessage);

      setGeneralErrorMessage(errorMessage.error);
      setHasPasswordError(true);
      setHasEmailError(true);
      resetAllErrors();

      return;
    }

    function checkHasNoBlanks() {
      if (passwordIsBlank) {
        setHasPasswordError(true);
      }

      if (emailIsBlank) {
        setHasEmailError(true);
      }
    }
  }

  return (
    <form method="POST" className="space-y-6" onSubmit={handleLogin} noValidate>
      <p>
        Utilice sus credenciales para iniciar sesión. ¿Todavía no tiene cuenta?
        Regístrese.
      </p>
      <div>
        <label htmlFor="email" className="block font-medium text-sm/6">
          Email
        </label>
        {hasEmailError && (
          <p className="mt-2 text-sm text-red-600">{emailErrorMessage}</p>
        )}
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`${
              hasEmailError ? "inputError" : ""
            } loginInput -outline-offset-1 focus:-outline-offset-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1  focus:outline-2 focus:outline-indigo-600 sm:text-sm/6`}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block font-medium text-sm/6">
            Contraseña
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className={`${
              hasPasswordError ? "inputError" : ""
            } loginInput -outline-offset-1 focus:-outline-offset-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1  focus:outline-2 focus:outline-indigo-600 sm:text-sm/6`}
          />
          {generalErrorMessage && (
            <p className="mt-2 text-sm text-red-600">{generalErrorMessage}</p>
          )}
        </div>
      </div>

      <div className="flex flex-row gap-1">
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-amber-600 px-3 py-1.5 font-semibold text-sm/6 text-white shadow-xs hover:bg-amber-500 focus-visible:outline-2 focus-visible:outline-amber-600 focus-visible:outline-offset-2"
        >
          Iniciar Sesión
        </button>
      </div>
    </form>
  );

  function resetAllErrors() {
    setTimeout(() => {
      setHasEmailError(false);
      setHasPasswordError(false);
      setGeneralErrorMessage("");
    }, 3000);
  }
}
