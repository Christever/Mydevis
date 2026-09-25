import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export default function CardTVA({ tvaRates, tvaApplicable, onToggle, onAdd }) {
  const tauxTemplate = (tva) => {
    return tva.taux === 0 ? "Exonéré de TVA" : `${tva.taux} %`;
  };

  const statutTemplate = (tva) => {
    return tva.actif ? "Actif" : "Inactif";
  };

  const actionTemplate = (tva) => {
    return (
      <Button
        label={tva.actif ? "Désactiver" : "Activer"}
        severity={tva.actif ? "warning" : "success"}
        size="small"
        onClick={() => onToggle(tva.id)}
        disabled={!tvaApplicable}
      />
    );
  };
  return (
    <Card
      header={
        <div className="flex items-center justify-between px-4 pt-4">
          <h2 className="text-xl font-semibold text-slate-800">Taux de TVA</h2>

          <Button
            label="Ajouter un taux"
            icon="pi pi-plus"
            size="small"
            onClick={onAdd}
            disabled={!tvaApplicable}
          />
        </div>
      }
    >
      <DataTable
        key={tvaApplicable ? "tva-active" : "tva-inactive"}
        showGridlines
        value={tvaRates}
        stripedRows
      >
        <Column header="Taux" field="taux" body={tauxTemplate} />
        <Column
          field="actif"
          header="État"
          body={statutTemplate}
          align={"center"}
        />
        <Column header="Actions" body={actionTemplate} align={"center"} />
      </DataTable>
    </Card>
  );
}
