import { useContext } from "react";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { confirmDialog } from "primereact/confirmdialog";
import { ParametresContext } from "@/contexts/parametres-context";
import { DevisContext } from "@/contexts/devis-context";
import {
  calculerTotalLigne,
  calculerMontantTVA,
  calculerTotalTVA,
  calculerTotalDevis,
  calculerTotalTTC,
} from "@/utils/devis-calculs";
import { Button } from "primereact/button";

export default function DevisLignes({
  lignes = [],
  numeroDevis,
  editable,
  tvaApplicable,
  tvaRate,
  onDeleteSucces,
  onEdit,
}) {
  // const { tvaRates } = useContext(ParametresContext);
  const { deleteLigneDevis } = useContext(DevisContext);

  const totalHT = calculerTotalDevis(lignes);

  const totalTVA = calculerTotalTVA(lignes, tvaApplicable);

  const totalTTC = calculerTotalTTC(lignes,  tvaApplicable);

  return (
    <Card title="Lignes du devis">
      <DataTable value={lignes} emptyMessage="Aucune ligne dans ce devis.">
        <Column field="designation" header="Désignation" />
        <Column
          header="Prix unitaire"
          body={(ligne) => `${ligne.prixUnitaireHT.toFixed(2)} €`}
        />
        <Column field="quantite" header="Quantité" />
        <Column field="unite" header="Unité" />

        {tvaApplicable && (
          <Column header="TVA" body={(ligne) => `${ligne.tvaTaux ?? 0} %`} />
        )}

        {tvaApplicable && (
          <Column
            header="Montant TVA"
            body={(ligne) =>
              `${calculerMontantTVA(ligne, tvaApplicable).toFixed(
                2,
              )} €`
            }
          />
        )}

        <Column
          header="Total"
          body={(ligne) => `${calculerTotalLigne(ligne).toFixed(2)} €`}
        />
        {editable && (
          <Column
            header="Actions"
            body={(ligne) => (
              <div className="flex gap-2">
                <Button
                  icon="pi pi-pencil"
                  severity="info"
                  size="small"
                  rounded
                  onClick={() => onEdit(ligne)}
                  aria-label="Modifier la ligne"
                  tooltip="Modifier la ligne"
                />
                <Button
                  icon="pi pi-trash"
                  severity="danger"
                  size="small"
                  rounded
                  onClick={() =>
                    confirmDialog({
                      message: `Voulez-vous vraiment supprimer la ligne « ${ligne.designation} » ?`,
                      header: "Confirmation de suppression",
                      icon: "pi pi-exclamation-triangle",
                      acceptLabel: "Supprimer",
                      rejectLabel: "Annuler",

                      accept: () => {
                        deleteLigneDevis(numeroDevis, ligne.id);
                        onDeleteSucces();
                      },
                    })
                  }
                  aria-label="Supprimer la ligne"
                  tooltip="Supprimer la ligne"
                />
              </div>
            )}
          />
        )}
      </DataTable>

      <div className="mt-4 flex justify-end">
        <div className="flex flex-col items-end gap-1">
          {tvaApplicable && (
            <>
              <div>Total HT : {totalHT.toFixed(2)} €</div>

              <div>Total TVA : {totalTVA.toFixed(2)} €</div>

              <div className="text-lg font-semibold">
                Total TTC : {totalTTC.toFixed(2)} €
              </div>
            </>
          )}

          {!tvaApplicable && (
            <>
              <div className="text-lg font-semibold">
                Total : {totalTTC.toFixed(2)} €
              </div>

              <small className="text-gray-500">
                TVA non applicable, art. 293 B du CGI
              </small>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
