import { createContext, useContext, useEffect, useState } from "react";
import { connexion, deconnexion } from "@/firebase/auth";

import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "@/firebase/config";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profil, setProfil] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        try {
          setUser(currentUser);

          if (!currentUser) {
            setProfil(null);
            return;
          }

          const profilRef = doc(
            db,
            "users",
            currentUser.uid
          );

          const profilSnap = await getDoc(profilRef);

          if (!profilSnap.exists()) {
            throw new Error(
              "Profil utilisateur introuvable dans Firestore."
            );
          }

          setProfil(profilSnap.data());
        } catch (error) {
          console.error(
            "Erreur lors du chargement du profil :",
            error
          );

          setProfil(null);
        } finally {
          setLoadingAuth(false);
        }
      }
    );

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profil,
        loadingAuth,
        connexion,
        deconnexion
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}