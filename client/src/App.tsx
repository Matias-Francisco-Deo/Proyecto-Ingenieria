import { AuthProvider } from "./contexts/AuthContext";
import { AppRoutes } from "./routes/App.routes";

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes></AppRoutes>
    </AuthProvider>
  );
}
