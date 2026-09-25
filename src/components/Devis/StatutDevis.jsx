import { Tag } from "primereact/tag";

export default function StatutDevis({ statut }) {
  const severity = {
    Accepté: "success",
    "En attente": "warn",
    Brouillon: "info",
    Refusé: "danger",
    Annulé: "warning"
  };

  return (
    <Tag
      value={statut}
      severity={severity[statut]}
    />
  );
}