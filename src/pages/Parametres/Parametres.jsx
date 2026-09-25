import { useState } from "react";
import { toast } from "react-toastify";

// CONTEXT
import { ParametresContext } from "@/contexts/parametres-context";
import { useContext } from "react";

// COMPONENTS
import Loader from "@/components/common/Loader";
import CardTVA from "@/components/Devis/CardTva";
import CardUnit from "@/components/Devis/CardUnit";
import TvaDialog from "@/components/Parameter/TvaDialog";
import UnitDialog from "@/components/Parameter/UnitDialog";
import { InputSwitch } from "primereact/inputswitch";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";

export default function Parametres() {
  // States
  const [showTvaForm, setShowTvaForm] = useState(false);
  const [newTax, setNewTax] = useState(null);

  const [showUnitsForm, setShowUnitsForm] = useState(false);
  const [newUnit, setNewUnit] = useState("");

  // Context
  const {
    loadingParams,
    tvaRates,
    toggleTva,
    addTvaRate,
    tvaApplicable,
    setTvaApplicable,
    units,
    toggleUnit,
    addUnit,
    dureeValiditeDevis,
    setDureeValiditeDevis,
  } = useContext(ParametresContext);

  const [dureeValidite, setDureeValidite] = useState(dureeValiditeDevis);

  const handleCloseTvaForm = () => {
    setShowTvaForm(false);
    setNewTax(null);
  };

  const handleAddTva = () => {
    if (newTax === null) {
      setShowTvaForm(true);
      return;
    }

    const success = addTvaRate(newTax);
    if (!success) {
      return toast.info(`Le taux de ${newTax} % existe déjà.`);
    }
    setNewTax(null);
    setShowTvaForm(false);
    toast.success("Le taux à bien été");
  };

  const handleCloseUnitForm = () => {
    setShowUnitsForm(false);
    setNewUnit("");
  };

  const handleAddUnit = () => {
    if (newUnit === "") {
      setShowUnitsForm(true);
      return;
    }

    const exist = addUnit(newUnit);
    if (exist) {
      toast.info(`L unité ${newUnit} existe déjà.`);
      return;
    }
    setNewUnit("");
    setShowUnitsForm(false);
  };

  if (loadingParams) {
    return <Loader />;
  }

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-slate-800">Paramètres</h1>
        <div className="rounded-lg bg-white p-4 shadow">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-800">
                Assujettissement à la TVA
              </h2>

              <p className="text-sm text-slate-500">
                L'entreprise est-elle assujettie à la TVA ?
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">
                {tvaApplicable ? "Oui" : "Non"}
              </span>

              <InputSwitch
                checked={tvaApplicable}
                onChange={(e) => setTvaApplicable(e.value)}
              />
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <h2 className="text-xl font-semibold text-slate-800">
            Validité des devis
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Durée de validité par défaut des devis.
          </p>

          <div className="mt-3 flex items-center gap-2">
            <InputNumber
              value={dureeValidite}
              onValueChange={(e) => setDureeValidite(e.value)}
              min={1}
              max={365}
              suffix=" jours"
            />

            <Button
              label="Enregistrer"
              icon="pi pi-check"
              size="small"
              onClick={() => setDureeValiditeDevis(dureeValidite)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Taux de TVA */}
          <CardTVA
            tvaRates={tvaRates}
            tvaApplicable={tvaApplicable}
            onToggle={toggleTva}
            onAdd={handleAddTva}
          />

          {/* Unités */}
          <CardUnit units={units} onToggle={toggleUnit} onAdd={handleAddUnit} />
        </div>

        <TvaDialog
          taux={newTax}
          visible={showTvaForm}
          onSave={handleAddTva}
          onChange={(e) => setNewTax(e.value)}
          onHide={handleCloseTvaForm}
        />

        <UnitDialog
          visible={showUnitsForm}
          unit={newUnit}
          onChange={(e) => setNewUnit(e.target.value)}
          onHide={handleCloseUnitForm}
          onSave={handleAddUnit}
        />
      </div>
    </>
  );
}
