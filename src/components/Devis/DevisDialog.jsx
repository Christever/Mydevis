import { useContext, useState } from "react";
import { ParametresContext } from "@/contexts/parametres-context";
import { ClientsContext } from "@/contexts/clients-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { AutoComplete } from "primereact/autocomplete";
import { devisSchema } from "@/schemas/devisSchema";
import ClientDialog from "@/components/Clients/ClientDialog";

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export default function DevisDialog({ visible, onHide, clients, onSave }) {
  // Variables
  const dateDuJour = new Date();

  const { dureeValiditeDevis } = useContext(ParametresContext);

  const { addClient } = useContext(ClientsContext);

  const [clientsFiltres, setClientsFiltres] = useState([]);
  const [rechercheClient, setRechercheClient] = useState("");
  const [clientDialogVisible, setClientDialogVisible] = useState(false);

  const {
    handleSubmit,
    reset,
    watch,
    setValue,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(devisSchema),
    defaultValues: {
      client: null,
      date: dateDuJour,
      validite: addDays(dateDuJour, dureeValiditeDevis),
    },
  });

  // Recherche des clients
  const rechercherClients = (event) => {
    const recherche = event.query.trim().toLowerCase();

    setRechercheClient(event.query);

    if (!recherche) {
      setClientsFiltres([]);
      return;
    }

    const resultats = clients.filter((client) => {
      const nom = client.nom.toLowerCase();
      const prenom = client.prenom.toLowerCase();

      return (
        nom.includes(recherche) ||
        prenom.includes(recherche) ||
        `${nom} ${prenom}`.includes(recherche)
      );
    });

    setClientsFiltres(resultats);
  };

  // Création d'un nouveau client
  const handleCreateClient = (data) => {
    console.log("Client reçu par DevisDialog :", data);

    const nouveauClient = addClient(data);
    console.log("Client créé par addClient :", nouveauClient);

    setValue("client", nouveauClient, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setClientDialogVisible(false);
    setRechercheClient("");
    setClientsFiltres([]);
  };

  const handleHide = () => {
    reset({
      client: null,
      date: dateDuJour,
      validite: addDays(dateDuJour, dureeValiditeDevis),
    });

    setClientsFiltres([]);
    setRechercheClient("");
    setClientDialogVisible(false);

    onHide();
  };

  const handleFormSubmit = (data) => {
    const clientSelectionne = data.client;

    const client = clients.find((client) => client.id === clientSelectionne.id);

    if (!client) {
      return;
    }

    const devis = {
      ...data,

      clientId: client.id,

      client: {
        nom: client.nom,
        prenom: client.prenom,
        telephone: client.telephone,
        email: client.email,

        adresse: {
          ligne1: client.adresse.ligne1,
          ligne2: client.adresse.ligne2,
          codePostal: client.adresse.codePostal,
          ville: client.adresse.ville,
        },
      },
    };

    onSave(devis);
    handleHide();
  };

  return (
    <>
      <Dialog
        header="Nouveau devis"
        visible={visible}
        onHide={handleHide}
        modal
        className="w-175"
      >
        <div className="flex flex-col gap-4">
          {/* Client */}
          <div className="flex flex-col gap-2">
            <label htmlFor="client">Client</label>

            <AutoComplete
              id="client"
              value={watch("client")}
              suggestions={clientsFiltres}
              completeMethod={rechercherClients}
              placeholder="Rechercher un client..."
              className="w-full"
              inputClassName="w-full"
              itemTemplate={(client) => (
                <span>
                  {client.nom} {client.prenom}
                </span>
              )}
              selectedItemTemplate={(client) =>
                client ? `${client.nom} ${client.prenom}` : ""
              }
              onChange={(e) => {
                setRechercheClient(typeof e.value === "string" ? e.value : "");

                setValue("client", e.value, {
                  shouldValidate: typeof e.value !== "string",
                  shouldDirty: true,
                });
              }}
            />

            {rechercheClient.trim() && clientsFiltres.length === 0 && (
              <Button
                type="button"
                label={`Créer « ${rechercheClient} »`}
                icon="pi pi-plus"
                severity="secondary"
                outlined
                className="w-full justify-start"
                onClick={() => setClientDialogVisible(true)}
              />
            )}

            {errors.client && (
              <small className="text-red-500">{errors.client.message}</small>
            )}

            {errors.client && (
              <small className="text-red-500">{errors.client.message}</small>
            )}
          </div>

          {/* Date */}
          <div className="flex flex-col gap-2">
            <label htmlFor="date">Date du devis</label>

            <Calendar
              id="date"
              value={watch("date")}
              onChange={(e) =>
                setValue("date", e.value, {
                  shouldValidate: true,
                })
              }
              dateFormat="dd/mm/yy"
              showIcon
              className="w-full"
            />
          </div>

          {errors.date && (
            <small className="text-red-500">{errors.date.message}</small>
          )}

          {/* Validité */}
          <div className="flex flex-col gap-2">
            <label htmlFor="validite">Validité du devis</label>

            <Calendar
              id="validite"
              value={watch("validite")}
              onChange={(e) =>
                setValue("validite", e.value, {
                  shouldValidate: true,
                })
              }
              dateFormat="dd/mm/yy"
              showIcon
              className="w-full"
            />
          </div>

          {errors.validite && (
            <small className="text-red-500">{errors.validite.message}</small>
          )}

          {/* Boutons */}
          <div className="flex justify-end gap-2 pt-4">
            <Button label="Annuler" severity="secondary" onClick={handleHide} />

            <Button
              label="Enregistrer"
              icon="pi pi-check"
              onClick={handleSubmit(handleFormSubmit)}
            />
          </div>
        </div>
      </Dialog>

      {/* Création d'un client */}
      <ClientDialog
        visible={clientDialogVisible}
        client={null}
        onHide={() => setClientDialogVisible(false)}
        onSubmit={handleCreateClient}
      />
    </>
  );
}
