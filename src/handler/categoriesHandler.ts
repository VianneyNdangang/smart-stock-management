import type { TTableheaders } from "@/components/dataTable/DataTable.vue";
import FormateDate from "@/components/formateDate/FormateDate.vue";
import { h } from "vue";
import { z } from "zod";

export const createCategorySchema = z.object({
  isLevel2: z.boolean(),
  categoryName: z.string().min(1, "Le nom de la categorie est requise"),
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

export const tableHeader: TTableheaders[] = [
  {
    textAlign: "left",
    accessor: "createdAt",
    name: "Created At",
     render: (record: any) =>
      // record?.role
         h(FormateDate, {
            date: record.createdAt || "-"
          }),
    width: "28",
  },
  {
    textAlign: "left",
    accessor: "categoryName",
    name: "Category Name",
    render: (record: any) => (record?.categoryName ? record?.categoryName : "-"),
    width: "28",
  },
  {
    textAlign: "left",
    accessor: "categoryManager",
    name: "category Manager",
    render: (record: any) => (record?.categoryManagerName ? record?.categoryManagerName : "-"),
    width: "28",
  },

];
