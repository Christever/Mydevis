import { InputText } from "primereact/inputtext";

export default function ClientSearch({ search, setSearch }) {
  return (
    <div className="flex items-center gap-2">
      <i className="pi pi-search text-slate-400" />

      <InputText
        placeholder="Rechercher..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-64"
      />
    </div>
  );
}
