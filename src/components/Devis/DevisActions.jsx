import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
import { Tooltip } from "primereact/tooltip";
import { calculerTotalDevis } from "@/utils/devis-calculs";

export default function DevisActions({
  devis,
  onDelete,
  onUpdateStatut,
  onDuplicate,
}) {
  const confirmDelete = () => {
    confirmDialog({
      message: `Voulez-vous vraiment supprimer ${devis.numero} \n du client ${devis.client}`,
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Supprimer",
      rejectLabel: "Annuler",
      acceptClassName: "p-button-danger",
      accept: () => {
        onDelete(devis.numero);
      },
    });
  };

  const confirmAnnulation = () => {
    confirmDialog({
      message: `Voulez-vous vraiment annuler le devis ${devis.numero} ?`,
      header: "Annulation du devis",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Annuler le devis",
      rejectLabel: "Conserver",
      acceptClassName: "p-button-warning",
      accept: () => {
        onUpdateStatut(devis.numero, "Annulé");
      },
    });
  };

  const totalDevis = calculerTotalDevis(devis.lignes ?? []);

  const devisIncomplet = !devis.lignes?.length || totalDevis <= 0;

  return (
    <div className="flex gap-4">
      {/* Brouillon */}
      {devis.statut === "Brouillon" && (
        <>
          <Tooltip target=".btn-envoyer-devis" />

          <span
            className="btn-envoyer-devis"
            data-pr-tooltip={
              devisIncomplet
                ? "Ajoutez au moins une ligne avec un montant supérieur à 0 €"
                : "Passer le devis en attente"
            }
          >
            <Button
              icon="pi pi-send"
              size="small"
              rounded
              severity="secondary"
              disabled={devisIncomplet}
              onClick={() => onUpdateStatut(devis.numero, "En attente")}
              aria-label={`Envoyer le devis ${devis.numero}`}
            />
          </span>

          <Link to={`/devis/${devis.numero}`}>
            <Button
              icon="pi pi-pencil"
              size="small"
              rounded
              severity="info"
              tooltip="Modifier le devis"
              aria-label={`Modifier le devis ${devis.numero}`}
            />
          </Link>

          <Button
            icon="pi pi-trash"
            size="small"
            rounded
            severity="danger"
            onClick={confirmDelete}
            tooltip="Supprimer le brouillon (action irréversible)"
            aria-label={`Supprimer ${devis.numero}`}
          />
        </>
      )}
      {/* En attente */}
      {devis.statut === "En attente" && (
        <>
          <Button
            icon="pi pi-check"
            size="small"
            rounded
            severity="success"
            tooltip="Accepter le devis"
            onClick={() => onUpdateStatut(devis.numero, "Accepté")}
            aria-label={`Accepter le devis ${devis.numero}`}
          />

          <Button
            icon="pi pi-times"
            size="small"
            rounded
            severity="warning"
            tooltip="Refuser le devis (action irréversible)"
            onClick={() => onUpdateStatut(devis.numero, "Refusé")}
            aria-label={`Refuser le devis ${devis.numero}`}
          />
        </>
      )}
      {/* Devis accepté */}
      {devis.statut === "Accepté" && (
        <Button
          icon="pi pi-times-circle"
          size="small"
          rounded
          severity="warning"
          tooltip="Annuler le devis (action irréversible)"
          onClick={confirmAnnulation}
          aria-label={`Annuler le devis ${devis.numero}`}
        />
      )}
      {/* Devis accepté ou refusé */}
      {(devis.statut === "Accepté" ||
        devis.statut === "Refusé" ||
        devis.statut === "Annulé") && (
        <Button
          icon="pi pi-copy"
          size="small"
          rounded
          severity="secondary"
          tooltip="Dupliquer le devis"
          onClick={() => onDuplicate(devis.numero)}
          aria-label={`Dupliquer le devis ${devis.numero}`}
        />
      )}
    </div>
  );
}
