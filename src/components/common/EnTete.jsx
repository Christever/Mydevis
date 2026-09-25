import { Button } from "primereact/button";

export default function Entete({
  title,
  description,
  buttonLabel = null,
  onClick,
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">{title}</h1>

        <p className="mt-1 text-slate-500">{description}</p>
      </div>

      {/* Affichage du boutton uniquement si label et onClick renseigné */}
      {buttonLabel && onClick && (
        <Button label={buttonLabel} icon="pi pi-plus" onClick={onClick} />
      )}
    </div>
  );
}
