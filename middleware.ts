import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (req.nextUrl.pathname === "/login") {
      if (session) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return res;
    }

    if (req.nextUrl.pathname.startsWith("/dashboard")) {
      if (!session) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    return res;
  } catch (error) {
    console.error('Error en middleware:', error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/login", "/dashboard/:path*"],
};
