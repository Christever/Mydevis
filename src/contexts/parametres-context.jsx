import { createContext, useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { db } from "@/firebase/config";
import { useAuth } from "@/contexts/auth-context";

export const ParametresContext = createContext(null);

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
      } catch (error) {
        console.error("Erreur lors du chargement des paramètres :", error);
      } finally {
        setLoadingParams(false);
      }
    }

    chargerParametres();
  }, [profil, loadingAuth]);

  //#region MISES A JOUR BDD
  // Validité des devis
  async function sauvegarderDureeValiditeDevis(valeur) {
    if (!profil?.organisationId) {
      return;
    }

    try {
      setDureeValiditeDevis(valeur);
      const configRef = doc(
        db,
        "organisations",
        profil.organisationId,
        "parametres",
        "configuration",
      );

      await updateDoc(configRef, {
        dureeValiditeDevis: valeur,
      });
    } catch (error) {
      console.error(
        "Erreur lors de la sauvegarde de la durée de validité :",
        error,
      );
    }
  }

  // TVA Applicable
  async function sauvegarderTvaApplicable(valeur) {
    if (!profil?.organisationId) {
      return;
    }

    try {
      setTvaApplicable(valeur);

      const configRef = doc(
        db,
        "organisations",
        profil.organisationId,
        "parametres",
        "configuration",
      );

      await updateDoc(configRef, {
        tvaApplicable: valeur,
      });
    } catch (error) {
      console.error(
        "Erreur lors de la sauvegarde de l'assujettissement à la TVA :",
        error,
      );
    }
  }

  // Add TVA
  async function sauvegarderTvaRates(nouveauxTaux) {
    if (!profil?.organisationId) {
      return;
    }

    try {
      setTvaRates(nouveauxTaux);

      const configRef = doc(
        db,
        "organisations",
        profil.organisationId,
        "parametres",
        "configuration",
      );

      await updateDoc(configRef, {
        tvaRates: nouveauxTaux,
      });
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des taux de TVA :", error);
    }
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
  const addTvaRate = (newTax) => {
    setLoadingParams(true);
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

    sauvegarderTvaRates(nouveauxTaux);

    setLoadingParams(false);
    return true;
  };

  // ToggleTVA (ACTIF/INACTIF)
  const toggleTva = (id) => {
    setLoadingParams(true);

    const nouveauxTaux = tvaRates.map((tva) =>
      tva.id === id ? { ...tva, actif: !tva.actif } : tva,
    );

    sauvegarderTvaRates(nouveauxTaux);

    setLoadingParams(false);
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
