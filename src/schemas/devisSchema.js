import { z } from "zod";

export const devisSchema = z
    .object({
        client: z
            .object({
                id: z.number(),
                nom: z.string(),
                prenom: z.string(),
            })
            .nullable()
            .refine((value) => value !== null, {
                message: "Le client est obligatoire",
            }),

        date: z.date({
            message: "La date du devis est obligatoire",
        }),

        validite: z.date({
            message: "La date de validité est obligatoire",
        }),
    })
    .refine((data) => data.validite >= data.date, {
        message: "La date de validité doit être postérieure à la date du devis.",
        path: ["validite"],
    });