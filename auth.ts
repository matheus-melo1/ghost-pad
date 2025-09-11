import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import { db } from "@/server/db";
import { compareSync } from "bcrypt-ts";

interface ICredential {
  name: string;
  email: string;
  password?: string;
}

export async function findUserByCrendentials(
  email: string,
  password: string,
): Promise<ICredential | null> {
  const userFiltered = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (!userFiltered) return null;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const passwordMatch = compareSync(password, userFiltered.password);
  if (passwordMatch) {
    return {
      name: userFiltered.name,
      email: userFiltered.email,
    };
  }
  return null;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await findUserByCrendentials(
          credentials.email as string,
          credentials.password as string,
        );

        return user;
      },
    }),
  ],
  // callbacks: {
  //   async signIn({ user, account, profile }) {
  //     if (account && user.email) {
  //       // Verifica se o usuário já existe
  //       const existingUser = await db.user.findUnique({
  //         where: { email: user.email },
  //       });
  //
  //       if (!existingUser) {
  //         // Cria o usuário na sua tabela
  //         const newUser = await db.user.create({
  //           data: {
  //             email: user.email,
  //             name: user.name ?? "",
  //             password: "",
  //           },
  //         });
  //
  //         // Atualiza o user.id para o ID real do banco
  //         user.id = newUser.id;
  //       } else {
  //         // Usa o ID existente
  //         user.id = existingUser.id;
  //       }
  //     }
  //     return true;
  //   },
  //
  //   jwt: ({ token, user }) => {
  //     if (user) {
  //       token.userId = user.id; // Salva o ID real do banco
  //     }
  //     return token;
  //   },
  //
  //   session: ({ session, token }) => {
  //     if (session.user && token.userId) {
  //       session.user.id = token.userId; // Usa o ID real
  //     }
  //     return session;
  //   },
  // },
});
