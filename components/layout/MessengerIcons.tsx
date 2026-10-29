import Image from "next/image";
import { site } from "@/content/site";

/**
 * Иконки мессенджеров (VK / WhatsApp / Макс).
 * Ссылки — в content/site.ts (перенесены со старого сайта).
 * Все три иконки — силуэты фирменного тёмно-зелёного на светло-зелёной подложке;
 * у Макса — монохромный силуэт официального логотипа (public/icons/max.png).
 */
export function MessengerIcons({ light = false }: { light?: boolean }) {
  return (
    <div className="flex gap-3">
      {site.messengers.map((m) => (
        <a
          key={m.id}
          href={m.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={m.label}
          title={m.label}
          className={`flex h-11 w-11 items-center justify-center rounded-full transition-transform hover:scale-110 ${
            light ? "bg-white/15 hover:bg-primary" : "bg-primary-light hover:bg-primary"
          }`}
        >
          {m.id === "max" ? (
            <Image src="/icons/max.png" alt="Макс" width={24} height={24} className="h-6 w-6" />
          ) : (
            <MessengerIcon id={m.id} />
          )}
        </a>
      ))}
    </div>
  );
}

/** Простые SVG-иконки (упрощённые). Можно заменить на брендовые. */
function MessengerIcon({ id }: { id: string }) {
  const cls = "h-5 w-5 text-forest";
  switch (id) {
    case "vk":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls} aria-hidden>
          <path d="M12.7 18c-5.5 0-8.6-3.8-8.7-10.2h2.8c.1 4.7 2.2 6.7 3.7 7.1V7.8h2.7v4c1.5-.2 3-2.1 3.5-4h2.7c-.4 2.5-2.2 4.4-3.5 5.2 1.3.6 3.5 2.3 4.2 5H16c-.5-1.7-1.9-3-4-3.2V18h.7z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls} aria-hidden>
          <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.5 14.2c-.2.7-1.3 1.3-1.9 1.3-.5.1-1.1.1-1.8-.1-2.7-.9-4.6-3.2-5.7-4.9-.6-1-1-2.1-.9-3.1 0-.8.4-1.5 1-1.9.3-.2.7-.1.9.2l.9 1.7c.1.3.1.6-.1.8l-.5.6c.5 1.3 1.9 2.8 3.4 3.4l.6-.6c.2-.2.5-.3.8-.1l1.7.9c.4.2.5.6.3.9l.1-.1z" />
        </svg>
      );
    default:
      return null;
  }
}
