import { useAuth } from "../hooks/useAuth";
import LoginPage from "./LoginPage";
import SignInPage from "./SignInPage";

export default function AuthPage() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <LoginPage /> : <SignInPage />;
}
