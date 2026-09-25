import { Dialog } from "primereact/dialog";
import ClientForm from "./ClientForm";

export default function ClientDialog({ visible, client, onHide, onSubmit }) {
  return (
    <Dialog
      header={client ? "Modifier le client" : "Nouveau client"}
      visible={visible}
      onHide={onHide}
      modal
      className="w-[800px] max-w-[95vw]"
      style={{ height: "90vh" }}
    >
      <ClientForm client={client} onSubmit={onSubmit} onCancel={onHide} />
    </Dialog>
  );
}
