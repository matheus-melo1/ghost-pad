import type { MiddlewareConfig } from "next/server";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "./auth"; // importa do seu auth.ts

interface IPathProps {
  path: string;
  whenAuthenticated: "redirect" | "next";
}

const publicRoutes: IPathProps[] = [
  {
    path: "/auth", // rota pública
    whenAuthenticated: "redirect",
  },
];

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/auth";
export { auth as middleware } from "./auth";

// export async function middleware(request: NextRequest) {
//   const session = await auth();
//   const path = request.nextUrl.pathname;
//
//   const publicRoute = publicRoutes.find((route) => route.path === path);
//
//   if (!session) {
//     if (publicRoute) {
//       return NextResponse.next();
//     }
//
//     // se rota é protegida → redireciona pro login
//     const redirectUrl = request.nextUrl.clone();
//     redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
//     return NextResponse.redirect(redirectUrl);
//   }
//
//   if (session && publicRoute?.whenAuthenticated === "redirect") {
//     const redirectUrl = request.nextUrl.clone();
//     redirectUrl.pathname = "/documents";
//     return NextResponse.redirect(redirectUrl);
//   }
//
//   // rota protegida e usuário logado → deixa passar
//   return NextResponse.next();
// }

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
