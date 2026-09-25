import { useEffect, useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

import { devisLigneSchema } from "@/schemas/devisLigneSchema";

// Contexts
import { ParametresContext } from "@/contexts/parametres-context";
import { DevisContext } from "@/contexts/devis-context";

export default function DevisLigneDialog({
  visible,
  numeroDevis,
  ligne,
  onHide,
  onSuccess,
}) {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(devisLigneSchema),
    defaultValues: {
      designation: "",
      quantite: 1,
      unite: "",
      prixUnitaireHT: null,
      tvaRateId: 3,
    },
  });

  // Context
  const { units, tvaRates, tvaApplicable } = useContext(ParametresContext);
  const { addLigneDevis, updateLigneDevis } = useContext(DevisContext);

  useEffect(() => {
    if (!visible) {
      reset();
      return;
    }

    if (ligne) {
      reset({
        designation: ligne.designation,
        quantite: ligne.quantite,
        unite: ligne.unite,
        prixUnitaireHT: ligne.prixUnitaireHT,
        tvaRateId: ligne.tvaRateId,
      });
    } else {
      reset();
    }
  }, [visible, ligne, reset]);

  const onSubmit = (data) => {
    if (ligne) {
      updateLigneDevis(numeroDevis, {
        ...data,
        id: ligne.id,
      });

      onHide();
      onSuccess("modification");
      return;
    }

    addLigneDevis(numeroDevis, data);

    onHide();
    onSuccess("ajout");
  };

  // Retrieval of sales units
  const optionsUnites = units
    .filter((unit) => unit.actif)
    .map((unit) => ({
      label: unit.libelle,
      value: unit.libelle,
    }));

  // Recovery of VAT rates
  const optionsTva = tvaRates
    .filter((tva) => tva.actif)
    .map((tva) => ({
      label: `${tva.taux} %`,
      value: tva.id,
    }));

  return (
    <Dialog
      header={ligne ? "Modifier la ligne" : "Ajouter une ligne"}
      visible={visible}
      onHide={onHide}
      modal
      className="w-150"
    >
      <form
        onSubmit={handleSubmit(onSubmit, (errors) =>
          console.log("Erreurs :", errors),
        )}
        className="space-y-4"
      >
        {/* Designation */}
        <div>
          <label htmlFor="designation" className="mb-1 block font-medium">
            Désignation
          </label>

          <InputText
            id="designation"
            {...register("designation")}
            className="w-full"
          />

          {errors.designation && (
            <small className="text-red-500">{errors.designation.message}</small>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label htmlFor="quantite" className="mb-1 block font-medium">
            Quantité
          </label>

          <Controller
            name="quantite"
            control={control}
            render={({ field }) => (
              <InputNumber
                id="quantite"
                value={field.value}
                onValueChange={(e) => field.onChange(e.value)}
                min={0}
                className="w-full"
              />
            )}
          />

          {errors.quantite && (
            <small className="text-red-500">{errors.quantite.message}</small>
          )}
        </div>

        {/* Unit */}
        <div>
          <label htmlFor="unite" className="mb-1 block font-medium">
            Unité
          </label>

          <Controller
            name="unite"
            control={control}
            render={({ field }) => (
              <Dropdown
                id="unite"
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                options={optionsUnites}
                placeholder="Sélectionner une unité"
                className="w-full"
              />
            )}
          />

          {errors.unite && (
            <small className="text-red-500">{errors.unite.message}</small>
          )}
        </div>

        {/* Unit price (excl. tax) */}
        <div>
          <label htmlFor="prixUnitaireHT" className="mb-1 block font-medium">
            Prix unitaire HT
          </label>

          <Controller
            name="prixUnitaireHT"
            control={control}
            render={({ field }) => (
              <InputNumber
                id="prixUnitaireHT"
                value={field.value}
                onValueChange={(e) => field.onChange(e.value)}
                min={0}
                minFractionDigits={2}
                maxFractionDigits={2}
                suffix=" €"
                placeholder="0.00 €"
                className="w-full"
              />
            )}
          />

          {errors.prixUnitaireHT && (
            <small className="text-red-500">
              {errors.prixUnitaireHT.message}
            </small>
          )}
        </div>

        {/* VAT */}
        {tvaApplicable && (
          <div className="field">
            <label htmlFor="tvaRateId" className="block mb-2">
              TVA
            </label>

            <Controller
              name="tvaRateId"
              control={control}
              render={({ field }) => (
                <Dropdown
                  id="tvaRateId"
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  options={optionsTva}
                  placeholder="Sélectionner un taux"
                  className="w-full"
                />
              )}
            />
          </div>
        )}

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            label="Annuler"
            severity="secondary"
            onClick={onHide}
          />

          <Button
            type="submit"
            label={ligne ? "Modifier" : "Ajouter"}
            icon={ligne ? "pi pi-check" : "pi pi-plus"}
          />
        </div>
      </form>
    </Dialog>
  );
}
