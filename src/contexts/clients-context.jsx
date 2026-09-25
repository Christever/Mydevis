import { createContext, useState } from "react";

export const ClientsContext = createContext(null);

export function ClientsProvider({ children }) {
  const [loadingClients, setLoadingClients] = useState(false);

  // clients for dev.
  const [clients, setClients] = useState([
    {
      id: 1,
      nom: "Dupont",
      prenom: "Jean",
      telephone: "06 12 34 56 78",
      email: "jean.dupont@example.fr",
      adresse: {
        ligne1: "12 rue des Lilas",
        ligne2: "",
        codePostal: "34600",
        ville: "Bédarieux",
      },
    },
    {
      id: 2,
      nom: "Martin",
      prenom: "Marie",
      telephone: "07 23 45 67 89",
      email: "marie.martin@example.fr",
      adresse: {
        ligne1: "25 avenue Victor Hugo",
        ligne2: "Appartement 4",
        codePostal: "34600",
        ville: "Bédarieux",
      },
    },
    {
      id: 3,
      nom: "Durand",
      prenom: "Pierre",
      telephone: "06 34 56 78 90",
      email: "pierre.durand@example.fr",
      adresse: {
        ligne1: "8 rue de la République",
        ligne2: "",
        codePostal: "34700",
        ville: "Lodève",
      },
    },
    {
      id: 4,
      nom: "Bernard",
      prenom: "Sophie",
      telephone: "07 45 67 89 01",
      email: "sophie.bernard@example.fr",
      adresse: {
        ligne1: "3 chemin des Vignes",
        ligne2: "",
        codePostal: "34230",
        ville: "Paulhan",
      },
    },
    {
      id: 5,
      nom: "Doe",
      prenom: "Pierre",
      telephone: "06 45 67 89 10",
      email: "pierre.doe@example.fr",
      adresse: {
        ligne1: "18 rue Jean Jaurès",
        ligne2: "",
        codePostal: "34120",
        ville: "Pézenas",
      },
    },
  ]);

  //   Add new client
  const addClient = (newClient) => {
    setLoadingClients(true);

    const clientCree = {
      ...newClient,
      id: Date.now(),
    };

    setClients((currentClients) => [...currentClients, clientCree]);

    setLoadingClients(false);

    return clientCree;
  };

  // Update client
  const updateClient = (updatedClient) => {
    setLoadingClients(true);
    setClients((currentClients) =>
      currentClients.map((client) =>
        client.id === updatedClient.id ? updatedClient : client,
      ),
    );
    setLoadingClients(false);
  };

  return (
    <ClientsContext.Provider
      value={{
        loadingClients,
        clients,
        setClients,
        addClient,
        updateClient,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
}
