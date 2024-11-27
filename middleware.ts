import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Ruta de login
  if (req.nextUrl.pathname === "/login") {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return res;
  }

  // Proteger ruta dashboard
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return res;
}

// Configura las rutas que deben ser manejadas por el middleware
export const config = {
  matcher: ["/login", "/dashboard/:path*"],
};
