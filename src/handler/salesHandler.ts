import z from "zod";

export const filterSalesSchema = z.object({
  status:  z.string().optional(),
  creator: z.string().optional(),
  limit: z.number().optional(),
});