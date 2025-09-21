import { MainLayout } from "../layouts/MainLayout";
import { Suspense, lazy } from "react";
import { Route, Switch } from "wouter";

// Pages
const HomePage = lazy(() => import("../pages/HomePage"));

// const Page404 = lazy(() => import("../pages/Page404"));

const AuthPage = lazy(() => import("../pages/AuthPage"));
const PropertyPage = lazy(() => import("../pages/PropertyPage"));
const Publicacion = lazy(() => import("../pages/Publicacion"));
const PeticionForm = lazy(() => import("../pages/PeticionForm"));
const PetitionsPage = lazy(() => import("../pages/PetitionsPage"));
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
          <Route path="/hacer-reserva" component={PeticionForm} />
          <Route path="/peticion/pendiente" component={ReservaPendientePage} />

          <Route path="/mis-peticiones/:estado" component={PetitionsPage} />
          <Route path="/mis-peticiones" component={PetitionsPage} />
          {/* Rutas protegidas */}
          {/* <Route path="/home" component={HomePage} />

          <Route path="/search/:query?" component={SearchPage} />
          <Route path="/gif/:id" component={GifsDetails} />
          <Route path="/login" component={LoginPage} />
          <Route path="/user/:id" component={UserGifsPage} />

          <ProtectedRoute path="/upload" component={UploadPage} /> */}

          {/* Ruta 404 */}
          {/* Ruta 404 */}

          <Route component={Page404} />
        </Switch>
      </Suspense>
    </MainLayout>
  );
}
