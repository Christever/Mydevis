import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";

export default function ClientActions({ client,  onEdit }) {
  const confirmDelete = () => {
    confirmDialog({
      message: `Voulez-vous vraiment supprimer ${client.prenom} ${client.nom}`,
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Supprimer",
      rejectLabel: "Annuler",
      acceptClassName: "p-button-danger",
      accept: () => {
        onDelete(client.id);
      },
    });
  };
  return (
    <>
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          rounded
          severity="info"
          aria-label={`Modifier ${client.prenom} ${client.nom}`}
          onClick={() => onEdit(client)}
        />

       
      </div>
    </>
  );
}
