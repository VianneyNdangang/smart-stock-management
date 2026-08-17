import { z } from "zod";

export const createCategorySchema = z.object({
  isLevel2: z.boolean(),
  categoryName: z.string().min(1, "Le nom de la categorie est requis"),
  description: z.string().min(1, "La description de la categorie est requise"),
  parentId: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.isLevel2 && (!data.parentId || data.parentId.trim() === '')){
ctx.addIssue({
  code: z.ZodIssueCode.custom,
  message: 'Le nom de la categorie est requis.',
  path: ['parentId'],
})
  }
});

export const filterCategorySchema = z.object({
  level:  z.string().optional(),
  productId: z.string().optional(),
  isActif: z.string().optional(),
  limit: z.number().optional(),
});