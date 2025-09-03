import { MainLayout } from "@/layouts/MainLayout";
import { Suspense, lazy } from "react";
import { Route, Switch } from "wouter";
// import { ProtectedRoute } from "./ProtectedRoute";

// Pages
// const HomePage = lazy(() => import("../pages/HomePage"));
// const GifsDetails = lazy(() => import("../pages/GifDetails"));
// const SearchPage = lazy(() => import("../pages/SearchPage"));
// const Page404 = lazy(() => import("../pages/Page404"));
// const UploadPage = lazy(() => import("../pages/UploadPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
// const UserGifsPage = lazy(() => import("../pages/UserGifsPage"));

export function AppRoutes() {
  return (
    <MainLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {/* Rutas protegidas */}

          <Route path="/" component={LoginPage} />
          {/* <Route path="/home" component={HomePage} />

          <Route path="/search/:query?" component={SearchPage} />
          <Route path="/gif/:id" component={GifsDetails} />
          <Route path="/login" component={LoginPage} />
          <Route path="/user/:id" component={UserGifsPage} />

          <ProtectedRoute path="/upload" component={UploadPage} /> */}

          {/* Ruta 404 */}

          {/* <Route component={Page404} /> */}
        </Switch>
      </Suspense>
    </MainLayout>
  );
}
