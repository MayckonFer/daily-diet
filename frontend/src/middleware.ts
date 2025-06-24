import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = [{ path: "/sign-in" }, { path: "/register" }] as const;

const REDIRECT_TO_SIGN_IN = "/sign-in";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const publicRoute = publicRoutes.find((route) => route.path === path);

  const authCookie = request.cookies.get("session_id")?.value;
  console.log("Cookie: " + authCookie);

  // SE NÃO ESTIVER LOGADO E ACESSAR ROTA PÚBLICA
  if (!authCookie && publicRoute) {
    return NextResponse.next();
  }

  // SE NÃO ESTIVER LOGADO E ACESSAR ROTA PRIVADA
  if (!authCookie && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = REDIRECT_TO_SIGN_IN;

    return NextResponse.redirect(redirectUrl);
  }

  // SE ESTIVER LOGADO E ACESSAR ROTA PÚBLICA
  if (authCookie && publicRoute) {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = "/";

    return NextResponse.redirect(redirectUrl);
  }

  // SE ESTIVER LOGADO E ACESSAR ROTA PRIVADA
  if (authCookie && !publicRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
