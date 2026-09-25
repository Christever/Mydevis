import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";
import { filteredClients } from "@/components/Clients/FilteredClient";
import ClientSearch from "@/components/Clients/ClientSearch";
import ClientActions from "@/components/Clients/ClientActions";

export default function CardClients({ clients = [], onEdit }) {
  const [search, setSearch] = useState("");

  const filtered = filteredClients(clients, search);

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Liste des clients
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Retrouvez ici l'ensemble de vos clients.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ClientSearch search={search} setSearch={setSearch} />
        </div>
      </div>

      <DataTable
        value={filtered}
        dataKey="id"
        stripedRows
        emptyMessage="Aucun client trouvé."
      >
        <Column
          header="Client"
          body={(client) => `${client.prenom} ${client.nom}`}
        />
        <Column field="telephone" header="Téléphone" />
        <Column field="email" header="Email" />
        <Column
          header="Actions"
          body={(client) => (
            <ClientActions
              client={client}
              onEdit={onEdit}
            />
          )}
        />
      </DataTable>
    </Card>
  );
}
