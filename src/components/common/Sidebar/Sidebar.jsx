import { NavLink } from "react-router-dom";

import { Button } from "primereact/button";
import { Sidebar as PrimeSidebar } from "primereact/sidebar";

export default function Sidebar({ open, onClose }) {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 transition-colors duration-200 ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-300 hover:bg-slate-700 hover:text-white"
    }`;

  return (
    <>
      {/* =========================
          SIDEBAR DESKTOP
      ========================= */}
      <aside className="hidden h-screen w-64 shrink-0 flex-col bg-slate-800 text-white md:flex">
        {/* Logo / Nom */}
        <div className="flex flex-col items-center justify-center p-6">
          <h1 className="text-xl font-bold">MS PEINTURE</h1>

          <p className="text-sm text-slate-400">Gestion des devis</p>
        </div>

        {/* Navigation */}
        <nav className="px-4">
          <p className="mb-2 px-2 text-xs font-semibold uppercase text-slate-500">
            Menu
          </p>

          <div className="space-y-2">
            <NavLink to="/" className={navLinkClass}>
              <i className="pi pi-home" />
              <span>Accueil</span>
            </NavLink>

            <NavLink to="clients" className={navLinkClass}>
              <i className="pi pi-users" />
              <span>Clients</span>
            </NavLink>

            <NavLink to="devis" className={navLinkClass}>
              <i className="pi pi-file" />
              <span>Devis</span>
            </NavLink>

            <NavLink to="parameters" className={navLinkClass}>
              <i className="pi pi-cog" />
              <span>Paramètres</span>
            </NavLink>

            {import.meta.env.DEV && (
              <NavLink to="test" className={navLinkClass} onClick={onClose}>
                <i className="pi pi-wrench" />
                <span>Test</span>
              </NavLink>
            )}
          </div>
        </nav>
      </aside>

      {/* =========================
            SIDEBAR MOBILE
        ========================= */}
      <PrimeSidebar visible={open} onHide={onClose} className="bg-slate-800">
        {/* Logo / Nom */}
        <div className="flex flex-col items-center justify-center pb-6">
          <h1 className="text-xl font-bold text-white">MS PEINTURE</h1>

          <p className="text-sm text-slate-400">Gestion des devis</p>
        </div>

        {/* Navigation */}
        <nav>
          <p className="mb-2 px-2 text-xs font-semibold uppercase text-slate-500">
            Menu
          </p>

          <div className="space-y-2">
            <NavLink to="/" className={navLinkClass} onClick={onClose}>
              <i className="pi pi-home" />
              <span>Accueil</span>
            </NavLink>

            <NavLink to="clients" className={navLinkClass} onClick={onClose}>
              <i className="pi pi-users" />
              <span>Clients</span>
            </NavLink>

            <NavLink to="devis" className={navLinkClass} onClick={onClose}>
              <i className="pi pi-file" />
              <span>Devis</span>
            </NavLink>

            <NavLink to="parameters" className={navLinkClass} onClick={onClose}>
              <i className="pi pi-cog" />
              <span>Paramètres</span>
            </NavLink>
          </div>
        </nav>
      </PrimeSidebar>
    </>
  );
}
