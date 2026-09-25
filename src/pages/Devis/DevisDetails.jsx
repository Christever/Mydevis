import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
import { Card } from "primereact/card";

import { DevisContext } from "@/contexts/devis-context";
import { ParametresContext } from "@/contexts/parametres-context";

import StatutDevis from "@/components/Devis/StatutDevis";
import DevisLignes from "@/components/Devis/DevisLigne";
import DevisLigneDialog from "@/components/Devis/DevisLigneDialog";
import DevisTotaux from "@/components/Devis/DevisTotaux";

import { calculerTotalTTC } from "@/utils/devis-calculs";

import { Button } from "primereact/button";

export default function DevisDetails() {
  const { numero } = useParams();
  const { devis } = useContext(DevisContext);
  const { tvaApplicable } = useContext(ParametresContext);

  const [ligneDialogVisible, setLigneDialogVisible] = useState(false);
  const [ligneEnEdition, setLigneEnEdition] = useState(null);

  const devisCourant = devis.find((devis) => devis.numero === numero);

  if (!devisCourant) {
    throw new Response("Devis introuvable", {
      status: 404,
      statusText: "Devis introuvable",
    });
  }

  const montantDevis = calculerTotalTTC(
    devisCourant.lignes,
    devisCourant.tvaApplicable,
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Devis {devisCourant.numero}</h1>

      <Card>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500">Client</p>

            <p className="font-medium">
              {devisCourant.client.prenom} {devisCourant.client.nom}
            </p>

            <p className="text-sm text-slate-600">
              {devisCourant.client.telephone}
            </p>

            <p className="text-sm text-slate-600">
              {devisCourant.client.email}
            </p>

            <div className="mt-2 text-sm text-slate-600">
              <p>{devisCourant.client.adresse?.ligne1}</p>

              {devisCourant.client.adresse?.ligne2 && (
                <p>{devisCourant.client.adresse.ligne2}</p>
              )}

              <p>
                {devisCourant.client.adresse?.codePostal}{" "}
                {devisCourant.client.adresse?.ville}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-slate-500">Statut</p>
            <StatutDevis statut={devisCourant.statut} />
          </div>

          <div>
            <p className="text-sm text-slate-500">Date</p>
            <p className="font-medium">
              {devisCourant.date.toLocaleDateString("fr-FR")}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Validité</p>
            <p className="font-medium">
              {devisCourant.validite.toLocaleDateString("fr-FR")}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Montant</p>
            <p className="font-medium">{montantDevis.toFixed(2)}</p>
          </div>
        </div>
      </Card>

      {/* Affichage des lignes */}
      {devisCourant.statut === "Brouillon" && (
        <Button
          label="Ajouter une ligne"
          icon="pi pi-plus"
          onClick={() => setLigneDialogVisible(true)}
        />
      )}
      <DevisLignes
        lignes={devisCourant.lignes}
        numeroDevis={devisCourant.numero}
        tvaApplicable={devisCourant.tvaApplicable}
        tvaRate={devisCourant.tvaTaux}
        editable={devisCourant.statut === "Brouillon"}
        onDeleteSucces={() => toast.success("La ligne a bien été supprimée")}
        onEdit={(ligne) => {
          console.log("Ligne reçue par DevisDetails :", ligne);
          setLigneEnEdition(ligne);
          setLigneDialogVisible(true);
        }}
      />

      <DevisTotaux
        lignes={devisCourant.lignes}
        tvaApplicable={devisCourant.tvaApplicable}
      />

      {devisCourant.tvaApplicable !== tvaApplicable && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <p className="font-semibold">Information sur le régime de TVA</p>

          <p className="mt-1">
            Ce devis a été établi lorsque l'entreprise était{" "}
            {devisCourant.tvaApplicable
              ? "assujettie à la TVA"
              : "en franchise en base de TVA"}
            . Le régime actuel de l'entreprise est{" "}
            {tvaApplicable
              ? "assujetti à la TVA"
              : "la franchise en base de TVA"}
            .
          </p>
        </div>
      )}

      <DevisLigneDialog
        visible={ligneDialogVisible}
        numeroDevis={devisCourant.numero}
        ligne={ligneEnEdition}
        onHide={() => {
          setLigneDialogVisible(false);
          setLigneEnEdition(null);
        }}
        onSuccess={(action) => {
          if (action === "modification") {
            toast.success("La ligne a bien été modifiée.");
          } else {
            toast.success("La ligne a bien été ajoutée au devis.");
          }
        }}
      />
    </div>
  );
}
