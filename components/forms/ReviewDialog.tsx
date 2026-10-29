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
import { ReviewForm } from "./ReviewForm";

/** Модалка «Оставить отзыв»: оценка 1–5 звёзд + комментарий */
export function ReviewDialog({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Оставить отзыв</DialogTitle>
          <DialogDescription>
            Поставьте оценку и расскажите о своём опыте — это поможет другим клиентам с выбором.
          </DialogDescription>
        </DialogHeader>
        <ReviewForm key={String(open)} onSuccess={() => setTimeout(() => setOpen(false), 2500)} />
      </DialogContent>
    </Dialog>
  );
}
