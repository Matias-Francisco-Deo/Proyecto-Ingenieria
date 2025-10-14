import ReservasPage from "@/pages/ReservasPage";
import { MainLayout } from "../layouts/MainLayout";
import { Suspense, lazy } from "react";
import { Route, Switch } from "wouter";
import { ProtectedRoute } from "./ProtectedRoute";

// Pages
const HomePage = lazy(() => import("../pages/HomePage"));
const AuthPage = lazy(() => import("../pages/AuthPage"));
const PropertyPage = lazy(() => import("../pages/PropertyPage"));
const Publicacion = lazy(() => import("../pages/Publicacion"));
const PeticionForm = lazy(() => import("../pages/HacerReservaPage"));
const PetitionsPage = lazy(() => import("../pages/PetitionsPage"));
const CancelarReservaPage = lazy(() => import("../pages/CancelarReservaPage"));
const PublicacionesPage = lazy(() => import("../pages/ListaDePublicaciones"));
const PetitionPage = lazy(() => import("../pages/PetitionPage"));
const DatosUsuarioPage = lazy(() => import("../pages/DatosUsuarioPage"));

const Page404 = () => <div>Página no encontrada</div>;

export function AppRoutes() {
  return (
    <MainLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/home" component={HomePage} />
          <Route path="/signin" component={AuthPage} />
          <ProtectedRoute path="/alta-inmueble" component={PropertyPage} />
          <Route path="/publicacion" component={Publicacion} />
          <ProtectedRoute path="/hacer-reserva" component={PeticionForm} />
          <ProtectedRoute path="/peticion/pendiente" component={PetitionPage} />
          <ProtectedRoute
            path="/mis-peticiones/:estado"
            component={PetitionsPage}
          />
          <ProtectedRoute path="/mis-peticiones" component={PetitionsPage} />
          <ProtectedRoute path="/reservas/:estado" component={ReservasPage} />
          <ProtectedRoute path="/reservas" component={ReservasPage} />
          <ProtectedRoute
            path="/reserva/:estado"
            component={CancelarReservaPage}
          />

          <ProtectedRoute
            path="/mis-publicaciones"
            component={PublicacionesPage}
          />

          <ProtectedRoute path="/mis-datos" component={DatosUsuarioPage} />

          <Route component={Page404} />
        </Switch>
      </Suspense>
    </MainLayout>
  );
}
