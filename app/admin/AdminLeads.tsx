"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CheckCheck, Loader2, LogOut, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Lead {
  id: string;
  name: string;
  phone: string;
  message: string | null;
  source: string;
  status: "new" | "viewed";
  createdAt: string;
}

const SOURCE_LABELS: Record<string, string> = {
  hero: "Баннер",
  cta: "Расчёт (главная)",
  callback: "Звонок",
  project: "Карточка проекта",
  works: "Работы",
  contact: "Контакты",
};

/** Админ-панель заявок: вкладки «Новые» / «Просмотренные», смена статуса */
export function AdminLeads() {
  const router = useRouter();
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [tab, setTab] = React.useState("new");

  const load = React.useCallback(async (status: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/leads?status=${status}`);
      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }
      const data = (await res.json()) as { leads: Lead[] };
      setLeads(data.leads);
    } finally {
      setLoading(false);
    }
  }, [router]);

  React.useEffect(() => {
    load(tab);
  }, [tab, load]);

  async function setStatus(id: string, status: "new" | "viewed") {
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    load(tab); // перечитываем список — заявка «переедет» во вкладку
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-forest md:text-3xl">Заявки с сайта</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Заявки также дублируются на почту {`fhockeyboy20@yahoo.com`}
          </p>
        </div>
        <Button variant="outlineDark" onClick={logout}>
          <LogOut className="h-4 w-4" />
          Выйти
        </Button>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="new">Новые</TabsTrigger>
          <TabsTrigger value="viewed">Просмотренные</TabsTrigger>
        </TabsList>

        <TabsContent value={tab}>
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary-dark" />
            </div>
          ) : leads.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line bg-white p-12 text-center text-muted-foreground">
              Заявок пока нет. Когда клиент отправит форму — она появится здесь.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Дата</TableHead>
                  <TableHead>Имя</TableHead>
                  <TableHead>Телефон</TableHead>
                  <TableHead>Комментарий</TableHead>
                  <TableHead>Источник</TableHead>
                  <TableHead className="text-right">Действие</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                      {new Date(lead.createdAt).toLocaleString("ru-RU")}
                    </TableCell>
                    <TableCell className="font-semibold text-forest">{lead.name}</TableCell>
                    <TableCell>
                      <a href={`tel:${lead.phone.replace(/[^+\d]/g, "")}`} className="font-semibold text-primary-dark hover:underline">
                        {lead.phone}
                      </a>
                    </TableCell>
                    <TableCell className="max-w-[260px] truncate text-sm text-muted-foreground">
                      {lead.message ?? "—"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={lead.status === "new" ? "accent" : "default"}>
                        {SOURCE_LABELS[lead.source] ?? lead.source}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {lead.status === "new" ? (
                        <Button size="sm" onClick={() => setStatus(lead.id, "viewed")}>
                          <CheckCheck className="h-4 w-4" />
                          Просмотрена
                        </Button>
                      ) : (
                        <Button size="sm" variant="ghost" onClick={() => setStatus(lead.id, "new")}>
                          <RotateCcw className="h-4 w-4" />
                          Вернуть
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
