import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminToken, ADMIN_COOKIE } from "@/lib/auth";
import { AdminLeads } from "./AdminLeads";

export const metadata: Metadata = {
  title: "Заявки (админка)",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  // Middleware проверяет наличие cookie; здесь проверяем ПОДПИСЬ токена.
  const token = cookies().get(ADMIN_COOKIE)?.value;
  if (!verifyAdminToken(token)) {
    redirect("/admin/login");
  }

  return (
    <div className="container py-12">
      <AdminLeads />
    </div>
  );
}
