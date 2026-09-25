import { createContext, useState } from "react";

export const ParametresContext = createContext(null);

export function ParametresProvider({ children }) {
  const [loadingParams, setLoadingParams] = useState(false);

  // Societé assujétie à la TVA ou pas
  const [tvaApplicable, setTvaApplicable] = useState(false);

  //#region UNITS

  // defaults Units
  const [units, setUnits] = useState([
    { id: 1, libelle: "m²", actif: true },
    { id: 2, libelle: "ml", actif: true },
    { id: 3, libelle: "Pièce", actif: true },
    { id: 4, libelle: "Heure", actif: true },
    { id: 5, libelle: "Forfait", actif: true },
  ]);

  // Add unit
  const addUnit = (newUnit) => {
    setLoadingParams(true);
    const exist = units.some(
      (unit) => unit.libelle.toLowerCase() === newUnit.toLowerCase(),
    );
    if (exist) {
      setLoadingParams(false);
      return false;
    }
    setUnits((currentUnits) => [
      ...currentUnits,
      {
        id: Date.now(),
        actif: true,
        libelle: newUnit,
      },
    ]);
    setLoadingParams(false);
  };

  // Toogle unit (ACTIF/INACTIF)
  const toggleUnit = (id) => {
    setLoadingParams(true);
    setUnits((currentUnit) =>
      currentUnit.map((unit) =>
        unit.id === id ? { ...unit, actif: !unit.actif } : unit,
      ),
    );
    setLoadingParams(false);
  };

  //#endregion UNITS

  // Durée validité d'un devis
  const [dureeValiditeDevis, setDureeValiditeDevis] = useState(10);

  //#region  TVA

  // Defaults rates TVA
  const [tvaRates, setTvaRates] = useState([
    {
      id: 1,
      taux: 5.5,
      actif: true,
    },
    {
      id: 2,
      taux: 10,
      actif: true,
    },
    {
      id: 3,
      taux: 20,
      actif: true,
    },
    {
      id: 4,
      taux: 0,
      actif: true,
    },
  ]);

  // Add TVA
  const addTvaRate = (newTax) => {
    setLoadingParams(true);
    const exist = tvaRates.some((tva) => tva.taux === newTax);
    if (exist) {
      setLoadingParams(false);
      return false;
    }
    setTvaRates((currentRates) => [
      ...currentRates,
      {
        id: Date.now(),
        taux: newTax,
        actif: true,
      },
    ]);

    setLoadingParams(false);
    return true;
  };

  // ToggleTVA (ACTIF/INACTIF)
  const toggleTva = (id) => {
    setLoadingParams(true);
    setTvaRates((currentRates) =>
      currentRates.map((tva) =>
        tva.id === id ? { ...tva, actif: !tva.actif } : tva,
      ),
    );
    setLoadingParams(false);
  };

  //#endregion TVA

  return (
    <ParametresContext.Provider
      value={{
        loadingParams,
        tvaApplicable,
        setTvaApplicable,
        tvaRates,
        setTvaRates,
        addTvaRate,
        toggleTva,
        dureeValiditeDevis,
        setDureeValiditeDevis,
        units,
        setUnits,
        addUnit,
        toggleUnit,
      }}
    >
      {children}
    </ParametresContext.Provider>
  );
}
