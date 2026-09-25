import { Card } from "primereact/card";
import { Button } from "primereact/button";

import CardDevis from "@/components/Devis/CardDevis";
import Loader from "@/components/common/Loader";
import Entete from "@/components/common/EnTete";

import { calculerTotalDevis, calculerTotalTTC } from "@/utils/devis-calculs";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { DevisContext } from "@/contexts/devis-context";
import { ParametresContext } from "@/contexts/parametres-context";

export default function Home() {
  const { devis, loadingDevis } = useContext(DevisContext);
  const { tvaApplicable } = useContext(ParametresContext)

  const aujourdHui = new Date();

  const debutMois = new Date(
    aujourdHui.getFullYear(),
    aujourdHui.getMonth(),
    1,
  );

  const debutSemaine = new Date(aujourdHui);
  const jour = debutSemaine.getDay();
  const difference = jour === 0 ? 6 : jour - 1;

  debutSemaine.setDate(debutSemaine.getDate() - difference);
  debutSemaine.setHours(0, 0, 0, 0);

  const devisEnCours = devis.filter(
    (devis) => devis.statut === "Brouillon" || devis.statut === "En attente",
  );

  const devisEnAttente = devis.filter((devis) => devis.statut === "En attente");

  const devisAcceptes = devis.filter((devis) => devis.statut === "Accepté");

  const devisEnCoursDuMois = devisEnCours.filter(
    (devis) => new Date(devis.date) >= debutMois,
  );

  const devisAcceptesDuMois = devisAcceptes.filter(
    (devis) =>
      devis.dateAcceptation && new Date(devis.dateAcceptation) >= debutMois,
  );

  const devisEnAttenteCetteSemaine = devisEnAttente.filter(
    (devis) =>
      devis.dateMiseEnAttente &&
      new Date(devis.dateMiseEnAttente) >= debutSemaine,
  );

  const montantAccepteDuMois = devisAcceptesDuMois.reduce((total, devis) => {
    return total + calculerTotalTTC(devis.lignes ?? [], tvaApplicable);
  }, 0);

  if (loadingDevis) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <Entete
        title={"Bonjour 👋"}
        description={"Voici un aperçu de votre activité."}
      />

      {/* Statistiques */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">Devis en cours</p>

              <p className="mt-2 text-3xl font-semibold text-slate-800">
                {devisEnCours.length}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                +{devisEnCoursDuMois.length} ce mois-ci
              </p>
            </div>

            <i className="pi pi-file text-xl text-teal-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">En attente de réponse</p>

              <p className="mt-2 text-3xl font-semibold text-slate-800">
                {devisEnAttente.length}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                {devisEnAttenteCetteSemaine.length} depuis cette semaine
              </p>
            </div>

            <i className="pi pi-clock text-xl text-teal-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">Devis acceptés</p>

              <p className="mt-2 text-3xl font-semibold text-slate-800">
                {devisAcceptes.length}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                +{devisAcceptesDuMois.length} ce mois-ci
              </p>
            </div>

            <i className="pi pi-check-circle text-xl text-teal-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">Montant accepté</p>

              <p className="mt-2 text-3xl font-semibold text-slate-800">
                {montantAccepteDuMois.toLocaleString("fr-FR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                €
              </p>

              <p className="mt-2 text-sm text-slate-500">Ce mois-ci</p>
            </div>

            <i className="pi pi-euro text-xl text-teal-600" />
          </div>
        </Card>
      </div>

      {/* Derniers devis */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Derniers devis
          </h2>

          <p className="text-sm text-slate-500">
            Les derniers devis enregistrés
          </p>
        </div>

        <Link to={"devis"}>
          <Button
            label="Voir tous les devis"
            icon="pi pi-arrow-right"
            iconPos="right"
            text
            // link
          />
        </Link>
      </div>
      <CardDevis devis={devis} />
    </div>
  );
}
