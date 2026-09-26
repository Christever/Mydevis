import Loader from "@/components/common/Loader";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "primereact/button";

export default function Test() {
  const { user, profil, loadingAuth, deconnexion } = useAuth();

  if (loadingAuth) {
    return <Loader />;
  }

  return (
    <div>
      <h2>Test Firebase</h2>

      <pre>{JSON.stringify(profil, null, 2)}</pre>

      <p>Utilisateur : {user?.email ?? "Aucun"}</p>

      <p>Organisation : {profil?.organisationId ?? "Aucune"}</p>

      <p>Rôle : {profil?.role ?? "Aucun"}</p>

      <Button label="Déconnexion" onClick={deconnexion} className="mt-10" />
    </div>
  );
}
