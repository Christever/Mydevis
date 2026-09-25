import { z } from "zod";



export const devisLigneSchema = z.object({
    designation: z
        .string()
        .trim()
        .min(1, "La désignation est obligatoire"),

    quantite: z
        .number()
        .positive("La quantité doit être supérieure à 0"),

    unite: z
        .string()
        .trim()
        .min(1, "L'unité est obligatoire"),

    prixUnitaireHT: z
        .number()
        .min(0, "Le prix ne peut pas être négatif"),

    tvaRateId: z
        .number()
        .int()
        .positive(),
});