import { createContext, useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { db } from "@/firebase/config";
import { useAuth } from "@/contexts/auth-context";

export const ParametresContext = createContext(null);

function getConfigRef(organisationId) {
  return doc(
    db,
    "organisations",
    organisationId,
    "parametres",
    "configuration",
  );
}

export function ParametresProvider({ children }) {
  const { profil, loadingAuth } = useAuth();
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
  const addUnit = async (newUnit) => {
    setLoadingParams(true);
    try {
      const exist = units.some(
        (unit) => unit.libelle.toLowerCase() === newUnit.toLowerCase(),
      );
      if (exist) {
        setLoadingParams(false);
        return false;
      }
      const nouvellesUnits = [
        ...units,
        {
          id: Date.now(),
          actif: true,
          libelle: newUnit,
        },
      ];

      await sauvegarderUnits(nouvellesUnits);
      return true;
    } finally {
      setLoadingParams(false);
    }
  };

  // Toogle unit (ACTIF/INACTIF)
  const toggleUnit = async (id) => {
    setLoadingParams(true);
    try {
      const nouvellesUnits = units.map((unit) =>
        unit.id === id ? { ...unit, actif: !unit.actif } : unit,
      );

      await sauvegarderUnits(nouvellesUnits);
    } finally {
      setLoadingParams(false);
    }
  };
  //#endregion UNITS

  // Durée validité d'un devis
  const [dureeValiditeDevis, setDureeValiditeDevis] = useState(10);

  useEffect(() => {
    if (loadingAuth || !profil?.organisationId) {
      return;
    }

    async function chargerParametres() {
      setLoadingParams(true);

      try {
        const configRef = doc(
          db,
          "organisations",
          profil.organisationId,
          "parametres",
          "configuration",
        );

        const configSnap = await getDoc(configRef);

        if (!configSnap.exists()) {
          throw new Error(
            "Configuration des paramètres introuvable dans Firestore.",
          );
        }

        const data = configSnap.data();

        setTvaApplicable(data.tvaApplicable);
        setDureeValiditeDevis(data.dureeValiditeDevis);
        setTvaRates(data.tvaRates);
        setUnits(data.units);
      } catch (error) {
        console.error("Erreur lors du chargement des paramètres :", error);
      } finally {
        setLoadingParams(false);
      }
    }

    chargerParametres();
  }, [profil, loadingAuth]);

  //#region MISES A JOUR BDD

  async function sauvegarderParametres(modifications) {
    if (!profil?.organisationId) {
      return;
    }

    const configRef = getConfigRef(profil.organisationId);

    await updateDoc(configRef, modifications);
  }

  // Validité des devis
  async function sauvegarderDureeValiditeDevis(valeur) {
    await sauvegarderParametres({
      dureeValiditeDevis: valeur,
    });
    setDureeValiditeDevis(valeur);
  }

  // TVA Applicable
  async function sauvegarderTvaApplicable(valeur) {
    await sauvegarderParametres({
      tvaApplicable: valeur,
    });
    setTvaApplicable(valeur);
  }

  // Taux TVA
  async function sauvegarderTvaRates(nouveauxTaux) {
    await sauvegarderParametres({
      tvaRates: nouveauxTaux,
    });
    setTvaRates(nouveauxTaux);
  }

  // Sauvegarde Unités
  async function sauvegarderUnits(nouvellesUnits) {
    await sauvegarderParametres({
      units: nouvellesUnits,
    });
    setUnits(nouvellesUnits);
  }

  //#endregion

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
  const addTvaRate = async (newTax) => {
    setLoadingParams(true);
    try {
      const exist = tvaRates.some((tva) => tva.taux === newTax);
      if (exist) {
        setLoadingParams(false);
        return false;
      }

      const nouveauxTaux = [
        ...tvaRates,
        {
          id: Date.now(),
          taux: newTax,
          actif: true,
        },
      ];

      await sauvegarderTvaRates(nouveauxTaux);
      return true;
    } finally {
      setLoadingParams(false);
    }
  };

  // ToggleTVA (ACTIF/INACTIF)
  const toggleTva = async (id) => {
    setLoadingParams(true);
    try {
      const nouveauxTaux = tvaRates.map((tva) =>
        tva.id === id ? { ...tva, actif: !tva.actif } : tva,
      );

      await sauvegarderTvaRates(nouveauxTaux);
    } finally {
      setLoadingParams(false);
    }
  };

  //#endregion TVA

  return (
    <ParametresContext.Provider
      value={{
        loadingParams,
        tvaApplicable,
        setTvaApplicable: sauvegarderTvaApplicable,
        tvaRates,
        setTvaRates,
        addTvaRate,
        toggleTva,
        dureeValiditeDevis,
        setDureeValiditeDevis: sauvegarderDureeValiditeDevis,
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
