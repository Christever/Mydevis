import { Button } from "primereact/button";

export default function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 h-16 shrink-0 border-b bg-slate-800 border-slate-100  shadow-sm">
      <div className="flex h-full items-center px-4 md:px-6">
        <Button
          icon="pi pi-bars"
          text
          className="mr-3 shrink-0 text-slate-300 md:hidden"
          onClick={onMenuClick}
        />

        <h1 className="text-xl font-semibold text-slate-300">
          Gestion des devis
        </h1>
      </div>
    </header>
  );
}