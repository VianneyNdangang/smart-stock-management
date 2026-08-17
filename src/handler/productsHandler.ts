import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 Mo
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const createProductSchema = z.object({
  perishable: z.boolean(),
  productName: z.string().min(1, "Le nom du produit est requis"),
  description: z.string().min(1, "La description de la categorie est requise"),
  specification: z.string(),
  categoryId: z.string().min(1,'Erreur '),
  imageUrl: z
    .instanceof(File, { message: "Veuillez sélectionner une image." })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "L'image est trop grande (maximum 5 Mo).",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Format accepté : .jpg, .jpeg, .png ou .webp.",
    }),
//   perishableDate: z.string().optional(),
//   brandId: z.string().min(1,""),
//   imageUrl: z.string().min(1,"L'image du produit est requis")
})
// .superRefine((data, ctx) => {
//   if (data.perishable && (!data.perishableDate || data.perishableDate.trim() === '')){
// ctx.addIssue({
//   code: z.ZodIssueCode.custom,
//   message: 'La date de peremtion est requise.',
//   path: ['perishableDate'],
// })
//   }
// })
;

export const filterProductSchema = z.object({
  perishable:  z.string().optional(),
  productName: z.string().optional(),
  isActif: z.string().optional(),
  limit: z.number().optional(),
  outOfStock:  z.string().optional(),
});