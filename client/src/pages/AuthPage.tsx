// import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import LoginPage from "./LoginPage";
import SignInPage from "./SignInPage";
import { ChangeAuthButton } from "@/components/ChangeAuthButton";

export default function AuthPage() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  return (
    <div>
      <div className="text-white">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
            <div className="relative flex justify-center">
              <title>RESERVO - Sign In</title>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"></div>
            {isLoggingIn ? <LoginPage /> : <SignInPage />}

            <div className="flex flex-row gap-1">
              {/* sirve para cambiar entre los botones de login y sign in, con un booleano que actúa como switch. Los componentes los reutilizo y les cambio los mensajes :3 */}
              {isLoggingIn ? (
                <ChangeAuthButton
                  className=""
                  onClick={() => setIsLoggingIn(false)}
                >
                  Cambiar a Registrarse
                </ChangeAuthButton>
              ) : (
                <ChangeAuthButton
                  className=""
                  onClick={() => setIsLoggingIn(true)}
                >
                  Cambiar a Iniciar Sesión
                </ChangeAuthButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
