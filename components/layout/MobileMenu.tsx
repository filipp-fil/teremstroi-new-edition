"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X, Phone } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  nav: { href: string; label: string }[];
}

/** Мобильное меню-гамбургер (выезжает справа).
 *  Рендерится через портал в document.body: иначе header с backdrop-blur
 *  становится containing-block для fixed-потомков и меню «теряет» фон. */
export function MobileMenu({ open, onClose, nav }: MobileMenuProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  // Закрываем меню при переходе на другую страницу
  React.useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-forest/70 lg:hidden"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed right-0 top-0 z-[60] flex h-full w-80 max-w-[85vw] flex-col bg-white p-6 shadow-lift lg:hidden"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="font-heading text-lg font-bold text-forest">Меню</span>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 hover:bg-primary-light"
                aria-label="Закрыть меню"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-1" aria-label="Мобильная навигация">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={item.href}
                    className="block rounded-xl px-4 py-3 text-base font-semibold text-forest hover:bg-primary-light"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto space-y-3 border-t border-line pt-6">
              {/* Телефоны: Москва и С-Петербург с подписями */}
              <div className="space-y-2">
                <a
                  href={`tel:${site.phoneMoscow.replace(/[^+\d]/g, "")}`}
                  className="flex items-baseline gap-2 text-base font-bold text-forest"
                >
                  <Phone className="h-4 w-4 shrink-0 self-center text-primary-dark" />
                  <span>
                    <span className="mr-1.5 text-xs font-medium text-muted-foreground">Москва</span>
                    {site.phoneMoscow}
                  </span>
                </a>
                <a
                  href={`tel:${site.phonesSpb[0].replace(/[^+\d]/g, "")}`}
                  className="flex items-baseline gap-2 text-base font-bold text-forest"
                >
                  <Phone className="h-4 w-4 shrink-0 self-center text-primary-dark" />
                  <span>
                    <span className="mr-1.5 text-xs font-medium text-muted-foreground">С-Петербург</span>
                    {site.phonesSpb[0]}
                  </span>
                </a>
              </div>
              <Button asChild className="w-full">
                <Link href="/#cta" onClick={onClose}>
                  Оставить заявку
                </Link>
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
