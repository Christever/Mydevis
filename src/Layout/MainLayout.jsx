import { useState } from "react";
import { Outlet } from "react-router-dom";

// Les Composants
import Header from "@/components/common/Header/Header";
import Sidebar from "@/components/common/Sidebar/Sidebar";

// Primereact
import { ConfirmDialog } from "primereact/confirmdialog";

// Les contexts
import { DevisProvider } from "@/contexts/devis-context";
import { ParametresProvider } from "@/contexts/parametres-context";
import { ClientsProvider } from "@/contexts/clients-context";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="min-h-0 flex-1 overflow-y-auto p-6">
          <ParametresProvider>
            <ClientsProvider>
              <DevisProvider>
                <Outlet />
              </DevisProvider>
            </ClientsProvider>
          </ParametresProvider>
        </main>
      </div>

      <ConfirmDialog />
    </div>
  );
}
