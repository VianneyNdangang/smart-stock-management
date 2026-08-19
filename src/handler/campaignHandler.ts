import z from "zod";

export const filterCampaignsSchema = z.object({
  status:  z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  limit: z.number().optional(),
  type:  z.string().optional(),
});
