"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LeadForm } from "./LeadForm";

interface LeadDialogProps {
  /** Кнопка-триггер (любой React-элемент) */
  trigger: React.ReactNode;
  title: string;
  description?: string;
  source: "hero" | "cta" | "callback" | "project" | "works" | "contact";
  withComment?: boolean;
  commentLabel?: string;
}

/** Модалка с формой заявки (универсальная) */
export function LeadDialog({ trigger, title, description, source, withComment = false, commentLabel }: LeadDialogProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {/* Ключ по open — сбрасывает состояние формы при повторном открытии */}
        <LeadForm
          key={String(open)}
          source={source}
          withComment={withComment}
          commentLabel={commentLabel ?? "Опишите, что хотите рассчитать"}
          onSuccess={() => setTimeout(() => setOpen(false), 2500)}
        />
      </DialogContent>
    </Dialog>
  );
}
