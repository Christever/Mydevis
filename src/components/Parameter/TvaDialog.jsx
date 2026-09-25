import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { useEffect } from "react";

export default function TvaDialog({ visible, onHide, taux, onChange, onSave }) {

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        const input = document.querySelector("#taux input");
        input?.focus();
      }, 500);
    }
  }, [visible]);

  return (
    <Dialog
      header="Ajouter un taux de TVA"
      visible={visible}
      onHide={onHide}
      modal
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="taux">Taux de TVA</label>
        <InputNumber
          id="taux"
          value={taux}
          onChange={onChange}
          suffix={"%"}
          min={0}
          max={100}
        />
        <div className="flex justify-end gap-2">
          <Button label="Annuler" severity="secondary" onClick={onHide} />
          <Button label="Enregistrer" icon="pi pi-check" onClick={onSave} />
        </div>
      </div>
    </Dialog>
  );
}
