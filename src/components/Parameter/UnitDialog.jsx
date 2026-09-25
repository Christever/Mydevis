import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef } from "react";

export default function UnitDialog({
  visible,
  onHide,
  unit,
  onChange,
  onSave,
}) {
  const inputRef = useRef(null);

useEffect(() => {
  if (visible) {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
  }
}, [visible]);

 
  return (
    <Dialog header="Ajouter une unité" visible={visible} onHide={onHide} modal>
      <div className="flex flex-col gap-2">
        <label htmlFor="unite">Unité</label>

        <InputText id="unite" value={unit} onChange={onChange} ref={inputRef} />

        <div className="flex justify-end gap-2">
          <Button label="Annuler" severity="secondary" onClick={onHide} />

          <Button label="Enregistrer" icon="pi pi-check" onClick={onSave} />
        </div>
      </div>
    </Dialog>
  );
}
