import { useState } from "react";

import { useAuth } from "@/contexts/auth-context";

import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";

export default function Login() {
  const { connexion, profil, loadingAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const result = await connexion(email, password);
      toast.success(`Bienvenu, ${result.profil.pseudo}`);
      navigate("/");
    } catch (error) {
      toast.error("Impossible de vous connecter.")
    }
  }

  if (loadingAuth) {
    return <Loader/>
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center overflow-hidden bg-slate-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h1 className="mb-2 text-2xl font-bold text-slate-800">MS PEINTURE</h1>

        <p className="mb-6 text-slate-500">Gestion des devis</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Adresse e-mail</label>

            <InputText
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Mot de passe</label>

            <Password
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              toggleMask
              feedback={false}
              autoComplete="current-password"
              className="w-full"
              inputClassName="w-full"
            />
          </div>

          <Button type="submit" label="Se connecter" icon="pi pi-sign-in" />
        </form>
      </div>
    </div>
  );
}
