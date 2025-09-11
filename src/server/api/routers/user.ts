import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { authSchema } from "@/features/auth/models/auth-schema";
import { hashSync } from "bcrypt-ts";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(authSchema("register"))
    .mutation(async ({ ctx, input }) => {
      const userCreated = ctx.db.user.create({
        data: {
          email: input.email,
          password: hashSync(input.password),
          name: input.name as string,
        },
      });

      return userCreated;
    }),
});
