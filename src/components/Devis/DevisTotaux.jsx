// import { useContext } from "react";
// import { ParametresContext } from "@/contexts/parametres-context";
import {
  calculerTotalDevis,
  calculerTotalTTC,
  calculerTVAParTaux,
} from "@/utils/devis-calculs";

export default function DevisTotaux({ lignes, tvaApplicable }) {


  const totalHT = calculerTotalDevis(lignes);

  const tvaParTaux = calculerTVAParTaux(
    lignes,
    tvaApplicable
  );

  const totalTTC = calculerTotalTTC(
    lignes,
    tvaApplicable
  );

  return (
    <div className="mt-6 flex justify-end">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white shadow-sm">

        <div className="p-5">

          {tvaApplicable ? (
            <>
              {/* Total HT */}
              <div className="flex justify-between py-1.5 text-slate-600">
                <span>Total HT</span>
                <span className="font-medium">
                  {totalHT.toFixed(2)} €
                </span>
              </div>

              {/* TVA par taux */}
              {tvaParTaux.map((tva) => (
                <div
                  key={tva.taux}
                  className="flex justify-between py-1 text-sm text-slate-500"
                >
                  <span>TVA {tva.taux} %</span>
                  <span>{tva.montant.toFixed(2)} €</span>
                </div>
              ))}

              {/* Séparation */}
              <div className="my-3 border-t border-slate-200" />

              {/* Total TTC */}
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-slate-800">
                  Total TTC
                </span>

                <span className="text-xl font-bold text-slate-900">
                  {totalTTC.toFixed(2)} €
                </span>
              </div>
            </>
          ) : (
            <>
              {/* Total à payer */}
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-slate-800">
                  Total à payer
                </span>

                <span className="text-xl font-bold text-slate-900">
                  {totalHT.toFixed(2)} €
                </span>
              </div>

              {/* Mention TVA */}
              <p className="mt-3 text-right text-xs text-slate-500">
                TVA non applicable, art. 293 B du CGI
              </p>
            </>
          )}

        </div>
      </div>
    </div>
  );
}