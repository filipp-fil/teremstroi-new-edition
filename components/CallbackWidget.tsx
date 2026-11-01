"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { MessengerIcons } from "@/components/layout/MessengerIcons";

/**
 * Виджет обратного звонка (глобальный, на всех страницах).
 * Круглая кнопка в правом нижнем углу → по клику карточка с формой.
 * Не всплывает сам: только мягкий пульс кнопки через 30 секунд после загрузки.
 */
export function CallbackWidget() {
  const [open, setOpen] = React.useState(false);
  const [pulse, setPulse] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setPulse(true), 30000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Плавающая кнопка */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Закрыть форму обратного звонка" : "Заказать обратный звонок"}
        aria-expanded={open}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        className={`fixed bottom-5 right-5 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-forest shadow-lift transition-colors hover:bg-primary-dark md:bottom-8 md:right-8 ${
          pulse && !open ? "animate-pulse-soft" : ""
        }`}
      >
        <MessageCircle className="h-7 w-7" />
      </motion.button>

      {/* Карточка с формой */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-forest/40 backdrop-blur-[2px]"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="fixed bottom-24 right-4 z-50 max-h-[calc(100dvh-8rem)] w-[calc(100vw-2rem)] max-w-sm overflow-y-auto rounded-2xl bg-white p-5 shadow-lift md:bottom-28 md:right-8"
              role="dialog"
              aria-label="Заказать обратный звонок"
            >
              <h2 className="mb-1 font-heading text-lg font-bold text-forest">Заказать звонок</h2>
              <p className="mb-4 text-sm text-muted-foreground">
                Оставьте телефон — перезвоним за 15 минут в рабочее время.
              </p>
              <LeadForm
                key={String(open)}
                source="callback"
                withComment
                commentLabel="Ваш вопрос (необязательно)"
                submitLabel="Перезвоните мне"
              />
              <div className="mt-4 border-t border-line pt-4">
                <p className="mb-2 text-xs font-medium text-muted-foreground">Или напишите нам:</p>
                {/* TODO: заменить на реальные ссылки — content/site.ts */}
                <MessengerIcons />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
