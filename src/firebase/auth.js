import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from "./config";

export async function connexion(email, password) {

  return await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
}

export async function deconnexion() {
  return await signOut(auth);
}