"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

/**
 * Мини-капча «пазл»: перетащите кусочек в пустой слот.
 * Canvas-реализация, один слайс. Решается за пару секунд, боты — вряд ли.
 * После решения вызывает onSolve (форма разблокирует кнопку «Отправить»).
 */
export function PuzzleCaptcha({ onSolve }: { onSolve: () => void }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [solved, setSolved] = React.useState(false);
  const [pieceX, setPieceX] = React.useState(20); // текущая позиция кусочка
  const [targetX, setTargetX] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const SIZE = 48; // размер кусочка

  const W = 280;
  const H = 56;

  // Генерируем «картинку» и позицию слота один раз
  React.useEffect(() => {
    const slot = 180 + Math.floor(Math.random() * 60); // слот справа
    setTargetX(slot);
    setPieceX(16);
    draw(slot);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function draw(slot: number) {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Фон-подложка
    ctx.fillStyle = "#EAF5DB";
    ctx.fillRect(0, 0, W, H);

    // Декоративные полоски, чтобы «картинка» выглядела содержательной
    ctx.fillStyle = "#8CC63F";
    ctx.fillRect(0, H - 14, W, 14);
    ctx.fillStyle = "#6BA534";
    ctx.beginPath();
    ctx.moveTo(0, H - 14);
    for (let x = 0; x <= W; x += 20) ctx.lineTo(x, H - 26 - (x % 40 ? 0 : 6));
    ctx.lineTo(W, H - 14);
    ctx.fill();

    // Контур домика
    ctx.strokeStyle = "#1E3A1E";
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 12, 36, 28);
    ctx.beginPath();
    ctx.moveTo(36, 14);
    ctx.lineTo(58, 2);
    ctx.lineTo(80, 14);
    ctx.stroke();

    // Пустой слот (контур)
    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = "#6BA534";
    ctx.lineWidth = 2;
    ctx.strokeRect(slot, 4, SIZE, SIZE);
    ctx.setLineDash([]);
  }

  function check(x: number) {
    if (Math.abs(x - targetX) < 8) {
      setSolved(true);
      onSolve();
    }
  }

  // Перетаскивание мышью и пальцем
  const move = (clientX: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width;
    const x = Math.min(W - SIZE, Math.max(0, (clientX - rect.left) * scaleX - SIZE / 2));
    setPieceX(x);
  };

  return (
    <div className="space-y-1.5 select-none">
      <p className="text-xs font-medium text-forest">
        {solved ? (
          <span className="flex items-center gap-1.5 text-primary-dark">
            <CheckCircle2 className="h-4 w-4" /> Проверка пройдена
          </span>
        ) : (
          "Проверка: перетащите кусочек пазла на пунктирное место"
        )}
      </p>
      <div className="relative w-full overflow-hidden rounded-xl border border-line" style={{ height: H }}>
        <canvas ref={canvasRef} width={W} height={H} className="block h-full w-full" aria-hidden />
        {/* Перетаскиваемый кусочек */}
        {!solved && (
          <motion.div
            role="slider"
            aria-label="Кусочек пазла"
            aria-valuenow={Math.round(pieceX)}
            tabIndex={0}
            className="absolute top-1 cursor-grab touch-none rounded-md border-2 border-white bg-primary shadow-md active:cursor-grabbing"
            style={{ left: `${(pieceX / W) * 100}%`, width: `${(SIZE / W) * 100}%`, height: SIZE }}
            onPointerDown={(e) => {
              (e.target as HTMLElement).setPointerCapture(e.pointerId);
              setDragging(true);
            }}
            onPointerUp={(e) => {
              setDragging(false);
              check(pieceX);
              void e;
            }}
            onPointerMove={(e) => dragging && move(e.clientX)}
            onKeyDown={(e) => {
              // Доступность: кусочек можно двигать стрелками
              if (e.key === "ArrowRight") setPieceX((x) => Math.min(W - SIZE, x + 4));
              if (e.key === "ArrowLeft") setPieceX((x) => Math.max(0, x - 4));
              if (e.key === "Enter" || e.key === " ") check(pieceX);
            }}
          >
            {/* Фактура кусочка совпадает с подложкой */}
            <div className="h-full w-full rounded bg-[linear-gradient(180deg,#8CC63F_60%,#6BA534_60%)]" />
          </motion.div>
        )}
      </div>
    </div>
  );
}
