import MainLayout from "@/Layout/MainLayout";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("@/pages/Home/Home"));
const Error = lazy(() => import("@/pages/Error/Error"));
const Clients = lazy(() => import("@/pages/Clients/Clients"));
const Devis = lazy(() => import("@/pages/Devis/Devis"));
const Parameters = lazy(() => import("@/pages/Parametres/Parametres"));
const DevisDetails = lazy(() => import("@/pages/Devis/DevisDetails"));
const Test = lazy(() => import("@/pages/Test/Test"));

export const router = createBrowserRouter(
  [
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
  {
    basename: import.meta.env.PROD ? "/mydevis" : "/",
  },
);
