import { useState, useContext } from "react";

import { ClientsContext } from "@/contexts/clients-context"

import CardClients from "@/components/Clients/CardClients";
import ClientDialog from "@/components/Clients/ClientDialog";
import Loader from "@/components/common/Loader";
import Entete from "@/components/common/EnTete";

export default function Clients() {
  // States
  const [showForm, setShowForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);


  // Context
  const { loadingClients, clients, addClient, updateClient} = useContext(ClientsContext)

  const handleAddClient = (client) => {
    addClient(client);
    setShowForm(false);
  };

  const handleUpdateClient = (updatedClient) => {
    updateClient(updatedClient);
    setSelectedClient(null);
    setShowForm(false);
  };

  const handleClickNewClient = () => {
    setSelectedClient(null);
    setShowForm(true);
  };

  if (loadingClients) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <Entete
        title={"Clients"}
        description={"Gérez vos clients et leurs coordonnées."}
        buttonLabel={"Nouveau client"}
        onClick={handleClickNewClient}
      />

      {/* Liste des clients */}
      <CardClients
        clients={clients}
        onEdit={(client) => {
          setSelectedClient(client);
          setShowForm(true);
        }}
      />

      <ClientDialog
        client={selectedClient}
        visible={showForm}
        onHide={() => setShowForm(false)}
        onSubmit={selectedClient ? handleUpdateClient : handleAddClient}
      />
    </div>
  );
}
