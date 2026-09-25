import Loader from "@/components/common/Loader";
import { useAuth } from "@/contexts/auth-context";

export default function Home() {
  const { user, profil, loadingAuth } = useAuth();

  if (loadingAuth) {
    return <Loader/>
  }

  return (
    <div>
      <p>Utilisateur : {user?.email}</p>
      <p>Organisation : {profil?.organisationId}</p>
      <p>Rôle : {profil?.role}</p>
    </div>
  );
}
