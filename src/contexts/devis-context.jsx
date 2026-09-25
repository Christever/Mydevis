import { useContext, createContext, useState } from "react";
import { ParametresContext } from "@/contexts/parametres-context";

import { calculerTotalDevis } from "@/utils/devis-calculs";

export const DevisContext = createContext(null);

export function DevisProvider({ children }) {
  const [loadingDevis, setLoadingDevis] = useState(false);
  const { dureeValiditeDevis, tvaRates, tvaApplicable } = useContext(ParametresContext);

  // Pour le dev.
  const [devis, setDevis] = useState([
    {
      numero: "DEV-2026001",
      clientId: 1,
      client: {
        nom: "Dupont",
        prenom: "Jean",
        telephone: "06 12 34 56 78",
        email: "jean.dupont@example.fr",
        adresse: {
          ligne1: "12 rue des Lilas",
          ligne2: "",
          codePostal: "34600",
          ville: "Bédarieux",
        },
      },
      date: new Date(2026, 8, 5),
      validite: new Date(2026, 9, 5),
      statut: "En attente",
      tvaApplicable: true,
      lignes: [
        {
          id: 1,
          designation: "Peinture murs salon",
          quantite: 35,
          unite: "m²",
          prixUnitaireHT: 25.0,
          tvaTaux: 20,
        },
        {
          id: 2,
          designation: "Préparation des murs",
          quantite: 35,
          unite: "m²",
          prixUnitaireHT: 8,
          tvaTaux: 20,
        },
      ],
    },
    {
      numero: "DEV-2026002",
      clientId: 2,
      client: {
        nom: "Martin",
        prenom: "Marie",
        telephone: "07 23 45 67 89",
        email: "marie.martin@example.fr",
        adresse: {
          ligne1: "25 avenue Victor Hugo",
          ligne2: "Appartement 4",
          codePostal: "34600",
          ville: "Bédarieux",
        },
      },
      date: new Date(2026, 8, 3),
      validite: new Date(2026, 9, 3),
      statut: "Accepté",
      tvaApplicable: false,
      lignes: [
        {
          id: 1,
          designation: "Peinture murs salon",
          quantite: 35,
          unite: "m²",
          prixUnitaireHT: 25,
          tvaTaux: 20,
        },
        {
          id: 2,
          designation: "Préparation des murs",
          quantite: 35,
          unite: "m²",
          prixUnitaireHT: 8,
          tvaTaux: 20,
        },
      ],
    },
    {
      numero: "DEV-2026003",
      clientId: 3,
      client: {
        nom: "Durand",
        prenom: "Pierre",
        telephone: "06 34 56 78 90",
        email: "pierre.durand@example.fr",
        adresse: {
          ligne1: "8 rue de la République",
          ligne2: "",
          codePostal: "34700",
          ville: "Lodève",
        },
      },
      date: new Date(2026, 8, 1),
      validite: new Date(2026, 9, 1),
      statut: "Brouillon",
      tvaApplicable: false,
      lignes: [
        {
          id: 1,
          designation: "Peinture murs salon",
          quantite: 35,
          unite: "m²",
          prixUnitaireHT: 25,
          tvaTaux: 20,
        },
        {
          id: 2,
          designation: "Préparation des murs",
          quantite: 35,
          unite: "m²",
          prixUnitaireHT: 8,
          tvaTaux: 20,
        },
      ],
    },
    {
      numero: "DEV-2026004",
      clientId: 4,
      client: {
        nom: "Bernard",
        prenom: "Sophie",
        telephone: "07 45 67 89 01",
        email: "sophie.bernard@example.fr",
        adresse: {
          ligne1: "3 chemin des Vignes",
          ligne2: "",
          codePostal: "34230",
          ville: "Paulhan",
        },
      },
      date: new Date(2026, 7, 28),
      validite: new Date(2026, 8, 28),
      statut: "Refusé",
      tvaApplicable: false,
      lignes: [
        {
          id: 1,
          designation: "Peinture murs Ccuisine",
          quantite: 10,
          unite: "m²",
          prixUnitaireHT: 40,
          tvaTaux: 20,
        },
        {
          id: 2,
          designation: "Préparation des murs",
          quantite: 35,
          unite: "m²",
          prixUnitaireHT: 8,
          tvaTaux: 20,
        },
      ],
    },
  ]);

  //  Add Devis
  const addDevis = (nouveauDevis) => {
    setLoadingDevis(true);

    const nouveauDevisComplet = {
      ...nouveauDevis,
      numero: `DEV-${Date.now()}`,
      date: nouveauDevis.date ?? new Date(),
      validite: nouveauDevis.validite,
      statut: "Brouillon",
      tvaApplicable,
      lignes: [],
    };

    setDevis((currentDevis) => [...currentDevis, nouveauDevisComplet]);

    setLoadingDevis(false);

    return nouveauDevisComplet;
  };

  // Delete Devis
  const deleteDevis = (numero) => {
    setLoadingDevis(true);
    setDevis((currentDevis) =>
      currentDevis.filter((devis) => devis.numero !== numero),
    );
    setLoadingDevis(false);
  };

  // Update Statut
  const updateStatut = (numero, nouveauStatut) => {
    setLoadingDevis(true);
    setDevis((currentDevis) =>
      currentDevis.map((devis) => {
        if (devis.numero !== numero) {
          return devis;
        }

        const lignes = devis.lignes ?? [];
        const totalDevis = calculerTotalDevis(lignes);

        if (
          (nouveauStatut === "En attente" || nouveauStatut === "Accepté") &&
          (lignes.length === 0 || totalDevis <= 0)
        ) {
          return devis;
        }

        return {
          ...devis,
          statut: nouveauStatut,

          ...(nouveauStatut === "En attente" && {
            dateMiseEnAttente: new Date(),
          }),

          ...(nouveauStatut === "Accepté" && {
            dateAcceptation: new Date(),
          }),
        };
      }),
    );
    setLoadingDevis(false);
  };

  const duplicateDevis = (numero) => {
    setLoadingDevis(true);
    setDevis((currentDevis) => {
      const devisOriginal = currentDevis.find(
        (devis) => devis.numero === numero,
      );

      if (!devisOriginal) {
        setLoadingDevis(false);
        return currentDevis;
      }

      const nouveauNumero = `DEV-${Date.now()}`;
      const date = new Date();
      const validite = new Date(date);
      validite.setDate(validite.getDate() + dureeValiditeDevis);

      const nouveauDevis = {
        ...devisOriginal,
        date,
        validite,
        numero: nouveauNumero,
        statut: "Brouillon",
      };
      setLoadingDevis(false);
      return [...currentDevis, nouveauDevis];
    });
  };

  // Ajout ligne dans un devis
  const addLigneDevis = (numeroDevis, nouvelleLigne) => {
    setLoadingDevis(true);

    const tva = tvaRates.find((tva) => tva.id === nouvelleLigne.tvaRateId);

    setDevis((currentDevis) =>
      currentDevis.map((devis) =>
        devis.numero === numeroDevis && devis.statut === "Brouillon"
          ? {
              ...devis,
              lignes: [
                ...devis.lignes,
                {
                  ...nouvelleLigne,
                  id: Date.now(),
                  tvaTaux: tva?.taux ?? 0,
                },
              ],
            }
          : devis,
      ),
    );

    setLoadingDevis(false);
  };
  // Supprime une ligne dans le devis
  const deleteLigneDevis = (numeroDevis, ligneId) => {
    setLoadingDevis(true);
    setDevis((currentDevis) =>
      currentDevis.map((devis) =>
        devis.numero === numeroDevis && devis.statut === "Brouillon"
          ? {
              ...devis,
              lignes: devis.lignes.filter((ligne) => ligne.id !== ligneId),
            }
          : devis,
      ),
    );
    setLoadingDevis(false);
  };

  const updateLigneDevis = (numeroDevis, ligneModifiee) => {
    setLoadingDevis(true);
    setDevis((currentDevis) =>
      currentDevis.map((devis) =>
        devis.numero === numeroDevis && devis.statut === "Brouillon"
          ? {
              ...devis,
              lignes: devis.lignes.map((ligne) =>
                ligne.id === ligneModifiee.id ? ligneModifiee : ligne,
              ),
            }
          : devis,
      ),
    );
    setLoadingDevis(false);
  };

  return (
    <DevisContext.Provider
      value={{
        loadingDevis,
        devis,
        setDevis,
        addDevis,
        deleteDevis,
        updateStatut,
        duplicateDevis,
        addLigneDevis,
        deleteLigneDevis,
        updateLigneDevis,
      }}
    >
      {children}
    </DevisContext.Provider>
  );
}
