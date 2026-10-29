/**
 * Обёртка запуска Next.js (npm run dev / npm run start).
 *
 * Зачем: Kimi Work (и другие лаунчеры) передают порт и хост как
 *   npm run dev -- --host 127.0.0.1 --port 7100
 * Но у Next.js 14 опции --host нет (есть -H / --hostname), и команда падает
 * с «error: unknown option '--host'». Этот скрипт переводит аргументы
 * в формат Next и запускает его, пробрасывая всё остальное как есть.
 *
 * Ручной запуск по-прежнему работает: npm run dev [-- -p 7100]
 */
const { spawn } = require("child_process");
const path = require("path");

const mode = process.argv[2] === "start" ? "start" : "dev";

// Переводим аргументы лаунчера в формат Next.js
const args = [];
const raw = process.argv.slice(3);
for (let i = 0; i < raw.length; i++) {
  const a = raw[i];
  if (a === "--host") {
    // --host <value>  →  -H <value>  (hostname в терминах Next)
    args.push("-H", raw[++i]);
  } else if (a.startsWith("--host=")) {
    args.push("-H", a.slice("--host=".length));
  } else {
    args.push(a);
  }
}

const nextBin = path.join(__dirname, "..", "node_modules", "next", "dist", "bin", "next");
const child = spawn(process.execPath, [nextBin, mode, ...args], { stdio: "inherit" });

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 1);
});
