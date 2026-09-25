import Entete from "@/components/common/EnTete";
import Loader from "@/components/common/Loader";
import CardDevis from "@/components/Devis/CardDevis";
import DevisDialog from "@/components/Devis/DevisDialog";
import { useContext, useState } from "react";
import { DevisContext } from "@/contexts/devis-context";
import { ClientsContext } from "@/contexts/clients-context";

export default function Devis() {
  // States
  const [showDevisForm, setShowDevisForm] = useState(false);

  //#region CONTEXTS

  // Context DEVIS
  const {
    devis,
    addDevis,
    deleteDevis,
    updateStatut,
    duplicateDevis,
    loadingDevis,
  } = useContext(DevisContext);

  // Context CLIENTS
  const { clients, loadingClients } = useContext(ClientsContext);

  //#endregion

  const handleClickNewDevis = () => {
    setShowDevisForm(true);
  };

  if (loadingDevis || loadingClients) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      {/* Entete */}
      <Entete
        title={"Devis"}
        description={"Gérez vos devis et leur suivi."}
        buttonLabel={"Nouveau devis"}
        onClick={handleClickNewDevis}
      />

      {/* Liste des devis */}
      <CardDevis
        devis={devis}
        onDelete={deleteDevis}
        onUpdateStatut={updateStatut}
        onDuplicate={duplicateDevis}
        showActions
      />

      <DevisDialog
        onHide={() => setShowDevisForm(false)}
        visible={showDevisForm}
        clients={clients}
        onSave={addDevis}
      />
    </div>
  );
}
