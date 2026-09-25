
import Sidebar from "@/components/common/Sidebar/Sidebar";
import { Button } from "primereact/button";
import { useNavigate, useRouteError } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();
  const error = useRouteError();

  const devisIntrouvable =
    error?.status === 404 &&
    error?.statusText === "Devis introuvable";

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="text-center flex flex-col flex-1 items-center justify-center">
        {error?.status === 404 ? (
          <>
            <h1 className="text-4xl font-bold">
              {devisIntrouvable ? "DEVIS INTROUVABLE" : "PAGE INTROUVABLE"}
            </h1>

            <p className="mt-8 text-slate-400 text-lg">
              {devisIntrouvable
                ? "Le devis que vous recherchez n'existe pas ou n'est plus disponible."
                : "La page que vous recherchez a peut-être été supprimée, déplacée ou n'existe plus."}
            </p>

            {devisIntrouvable && import.meta.env.DEV && error?.message && (
              <p className="mt-4 text-sm text-slate-500">
                mode dev - erreur :{" "}
                <span className="text-rose-600">{error.message}</span>
              </p>
            )}
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold">ERREUR</h1>

            <p className="mt-8 text-slate-400 text-lg">
              Une erreur inattendue s'est produite
            </p>

            <p className="mt-2 text-slate-400 text-lg">
              Merci de prévenir l'administrateur du site.
            </p>

            {import.meta.env.DEV && error?.message && (
              <p className="mt-4 text-sm text-slate-500">
                mode dev - erreur :{" "}
                <span className="text-rose-600">{error.message}</span>
              </p>
            )}
          </>
        )}

        <div className="mt-10">
          <Button
            label="Retour à l'accueil"
            icon="pi pi-home"
            className="bg-teal-600 hover:bg-teal-700 border-none"
            onClick={() => navigate("/")}
          />
        </div>
      </div>
    </div>
  );
}

