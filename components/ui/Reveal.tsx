"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Плавное появление блока при попадании в вьюпорт.
 * Оборачивает секции/карточки — сайт «оживает» при скролле.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
  role,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  role?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      role={role}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
