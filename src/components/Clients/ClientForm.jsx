import { clientSchema } from "@/schemas/clientSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { normalizeName } from "@/utils/normalizeName";

export default function ClientForm({ onCancel, onSubmit, client }) {
  const nomRef = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      telephone: "",
      email: "",
      adresse: {
        ligne1: "",
        ligne2: "",
        codePostal: "",
        ville: "",
      },
    },
  });

  const nom = register("nom");

  useEffect(() => {
    nomRef.current?.focus();
  }, []);

  useEffect(() => {
    reset({
      nom: client?.nom ?? "",
      prenom: client?.prenom ?? "",
      telephone: client?.telephone ?? "",
      email: client?.email ?? "",
      adresse: {
        ligne1: client?.adresse?.ligne1 ?? "",
        ligne2: client?.adresse?.ligne2 ?? "",
        codePostal: client?.adresse?.codePostal ?? "",
        ville: client?.adresse?.ville ?? "",
      },
    });
  }, [client, reset]);

  const handleFormSubmit = (data) => {
    onSubmit({
      ...data,
      id: client?.id,
      nom: normalizeName(data.nom),
      prenom: normalizeName(data.prenom),
    });
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full">
      <div className="flex flex-col gap-5">
        {/* NOM + PRENOM  */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="nom">
              Nom <span className="text-red-500">*</span>
            </label>
            <InputText
              id="nom"
              {...nom}
              ref={(element) => {
                nom.ref(element);
                nomRef.current = element;
              }}
            />
            {errors.nom && (
              <small className="text-red-500">{errors.nom.message}</small>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="prenom">
              Prénom <span className="text-red-500">*</span>
            </label>
            <InputText id="prenom" {...register("prenom")} />
            {errors.prenom && (
              <small className="text-red-500">{errors.prenom.message}</small>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="telephone">
              Téléphone <span className="text-red-500">*</span>
            </label>
            <InputMask
              mask="99 99 99 99 99"
              id="telephone"
              placeholder="06 12 12 12 12"
              {...register("telephone")}
            />
            {errors.telephone && (
              <small className="text-red-500">{errors.telephone.message}</small>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>

            <InputText id="email" type="email" {...register("email")} />

            {errors.email && (
              <small className="text-red-500">{errors.email.message}</small>
            )}
          </div>
        </div>

        {/* Adresse */}
        <div className="border-t border-slate-200 pt-4">
          <h3 className="mb-4 font-semibold text-slate-700">Adresse</h3>

          <div className="flex flex-col gap-4">
            {/* Adresse */}
            <div className="flex flex-col gap-2">
              <label htmlFor="adresse.ligne1">
                Adresse <span className="text-red-500">*</span>
              </label>

              <InputText
                id="adresse.ligne1"
                {...register("adresse.ligne1")}
                placeholder="12 rue des Lilas"
              />

              {errors.adresse?.ligne1 && (
                <small className="text-red-500">
                  {errors.adresse.ligne1.message}
                </small>
              )}
            </div>

            {/* Complément */}
            <div className="flex flex-col gap-2">
              <label htmlFor="adresse.ligne2">Complément d'adresse</label>

              <InputText
                id="adresse.ligne2"
                {...register("adresse.ligne2")}
                placeholder="Appartement, bâtiment..."
              />
            </div>

            {/* Code postal + Ville */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="adresse.codePostal">
                  Code postal <span className="text-red-500">*</span>
                </label>

                <InputText
                  id="adresse.codePostal"
                  {...register("adresse.codePostal")}
                  placeholder="34600"
                  maxLength={5}
                />

                {errors.adresse?.codePostal && (
                  <small className="text-red-500">
                    {errors.adresse.codePostal.message}
                  </small>
                )}
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label htmlFor="adresse.ville">
                  Ville <span className="text-red-500">*</span>
                </label>

                <InputText
                  id="adresse.ville"
                  {...register("adresse.ville")}
                  placeholder="Bédarieux"
                />

                {errors.adresse?.ville && (
                  <small className="text-red-500">
                    {errors.adresse.ville.message}
                  </small>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button
          type="button"
          label="Annuler"
          severity="secondary"
          onClick={onCancel}
        />

        <Button type="submit" label="Enregistrer" />
      </div>
      <small className="text-slate-500">
        <span className="text-red-500">*</span> Champ obligatoire
      </small>
    </form>
  );
}
