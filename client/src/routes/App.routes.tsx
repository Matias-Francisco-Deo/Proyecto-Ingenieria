import { MainLayout } from "../layouts/MainLayout";
import { Suspense, lazy } from "react";
import { Route, Switch } from "wouter";
// import { ProtectedRoute } from "./ProtectedRoute";

// Pages
const HomePage = lazy(() => import("../pages/HomePage"));
// const GifsDetails = lazy(() => import("../pages/GifDetails"));
// const SearchPage = lazy(() => import("../pages/SearchPage"));
// const Page404 = lazy(() => import("../pages/Page404"));
// const UploadPage = lazy(() => import("../pages/UploadPage"));
// const LoginPage = lazy(() => import("../pages/LoginPage"));
const AuthPage = lazy(() => import("../pages/AuthPage"));
const PropertyPage = lazy(() => import("../pages/PropertyPage"));
const Publicacion = lazy(() => import("../pages/Publicacion"));
const PeticionForm = lazy(() => import("../pages/PeticionForm"));
const ReservaPendientePage = lazy(
  () => import("../pages/ReservaPendientePage")
);
const Page404 = () => <div>Page Not Found</div>;

export function AppRoutes() {
  return (
    <MainLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/home" component={HomePage} />
          <Route path="/signin" component={AuthPage} />
          <Route path="/alta-inmueble" component={PropertyPage} />
          <Route path="/publicacion" component={Publicacion} />
          <Route path="/peticion" component={PeticionForm} />
          <Route path="/peticion/pendiente" component={ReservaPendientePage} />
          {/* Rutas protegidas */}
          {/* <Route path="/home" component={HomePage} />

          <Route path="/search/:query?" component={SearchPage} />
          <Route path="/gif/:id" component={GifsDetails} />
          <Route path="/login" component={LoginPage} />
          <Route path="/user/:id" component={UserGifsPage} />

          <ProtectedRoute path="/upload" component={UploadPage} /> */}

          {/* Ruta 404 */}

          <Route component={Page404} />
        </Switch>
      </Suspense>
    </MainLayout>
  );
}
