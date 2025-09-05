import LoginPage from "./LoginPage";
import SignInPage from "./SignInPage";
// use auth context
// const { isAuthed, setIsAuthed } = useState(false);

// setIsAuthed(localStorage.getItem("isAuthed"));

export default function AuthPage() {
  return true ? <LoginPage /> : <SignInPage />;
}
