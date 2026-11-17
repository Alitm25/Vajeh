# Learning log

## 2026-11-17 — معماری و setup پروژه
- Built:
  - Next.js 16.4 + TypeScript strict با `noUncheckedIndexedAccess`، Vitest 5، Prettier، اسکریپت‌های `typecheck`، `lint`، `test` و `check`
  - ساختار لایه‌ها: `app`، `features`، `server`، `domain`، `ui`، `lib` (جزئیات در `docs/architecture.md`)
  - قانون مرز import در ESLint: `domain` نمی‌تواند React/Next/DB یا لایه‌های دیگر را import کند
  - `Result<T, E>` در `src/domain/shared` با تست
- Learned:
  - تفاوت مترجم و بازبین: مترجم متن را می‌بیند، بازبین محصول را (four-eyes principle)
  - تصمیم محصولی: self-approve قابل تنظیم برای هر پروژه (پیش‌فرض خاموش)، چون بیشتر پروژه‌ها شخصی‌اند
  - خواندن خطای `ERESOLVE` در npm: Vitest 5 به `@types/node` نسخهٔ ۲۲ یا بالاتر نیاز داشت؛ راه درست ارتقای typeها به نسخهٔ Node واقعی بود، نه `--force`
  - Vite 8 خودش `tsconfigPaths` را پشتیبانی می‌کند و پلاگین جدا لازم نیست
- Struggled with / open questions:
  - `docs/spec.md` هنوز خالی است
  - ADR-0001 (انتخاب استک)، CI و deploy هنوز انجام نشده
- Next: state machine وضعیت ترجمه در حالت Pair (`src/domain/translation`)
