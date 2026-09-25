import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export default function CardUnit({ units, onToggle, onAdd }) {
  
  const statutTemplate = (unit) => {
    return unit.actif ? "Actif" : "Inactif";
  };

  const actionTemplate = (unit) => {
    return (
      <Button
        label={unit.actif ? "Désactiver" : "Activer"}
        severity={unit.actif ? "warning" : "success"}
        size="small"
        onClick={() => onToggle(unit.id)}
      />
    );
  };

  return (
    <Card
      header={
        <div className="flex items-center justify-between px-4 pt-4">
          <h2 className="text-xl font-semibold text-slate-800">Unités</h2>

          <Button
            label="Ajouter une unité"
            icon="pi pi-plus"
            size="small"
            onClick={onAdd}
          />
        </div>
      }
    >
      <DataTable showGridlines value={units} stripedRows>
        <Column header="Unité" field="libelle" />
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
