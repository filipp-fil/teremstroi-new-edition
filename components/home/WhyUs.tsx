"use client";

import * as React from "react";
import {
  Truck,
  TreePine,
  Wallet,
  ShieldCheck,
  Users,
  Clock,
  Layers,
  BadgeCheck,
  ChevronDown,
} from "lucide-react";
import { site } from "@/content/site";
import { SectionHeading } from "./SectionHeading";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  truck: Truck,
  wood: TreePine,
  wallet: Wallet,
  shield: ShieldCheck,
  users: Users,
  clock: Clock,
  layers: Layers,
  badge: BadgeCheck,
};

/** Блок «Почему мы» — УТП из content/site.ts с иконками.
 *  На мобильном показываем 4 пункта, остальные — по кнопке «Показать всё». */
export function WhyUs() {
  const [showAll, setShowAll] = React.useState(false);

  return (
    <section className="bg-sand py-20">
      <div className="container">
        <SectionHeading
          center
          title="Почему нам доверяют"
          subtitle="Строим по договору, из качественных материалов, без предоплаты и сюрпризов в смете"
        />
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {site.advantages.map((a, i) => {
            const Icon = icons[a.icon] ?? BadgeCheck;
            return (
              <div
                key={i}
                className={`group rounded-2xl border border-line bg-white p-4 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift sm:p-6 ${
                  i >= 4 && !showAll ? "hidden md:block" : ""
                }`}
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light text-primary-dark transition-colors group-hover:bg-primary group-hover:text-forest sm:mb-4 sm:h-12 sm:w-12">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="mb-1 text-sm font-bold text-forest sm:mb-2 sm:text-base">{a.title}</h3>
                <p className="text-xs text-muted-foreground sm:text-sm">{a.text}</p>
              </div>
            );
          })}
        </div>
        {!showAll && (
          <div className="mt-6 text-center md:hidden">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 rounded-full border-2 border-forest px-6 py-2.5 text-sm font-semibold text-forest transition-colors hover:bg-forest hover:text-white"
            >
              Показать все преимущества
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
