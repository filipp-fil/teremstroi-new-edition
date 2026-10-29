import { NextResponse, type NextRequest } from "next/server";

/**
 * Защита админки: любой заход на /admin/* (кроме /admin/login)
 * без cookie admin_token — редирект на страницу входа.
 * Саму подпись токена дополнительно проверяет серверная страница /admin.
 * ВАЖНО: имя cookie дублируется строкой, чтобы middleware (Edge Runtime)
 * не тянул Node-библиотеку jsonwebtoken.
 */
export function middleware(req: NextRequest) {
  // Страницу логина не редиректим (иначе — бесконечный цикл)
  if (req.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }
  const token = req.cookies.get("admin_token")?.value;
  if (!token) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("from", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
