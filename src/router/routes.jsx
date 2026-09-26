import MainLayout from "@/Layout/MainLayout";
import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";

import { AuthProvider } from "@/contexts/auth-context";

const Home = lazy(() => import("@/pages/Home/Home"));
const Error = lazy(() => import("@/pages/Error/Error"));
const Clients = lazy(() => import("@/pages/Clients/Clients"));
const Devis = lazy(() => import("@/pages/Devis/Devis"));
const Parameters = lazy(() => import("@/pages/Parametres/Parametres"));
const DevisDetails = lazy(() => import("@/pages/Devis/DevisDetails"));
const Login = lazy(() => import("@/pages/Login/Login"));
const Test = lazy(() => import("@/pages/Test/Test"));

function AppRoot() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

export const router = createBrowserRouter([
  {
    element: <AppRoot />,
    children: [
      {
        path: "/login",
        element: (
          <Suspense>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/",
        element: <MainLayout />,
        errorElement: (
          <Suspense>
            <Error />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense>
                <Home />
              </Suspense>
            ),
          },
          {
            path: "/clients",
            element: (
              <Suspense>
                <Clients />
              </Suspense>
            ),
          },
          {
            path: "devis",
            element: (
              <Suspense>
                <Devis />
              </Suspense>
            ),
          },
          {
            path: "parameters",
            element: (
              <Suspense>
                <Parameters />
              </Suspense>
            ),
          },
          {
            path: "devis/:numero",
            element: (
              <Suspense>
                <DevisDetails />
              </Suspense>
            ),
          },

          {
            path: "test",
            element: (
              <Suspense>
                <Test />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },

  {
    basename: import.meta.env.PROD ? "/mydevis" : "/",
  },
]);
