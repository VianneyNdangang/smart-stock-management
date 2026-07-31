import z from "zod";

export const updateProfileSchema= z
  .object({
    firstName: z
      .string()
      .min(1, "Le prénom est requis"),

    lastName: z
      .string()
      .min(1, "Le nom est requis"),

    userName: z
      .string()
      .min(1, "Le nom utilisateur est requis"),

    email: z
      .string()
      .min(1, "L'email est requis")
      .email("Format d'email invalide"),

    phone: z
      .string()
      .min(1, "Le numéro de téléphone est requis"),
  });

  export const updatePasswordSchema= z
  .object({
    password: z
      .string(),

    newPassword: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),

    confirmPassword: z
      .string()
      .min(1, "La confirmation du mot de passe est requise"),
  })
  .refine(
    (data) => data.newPassword === data.confirmPassword,
    {
      message: "Les mots de passe ne correspondent pas",
      path: ["confirmPassword"],
    }
  );