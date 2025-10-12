import { useAuth } from "../hooks/useAuth";
import { useState, type FormEvent } from "react";
import { useToast } from "@/hooks/useToast";

type SignInResponse = {
    error?: string;
    message?: string;
};

export default function SignInPage() {
    const { login, signIn } = useAuth();
    const { toastError } = useToast();

    const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
    const [hasEmailError, setHasEmailError] = useState<boolean>(false);
    const [hasUsernameError, setHasUsernameError] = useState<boolean>(false);
    const [hasPasswordError, setHasPasswordError] = useState<boolean>(false);
    const [generalErrorMessage, setGeneralErrorMessage] = useState<string>("");

    async function handleLogin(
        event: FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const usernameInput = form.elements.namedItem(
            "username"
        ) as HTMLInputElement;
        const passwordInput = form.elements.namedItem(
            "password"
        ) as HTMLInputElement;
        const emailInput = form.elements.namedItem("email") as HTMLInputElement;

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const email = emailInput.value.trim();

        // Validación de campos vacíos
        const usernameIsBlank = username === "";
        const passwordIsBlank = password === "";
        const emailIsBlank = email === "";

        setHasUsernameError(usernameIsBlank);
        setHasPasswordError(passwordIsBlank);
        setHasEmailError(emailIsBlank);

        if (usernameIsBlank || passwordIsBlank || emailIsBlank) {
            toastError("Complete los campos faltantes.");
            setGeneralErrorMessage("Complete los campos faltantes.");
            resetBlankError();
            return;
        }

        // Validación de formato de email
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            setHasEmailError(true);
            setEmailErrorMessage(
                "El mail debe ser del formato example@email.com"
            );
            toastError("Formato de email inválido.");
            resetEmailError();
            return;
        }

        try {
            const response: SignInResponse = await signIn(
                username,
                password,
                email
            );

            if (response.error) {
                toastError(response.error);
                setHasEmailError(true);
                setEmailErrorMessage(response.error);
                resetEmailError();
                return;
            }

            // Login automático después del registro
            await login(email, password);
        } catch (error) {
            console.error(error);
            toastError("Hubo un error inesperado.");
            setGeneralErrorMessage("Hubo un error inesperado.");
            resetBlankError();
        }
    }

    function resetBlankError() {
        setTimeout(() => {
            setHasEmailError(false);
            setHasPasswordError(false);
            setHasUsernameError(false);
            setGeneralErrorMessage("");
        }, 3000);
    }

    function resetEmailError() {
        setTimeout(() => {
            setHasEmailError(false);
            setEmailErrorMessage("");
        }, 5000);
    }

    return (
        <form
            method="POST"
            className="space-y-6"
            onSubmit={handleLogin}
            noValidate
        >
            <p>¡Únase a nuestra comunidad!</p>

            <div>
                <label
                    htmlFor="email"
                    className="block font-medium text-sm/6"
                >
                    Email
                </label>
                {hasEmailError && (
                    <p className="mt-2 text-sm text-red-600">
                        {emailErrorMessage}
                    </p>
                )}
                <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className={`loginInput block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6 ${
                            hasEmailError ? "inputError" : ""
                        }`}
                    />
                </div>
            </div>

            <div>
                <label
                    htmlFor="username"
                    className="block font-medium text-sm/6"
                >
                    Nombre de usuario
                </label>
                <div className="mt-2">
                    <input
                        id="username"
                        name="username"
                        autoComplete="username"
                        className={`loginInput block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6 ${
                            hasUsernameError ? "inputError" : ""
                        }`}
                    />
                </div>
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="block font-medium text-sm/6"
                >
                    Contraseña
                </label>
                <div className="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        className={`loginInput block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6 ${
                            hasPasswordError ? "inputError" : ""
                        }`}
                    />
                    {generalErrorMessage && (
                        <p className="mt-2 text-sm text-red-600">
                            {generalErrorMessage}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex flex-row gap-1">
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-amber-800 px-3 py-1.5 font-semibold text-sm/6 text-white shadow-xs hover:bg-amber-500 focus-visible:outline-2 focus-visible:outline-amber-600 focus-visible:outline-offset-2"
                >
                    Registrarse
                </button>
            </div>
        </form>
    );
}
