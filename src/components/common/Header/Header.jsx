import { Button } from "primereact/button";
import { useAuth } from "@/contexts/auth-context";
import { confirmDialog } from "primereact/confirmdialog";

export default function Header({ onMenuClick }) {
  const { profil, deconnexion } = useAuth();

  const dateDuJour = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  function demanderDeconnexion() {
    confirmDialog({
      message: "Voulez-vous vraiment vous déconnecter ?",
      header: "Déconnexion",
      icon: "pi pi-sign-out",
      acceptLabel: "Déconnexion",
      rejectLabel: "Annuler",
      acceptClassName: "p-button-danger",
      accept: deconnexion,
    });
  }

  return (
    <header className="sticky top-0 z-30 h-16 shrink-0 border-b bg-slate-800 border-slate-100  shadow-sm">
      <div className="flex h-full items-center px-4 md:px-6">
        <Button
          icon="pi pi-bars"
          text
          className="mr-3 shrink-0 text-slate-300 md:hidden"
          onClick={onMenuClick}
        />

        <h1 className="text-xl font-semibold text-slate-300">
          Gestion des devis
        </h1>

        <span className="absolute left-1/2 hidden -translate-x-1/2 text-sm text-slate-300 md:block">
          {dateDuJour}
        </span>

        <div className="ml-auto flex items-center gap-3">
          {profil?.pseudo && (
            <span className="hidden text-sm text-slate-300 sm:inline">
              {profil.pseudo}
            </span>
          )}
          <Button
            icon="pi pi-sign-out"
            label="Déconnexion"
            text
            className="text-slate-300"
            onClick={demanderDeconnexion}
          />
        </div>
      </div>
    </header>
  );
}
