import { createContext, useEffect, useState } from "react";

import {doc, addDoc, updateDoc, collection, getDocs } from "firebase/firestore";

import { db } from "@/firebase/config";
import { useAuth } from "@/contexts/auth-context";

export const ClientsContext = createContext(null);

function getClientsRef(organisationId) {
  return collection(db, "organisations", organisationId, "clients");
}

export function ClientsProvider({ children }) {
  const [loadingClients, setLoadingClients] = useState(false);
  const { profil, loadingAuth } = useAuth();

  // clients for dev.
  const [clients, setClients] = useState([]);

  // Cycle
  useEffect(() => {
    if (loadingAuth || !profil?.organisationId) {
      return;
    }

    async function chargerClients() {
      setLoadingClients(true);

      try {
        const clientsRef = getClientsRef(profil.organisationId);
        const clientsSnap = await getDocs(clientsRef);

        const clientsCharges = clientsSnap.docs.map((clientDoc) => ({
          id: clientDoc.id,
          ...clientDoc.data(),
        }));

        setClients(clientsCharges);
      } catch (error) {
        console.error("Erreur lors du chargement des clients :", error);
      } finally {
        setLoadingClients(false);
      }
    }

    chargerClients();
  }, [profil, loadingAuth]);

  //   Add new client
  const addClient = async (newClient) => {
    setLoadingClients(true);

    try {
      const clientsRef = getClientsRef(profil.organisationId);

      const clientData = {
        nom: newClient.nom,
        prenom: newClient.prenom,
        telephone: newClient.telephone,
        email: newClient.email,
        adresse: newClient.adresse,
      };

      const clientRef = await addDoc(clientsRef, clientData);

      const clientCree = {
        id: clientRef.id,
        ...clientData,
      };

      setClients((currentClients) => [...currentClients, clientCree]);

      return clientCree;
    } finally {
      setLoadingClients(false);
    }
  };

  // Update client
  const updateClient = async (updatedClient) => {
    setLoadingClients(true);

    try {
      const clientRef = doc(
        db,
        "organisations",
        profil.organisationId,
        "clients",
        updatedClient.id,
      );

      const clientData = {
        nom: updatedClient.nom,
        prenom: updatedClient.prenom,
        telephone: updatedClient.telephone,
        email: updatedClient.email,
        adresse: updatedClient.adresse,
      };

      await updateDoc(clientRef, clientData);

      const clientMisAJour = {
        id: updatedClient.id,
        ...clientData,
      };

      setClients((currentClients) =>
        currentClients.map((client) =>
          client.id === updatedClient.id ? clientMisAJour : client,
        ),
      );
    } finally {
      setLoadingClients(false);
    }
  };

  return (
    <ClientsContext.Provider
      value={{
        loadingClients,
        clients,
        addClient,
        updateClient,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
}
