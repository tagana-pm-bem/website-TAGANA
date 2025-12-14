import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Skip middleware if Supabase credentials are not configured
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
  ) 
  
  {
    console.warn(
      "[Middleware] ⚠️ Supabase credentials not configured. Skipping auth check."
    );
    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  console.log(
    `[Middleware] Path: ${path} | User: ${
      user ? user.email : "TIDAK ADA - AKAN REDIRECT"
    }`
  );

  // PROTEKSI: Semua halaman /admin/* HARUS login
  // if (path.startsWith("/admin") && !user) {
  //   console.log(`[Middleware] 🚨 AKSES DITOLAK! Redirect ke login...`);
  //   return NextResponse.redirect(new URL("/auth/login", request.url));
  // }

  // if ((path === "/login" || path === "/auth/login") && user) {
  //   console.log(
  //     "[Middleware] User bandel, udah login mau ke login lagi. Tendang ke Dashboard!"
  //   );
  //   const redirectUrl = request.nextUrl.clone();
  //   redirectUrl.pathname = "/admin/dashboard";
  //   return NextResponse.redirect(redirectUrl);
  // }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
