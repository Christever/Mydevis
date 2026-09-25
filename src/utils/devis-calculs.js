export function calculerTotalLigne(ligne) {
  return arrondirMontant(
    ligne.quantite * ligne.prixUnitaireHT
  );
}

export function calculerMontantTVA(ligne, tvaApplicable) {
  if (!tvaApplicable) {
    return 0;
  }

  const montantHT = calculerTotalLigne(ligne);

  return arrondirMontant(
    montantHT * (ligne.tvaTaux / 100)
  );
}

export function calculerTotalDevis(lignes) {
  return arrondirMontant(
    lignes.reduce(
      (total, ligne) => total + calculerTotalLigne(ligne),
      0
    )
  );
}

// Calcul TVA totale
export function calculerTotalTVA(lignes, tvaApplicable) {
  if (!tvaApplicable) {
    return 0;
  }

  return arrondirMontant(
    lignes.reduce(
      (total, ligne) =>
        total + calculerMontantTVA(ligne, tvaApplicable),
      0
    )
  );
}

export function calculerTotalTTC(
  lignes,
  tvaApplicable
) {
  const totalHT = calculerTotalDevis(lignes);

  const totalTVA = calculerTotalTVA(
    lignes,
    tvaApplicable
  );

  return arrondirMontant(totalHT + totalTVA);
}

export function calculerTVAParTaux(
  lignes,
  tvaApplicable
) {
  if (!tvaApplicable) return [];

  const resultats = {};

  lignes.forEach((ligne) => {
    const taux = ligne.tvaTaux ?? 0;

    const montantTVA =
      calculerTotalLigne(ligne) * (taux / 100);

    if (!resultats[taux]) {
      resultats[taux] = 0;
    }

    resultats[taux] += montantTVA;
  });

  return Object.entries(resultats)
    .map(([taux, montant]) => ({
      taux: Number(taux),
      montant: arrondirMontant(montant),
    }))
    .sort((a, b) => a.taux - b.taux);
}

function arrondirMontant(montant) {
  return Math.round(
    (montant + Number.EPSILON) * 100
  ) / 100;
}