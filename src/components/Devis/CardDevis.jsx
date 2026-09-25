import { Link } from "react-router-dom";

import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

import DevisActions from "@/components/Devis/DevisActions";
import StatutDevis from "@/components/Devis/StatutDevis";

import { calculerTotalTTC } from "@/utils/devis-calculs";

export default function CardDevis({
  devis = [],
  onDelete,
  onUpdateStatut,
  onDuplicate,
  showActions = false,
}) {

  return (
    <Card>
      <DataTable
        value={devis}
        stripedRows
        emptyMessage="Aucun devis trouvé."
        sortField="date"
        sortOrder={-1}
      >
        <Column
          field="numero"
          header="N°"
          body={(devis) => (
            <Link
              to={`/devis/${devis.numero}`}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              {devis.numero}
            </Link>
          )}
        />
        <Column
          field="client"
          header="Client"
          body={(devis) =>
            typeof devis.client === "object"
              ? `${devis.client.prenom} ${devis.client.nom}`
              : devis.client
          }
        />
        <Column
          field="date"
          header="Date"
          sortable
          body={(devis) => devis.date.toLocaleDateString("fr-FR")}
        />
        <Column
          field="validite"
          header="Validité"
          sortable
          body={(devis) => devis.validite.toLocaleDateString("fr-FR")}
        />
        <Column
          header="Montant"
          body={(devis) =>
            `${calculerTotalTTC(devis.lignes, devis.tvaApplicable).toFixed(
              2,
            )} €`
          }
        />
        <Column
          field="statut"
          header="Statut"
          body={(devis) => <StatutDevis statut={devis.statut} />}
        />

        {showActions && (
          <Column
            header="Actions"
            body={(devis) => (
              <DevisActions
                devis={devis}
                onDelete={onDelete}
                onUpdateStatut={onUpdateStatut}
                onDuplicate={onDuplicate}
              />
            )}
          />
        )}
      </DataTable>
    </Card>
  );
}
