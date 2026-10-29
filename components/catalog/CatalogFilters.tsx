"use client";

import * as React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CatalogFiltersProps {
  /** Подпись первого типа (например «Каркасный» / «Каркасная») */
  materialLabels: [string, string];
}

/**
 * Фильтры каталога. Работают через URL-параметры (?priceMin=...&sort=...),
 * поэтому страницы с фильтрами можно сохранять и индексировать.
 * Применяются кнопкой «Показать», сбрасываются кнопкой «Сбросить».
 */
export function CatalogFilters({ materialLabels }: CatalogFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Локальное состояние полей (применяется по кнопке)
  const [form, setForm] = React.useState({
    priceMin: searchParams.get("priceMin") ?? "",
    priceMax: searchParams.get("priceMax") ?? "",
    areaMin: searchParams.get("areaMin") ?? "",
    areaMax: searchParams.get("areaMax") ?? "",
    material: searchParams.get("material") ?? "",
    sort: searchParams.get("sort") ?? "",
  });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  function apply(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    (Object.keys(form) as (keyof typeof form)[]).forEach((key) => {
      const v = form[key];
      if (v && !(key === "sort" && v === "")) params.set(key, v);
    });
    router.push(`${pathname}${params.size ? `?${params.toString()}` : ""}`);
  }

  function reset() {
    setForm({ priceMin: "", priceMax: "", areaMin: "", areaMax: "", material: "", sort: "" });
    router.push(pathname);
  }

  const selectCls =
    "flex h-12 w-full rounded-xl border border-input bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <form
      onSubmit={apply}
      className="mb-10 rounded-2xl border border-line bg-white p-5 shadow-soft"
      aria-label="Фильтры проектов"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {/* Цена */}
        <div className="space-y-1.5">
          <Label htmlFor="priceMin">Цена, ₽</Label>
          <div className="flex gap-2">
            <Input id="priceMin" inputMode="numeric" placeholder="от" value={form.priceMin} onChange={set("priceMin")} />
            <Input inputMode="numeric" placeholder="до" value={form.priceMax} onChange={set("priceMax")} aria-label="Цена до" />
          </div>
        </div>

        {/* Площадь */}
        <div className="space-y-1.5">
          <Label htmlFor="areaMin">Площадь, м²</Label>
          <div className="flex gap-2">
            <Input id="areaMin" inputMode="numeric" placeholder="от" value={form.areaMin} onChange={set("areaMin")} />
            <Input inputMode="numeric" placeholder="до" value={form.areaMax} onChange={set("areaMax")} aria-label="Площадь до" />
          </div>
        </div>

        {/* Тип */}
        <div className="space-y-1.5">
          <Label htmlFor="material">Тип</Label>
          <select id="material" className={selectCls} value={form.material} onChange={set("material")}>
            <option value="">Любой</option>
            <option value="karkas">{materialLabels[0]}</option>
            <option value="brus">{materialLabels[1]}</option>
          </select>
        </div>

        {/* Сортировка */}
        <div className="space-y-1.5">
          <Label htmlFor="sort">Сортировка</Label>
          <select id="sort" className={selectCls} value={form.sort} onChange={set("sort")}>
            <option value="">Как на сайте (по умолчанию)</option>
            <option value="price-asc">Цена: сначала дешевле</option>
            <option value="price-desc">Цена: сначала дороже</option>
            <option value="area-asc">Площадь: сначала меньше</option>
            <option value="area-desc">Площадь: сначала больше</option>
          </select>
        </div>

        {/* Кнопки */}
        <div className="flex items-end gap-2">
          <Button type="submit" className="flex-1">
            <SlidersHorizontal className="h-4 w-4" />
            Показать
          </Button>
          <Button type="button" variant="ghost" size="icon" onClick={reset} aria-label="Сбросить фильтры" title="Сбросить фильтры">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  );
}
