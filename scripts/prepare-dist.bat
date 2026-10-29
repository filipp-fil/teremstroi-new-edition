@echo off
rem OneDrive портит симлинки в .next, поэтому директория сборки Next.js перенесена в %%TEMP%%.
rem Этот скрипт готовит junction %%TEMP%%\teremstroi-next-dist\node_modules -> node_modules проекта
rem (нужен TypeScript-у для разрешения 'next/...' из сгенерированных типов в distDir).
set "ROOT=%TEMP%\teremstroi-next-dist"
if not exist "%ROOT%" mkdir "%ROOT%"
if not exist "%ROOT%\node_modules" mklink /J "%ROOT%\node_modules" "%~dp0node_modules"
