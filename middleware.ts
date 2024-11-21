import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Lista de rutas protegidas
  const protectedRoutes = ["/prueba", "/admin", "/dashboard"];

  // Verifica si la ruta actual está en la lista de rutas protegidas
  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    if (!session) {
      // Redirige al inicio si no hay sesión
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return res;
}

// Configura las rutas que deben ser manejadas por el middleware
export const config = {
  matcher: ["/prueba", "/admin", "/dashboard"],
};
