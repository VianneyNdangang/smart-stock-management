import z from "zod";

export const filterCampaignsSchema = z.object({
  status:  z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  limit: z.number().optional(),
  type:  z.string().optional(),
});


const product = z.object({
  productId: z.string().min(1, "Veuillez sélectionner un produit"),
  units: z.coerce
    .number()
    .min(1, "La quantité doit être au moins 1"),
});

export const createCampaignsSchema = z.object({
  campaignName: z.string().min(1,"Veuillez ajouter le nom de la campagne"),
  typeId: z.string().min(1, "Veuillez sélectionner un type"),
  products: z
    .array(product)
    .min(1, "Veuillez ajouter au moins un produit"),
});