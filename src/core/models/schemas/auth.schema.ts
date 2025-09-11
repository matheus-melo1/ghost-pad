import { z } from "zod";

export const authSchema = (type: AuthType) =>
  z.object({
    email: z
      .string({ required_error: "Email é obrigatório" })
      .email("Email inválido"),
    password: z
      .string({ required_error: "Senha é obrigatória" })
      .min(3, "Senha muito curta"),

    ...(type === "register" && {
      name: z
        .string({ required_error: "Nome é obrigatório" })
        .min(3, "Nome obrigatório"),
      confirmPassword: z
        .string({ required_error: "Confirme a senha é obrigatória" })
        .min(3, "Confirme a senha muito curta"),
    }),
  });

export type AuthType = "login" | "register";

export type AuthSchemaType = z.infer<ReturnType<typeof authSchema>>;
