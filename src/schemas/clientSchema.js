import { z } from "zod"

export const clientSchema = z.object({
    nom: z
        .string()
        .min(1, "Le nom est obligatoire"),

    prenom: z
        .string()
        .min(1, "Le prénom est obligatoire"),

    telephone: z
        .string()
        .min(1, "Le téléphone est obligatoire"),

    email: z
        .string()
        .min(1, "L'adresse mail est obligatoire")
        .pipe(z.email("L'adresse email n'est pas valide")),

    adresse: z.object({
        ligne1: z
            .string()
            .trim()
            .min(1, "L'adresse est obligatoire"),

        ligne2: z
            .string()
            .trim()
            .optional(),

        codePostal: z
            .string()
            .trim()
            .regex(/^\d{5}$/, "Le code postal doit contenir 5 chiffres"),

        ville: z
            .string()
            .trim()
            .min(1, "La ville est obligatoire"),
    }),

})