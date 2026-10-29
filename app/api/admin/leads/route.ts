import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { ADMIN_COOKIE, verifyAdminToken } from "@/lib/auth";

/** Проверка сессии администратора для API */
async function isAdmin(): Promise<boolean> {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  return verifyAdminToken(token);
}

/** Список заявок: GET /api/admin/leads?status=new|viewed|all */
export async function GET(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Нет доступа" }, { status: 401 });
  }

  const status = new URL(req.url).searchParams.get("status");
  const where = status === "all" || !status ? {} : { status };

  const leads = await prisma.lead.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 500,
  });
  return NextResponse.json({ ok: true, leads });
}

const patchSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["new", "viewed"]),
});

/** Смена статуса: PATCH /api/admin/leads { id, status } */
export async function PATCH(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Нет доступа" }, { status: 401 });
  }

  const parsed = patchSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Некорректные данные" }, { status: 400 });
  }

  await prisma.lead.update({
    where: { id: parsed.data.id },
    data: { status: parsed.data.status },
  });
  return NextResponse.json({ ok: true });
}
