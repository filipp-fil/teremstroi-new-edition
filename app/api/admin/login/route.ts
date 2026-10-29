import { NextResponse } from "next/server";
import { ADMIN_COOKIE, checkAdminPassword, createAdminToken } from "@/lib/auth";

/** Вход в админку: POST { password } → httpOnly cookie на 7 дней */
export async function POST(req: Request) {
  let password = "";
  try {
    const body = (await req.json()) as { password?: string };
    password = body.password ?? "";
  } catch {
    return NextResponse.json({ ok: false, error: "Некорректный запрос" }, { status: 400 });
  }

  if (!checkAdminPassword(password)) {
    return NextResponse.json({ ok: false, error: "Неверный пароль" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, createAdminToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 дней
  });
  return res;
}
