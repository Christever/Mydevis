import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from "./config";

export async function connexion(email, password) {
  try {
  return await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
}
catch (error){
   console.error("Erreur de connexion :", error);
    throw error;
}
}

export async function deconnexion() {
  return await signOut(auth);
}