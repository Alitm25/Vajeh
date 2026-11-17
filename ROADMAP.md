# نقشهٔ راه پروژهٔ Vajeh

> **Vajeh (واژه)** اسم موقت است و هر وقت خواستی عوضش کن.

## چشم‌انداز

Vajeh یک ابزار تحت وب برای مدیریت ترجمهٔ نرم‌افزار (TMS) است:

- برنامه‌نویس فایل‌های i18n را import می‌کند.
- مترجم در یک ویرایشگر سریع و کیبورد-محور ترجمه می‌کند.
- بازبین ترجمه را تأیید یا رد می‌کند.
- برنامه‌نویس فایل نهایی را export می‌کند.

**دو هدف، به ترتیب اولویت:**

1. یادگیری عمیق مهندسی فرانت‌اند: فهمیدن «چرا»، نه فقط «چطور».
2. تحویل یک محصول واقعی، deploy‌شده و قابل دفاع در مصاحبه.

## قواعد بازی

- **مبنای پیشرفت milestone است، نه تاریخ.** تخمین‌ها بر اساس حدود ۶ تا ۸ ساعت در هفته است. کل مسیر تقریباً ۱۵ تا ۲۰ هفته طول می‌کشد.
- **هر جلسه یک هدف کوچک و تمام‌شدنی دارد** (۶۰ تا ۹۰ دقیقه).
- **فاز بعد فقط وقتی شروع می‌شود** که Definition of Done فاز فعلی برآورده شده باشد و بتوانی به «سؤال‌هایی که باید جواب بدهی» جواب قانع‌کننده بدهی.
- **وقفه اشکالی ندارد.** اگر کار یا امتحان فاصله انداخت، `docs/learning-log.md` نقطهٔ برگشت توست.
- **کد هستهٔ هر فاز را خودت می‌نویسی.** Claude Code توضیح می‌دهد، سؤال می‌پرسد، راهنمایی می‌کند و review می‌کند. جزئیات این همکاری در `CLAUDE.md` آمده است.

---

## نقشهٔ مهارت‌ها: چه چیزی کدنویس را مهندس می‌کند

| حوزه | یعنی چه | کجای پروژه |
|---|---|---|
| TypeScript عمیق | generics، discriminated union، narrowing، مرزهای type-safe | فاز ۱ و در همهٔ پروژه |
| مدل ذهنی React | render، reconciliation، جای درست state، استفادهٔ درست از effect | فاز ۳ و ۴ |
| مدل رندر Next.js | Server/Client Components، streaming، caching، Server Actions | فاز ۲ و ۳ |
| مدیریت داده | تفکیک server state، URL state و UI state؛ cache؛ optimistic update؛ race condition | فاز ۳ و ۴ |
| معماری | مرزبندی لایه‌ها، feature folders، ADR، build vs buy | از فاز ۰ |
| Accessibility | semantic HTML، الگوی grid، focus management، screen reader | فاز ۳، ۴ و ۵ |
| Performance | Core Web Vitals، profiling، virtualization، code splitting، Web Worker | فاز ۴ و ۵ |
| i18n و متن دوطرفه | Unicode bidi، ICU MessageFormat، `Intl`، CSS logical properties | فاز ۱ و ۴ |
| تست | استراتژی تست، Vitest، Testing Library، MSW، Playwright، axe | همه‌جا، با اوج در فاز ۵ |
| امنیت | XSS، authentication در برابر authorization، RLS، trust boundary | فاز ۲ و ۵ |
| تحویل و عملیات | CI/CD، preview deploy، monitoring، error tracking | فاز ۰ و ۵ |
| مهارت محصولی | spec، کنترل scope، مستندسازی، case study | فاز ۰ و ۷ |

---

## محدودهٔ محصول

### MVP

- ورود کاربر، پروژه‌ها و نقش‌ها (owner، translator، reviewer)
- import و export فایل JSON (هم nested و هم flat)
- ویرایشگر شامل:
  - لیست کلیدها با جستجو و فیلتر
  - ویرایش مبدأ و مقصد کنار هم
  - autosave
  - workflow وضعیت ترجمه
- اعتبارسنجی placeholder و ICU plural
- glossary ساده

### بعد از MVP

در فاز ۶، یکی یا دو مورد از ویژگی‌های متمایزکننده را انتخاب می‌کنی.

### خارج از scope

پرداخت و billing، سازمان‌های چندگانه (multi-tenant)، پشتیبانی از ده‌ها فرمت فایل، و اپ موبایل.

---

## استک پیش‌فرض

تصمیم نهایی در ADR-0001 در فاز ۰ گرفته می‌شود. پیش‌فرض این است:

- **Framework:** Next.js (App Router) با TypeScript در حالت strict
- **UI:** Tailwind CSS و Radix UI primitives. ویرایشگر اصلی را خودت می‌سازی، نه با کتابخانهٔ آماده.
- **داده در کلاینت:** TanStack Query برای server state در ویرایشگر و TanStack Virtual برای virtualization
- **Validation:** Zod
- **Backend:** Supabase، شامل Postgres، Auth، Row Level Security و Realtime
  - اگر دسترسی به سرویس‌ها مشکل داشت، جایگزین این است: Postgres در Docker، Drizzle ORM و یک کتابخانهٔ auth.
  - به همین دلیل UI فقط از طریق لایهٔ data access با دیتابیس حرف می‌زند، تا عوض کردن backend ارزان بماند.
- **تست:** Vitest، Testing Library، MSW، Playwright و axe-core
- **تحویل:** GitHub Actions، Vercel (یا هر host دیگری که برایت در دسترس است) و Sentry

---

## فاز ۰ — پایه‌ریزی مهندسی (~۱ تا ۲ هفته)

**هدف:** قبل از نوشتن کد، مثل یک مهندس فکر کنی: مسئله چیست، کاربر کیست، scope تا کجاست و هر ابزار چه کاری انجام می‌دهد.

**یاد می‌گیری:**

- نوشتن spec کوتاه و user story
- اینکه هر ابزار در toolchain چه مسئله‌ای را حل می‌کند: TypeScript compiler، bundler، linter، formatter
- معنی flagهای مهم `tsconfig`
- ADR چیست و چرا تصمیم‌ها را مکتوب می‌کنیم

**تسک‌ها:**

- [ ] `docs/spec.md` شامل مسئله، سه persona (برنامه‌نویس، مترجم، بازبین)، user storyهای MVP و موارد خارج از scope
- [ ] wireframe ساده (روی کاغذ هم کافی است) برای لیست پروژه‌ها، صفحهٔ پروژه و ویرایشگر
- [ ] ADR-0001 برای انتخاب استک، با بررسی اینکه به کدام سرویس‌ها دسترسی پایدار داری
- [x] راه‌اندازی Next.js با TypeScript strict و `noUncheckedIndexedAccess`
- [x] ESLint، Prettier و اسکریپت‌های `typecheck`، `lint` و `test`
- [x] Vitest با یک تست نمونه
- [ ] GitHub Actions که روی هر push و PR، lint، typecheck و test را اجرا کند
- [x] ساختار پوشه‌ها (`src/domain`، `src/features`، `src/server`، `src/lib`) و پوشهٔ `docs/` شامل `learning-log.md`، `adr/` و `parking-lot.md`
- [ ] اولین deploy، حتی با صفحهٔ خالی. قانون این است: «زود deploy کن، همیشه deploy کن.»

**Definition of Done:** CI سبز است، صفحهٔ خالی روی یک URL عمومی بالا آمده، و spec و ADR-0001 نوشته شده‌اند.

**سؤال‌هایی که باید بتوانی جواب بدهی:**

1. فرق type-check، lint و format چیست و چرا هر سه را جدا اجرا می‌کنیم؟
2. `strict` در tsconfig دقیقاً چه چیزهایی را روشن می‌کند؟ `noUncheckedIndexedAccess` چه باگی را می‌گیرد؟
3. چرا قبل از ساختن هر feature، CI و deploy را راه انداختیم؟
4. MVP این پروژه چیست و چه چیزی عمداً بیرون از آن مانده؟ چرا؟
5. ADR چه مشکلی را در یک تیم حل می‌کند؟

---

## فاز ۱ — هستهٔ دامنه با TypeScript خالص (~۲ هفته)

**هدف:** منطق اصلی محصول را بدون React و بدون دیتابیس بسازی. این لایه قلب سیستم است و باید کاملاً تست‌پذیر باشد.

**یاد می‌گیری:**

- طراحی type برای دامنه: discriminated union، branded type، و `Result` به‌جای throw
- pure function و جدا کردن منطق از framework
- TDD در عمل با Vitest
- ساختار ICU MessageFormat و placeholderها
- build vs buy: کجا parser خودت را بنویسی و کجا کتابخانه بهتر است

**تسک‌ها:**

- [ ] typeهای دامنه: `Locale`، `TranslationKey`، `Translation` و `TranslationStatus`
- [ ] state machine وضعیت ترجمه:
  - مسیر اصلی: `untranslated → draft → in_review → approved`
  - برگشت: `rejected → draft`
  - هر transition غیرمجاز باید رد شود.
- [ ] parser فایل JSON:
  - تبدیل nested به flat (مثل `checkout.pay`) و برعکس
  - مدیریت فایل نامعتبر با Zod
- [ ] استخراج placeholder ساده مثل `{name}`. این را **خودت از صفر بنویس.**
- [ ] پشتیبانی ICU (plural و select) با کتابخانه، مثلاً `@formatjs/icu-messageformat-parser`، و مقایسهٔ نتیجه با نسخهٔ خودت
- [ ] validator که placeholderهای مبدأ و مقصد را مقایسه کند و لیستی از issueها با severity برگرداند
- [ ] exporter که از ترجمه‌های approved فایل JSON نهایی بسازد و ترتیب کلیدها را حفظ کند
- [ ] تست کامل `src/domain` با edge caseها: کلید تکراری، آرایه، مقدار غیر string، فایل خالی، و کاراکترهای فارسی و emoji

**Definition of Done:** تمام منطق import، validate و export تست شده است و هیچ import از React یا Next در `src/domain` وجود ندارد.

**سؤال‌هایی که باید بتوانی جواب بدهی:**

1. چرا منطق دامنه را از framework جدا کردیم؟ این کار در تست‌نویسی و در عوض کردن framework چه سودی دارد؟
2. discriminated union چه برتری‌ای نسبت به چند فیلد optional دارد؟ با مثالی از همین پروژه جواب بده.
3. کی برگرداندن `Result` بهتر از throw است و کی نیست؟
4. چرا فایل ورودی را با Zod parse می‌کنیم و فقط type assertion نمی‌زنیم؟
5. parser placeholder خودت کجا شکست می‌خورد که کتابخانهٔ ICU نمی‌خورد؟

---

## فاز ۲ — داده، احراز هویت و مرزهای اعتماد (~۲ هفته)

**هدف:** مدل داده و امنیت را درست بچینی، قبل از اینکه UI روی آن ساخته شود.

**یاد می‌گیری:**

- مدل رندر Next.js: Server Component، Client Component و مرز `"use client"`
- فرق authentication و authorization، و اینکه چرا authorization باید در دیتابیس (RLS) باشد
- trust boundary: داده در کدام نقاط «نامعتمد» است
- طراحی schema رابطه‌ای و migration
- Server Actions یا Route Handlers همراه با validation سمت سرور

**تسک‌ها:**

- [ ] طراحی schema. این پیشنهاد اولیه است و باید دربارهٔ آن بحث شود:
  - `profiles`
  - `projects`
  - `project_members` (با ستون role)
  - `project_locales`
  - `keys`
  - `translations` (با ستون‌های `value`، `status`، `version` و `updated_by`)
  - `translation_events` (برای تاریخچه)
- [ ] migrationها داخل repo نگه داشته شوند، نه با کلیک در داشبورد
- [ ] RLS policy برای هر جدول، همراه با تست خودکار (کاربری که عضو پروژه نیست نباید چیزی ببیند)
- [ ] ثبت‌نام، ورود، صفحهٔ محافظت‌شده و logout
- [ ] لایهٔ data access در `src/server/` به‌عنوان تنها راه ارتباط با دیتابیس
- [ ] تولید typeهای دیتابیس و اتصال آن‌ها به typeهای دامنه
- [ ] seed script برای دادهٔ نمونه

**Definition of Done:** کاربر می‌تواند وارد شود، درستی policyها با تست خودکار ثابت شده، و هیچ کامپوننت UI مستقیماً با دیتابیس حرف نمی‌زند.

**سؤال‌هایی که باید بتوانی جواب بدهی:**

1. فرق Server Component و Client Component چیست؟ چه چیزهایی از مرز `"use client"` عبور می‌کنند و چه چیزهایی نه؟
2. اگر بررسی دسترسی فقط در UI انجام شود، مهاجم چطور آن را دور می‌زند؟
3. ستون `version` در جدول `translations` قرار است چه مشکلی را حل کند؟
4. چرا migrationها را در repo نگه می‌داریم؟
5. داده از کجاها وارد سیستم می‌شود و در هر نقطه چطور validate می‌شود؟

---

## فاز ۳ — پروژه‌ها، import/export و الگوهای UI (~۲ هفته)

**هدف:** اولین جریان کامل کاربر کار کند: ساخت پروژه، آپلود فایل، دیدن کلیدها و دانلود خروجی.

**یاد می‌گیری:**

- stateهای loading، error و empty؛ Suspense و error boundary
- فرم دسترس‌پذیر: label، نمایش پیام خطا، و مدیریت focus بعد از submit
- استفاده از URL به‌عنوان state (برای فیلتر، صفحه‌بندی و تب)
- progressive enhancement
- ساختن کامپوننت‌های پایه روی Radix و فهمیدن اینکه Radix کدام مشکل a11y را برایت حل می‌کند

**تسک‌ها:**

- [ ] صفحهٔ لیست پروژه‌ها و ساخت پروژه، با انتخاب زبان مبدأ و زبان‌های مقصد
- [ ] آپلود فایل با drag & drop و انتخاب دستی. قبل از تأیید import، پیش‌نمایش تغییرات نشان داده شود: کلیدهای جدید، حذف‌شده و تغییرکرده.
- [ ] export با انتخاب زبان و انتخاب بین «فقط approved» و «همه»
- [ ] مدیریت اعضا و نقش‌ها با یک دعوت ساده
- [ ] کامپوننت‌های پایه با پشتیبانی RTL: Button، Dialog، Toast، Input و Select
- [ ] UI خود اپ به دو زبان فارسی و انگلیسی، با `dir` درست
- [ ] تست رفتاری کامپوننت‌ها با Testing Library و MSW

**Definition of Done:** جریان کامل کار می‌کند، با کیبورد قابل استفاده است، و stateهای خطا و خالی طراحی شده‌اند.

**سؤال‌هایی که باید بتوانی جواب بدهی:**

1. چرا فیلترها را در URL نگه داشتی و نه در `useState`؟
2. Suspense و error boundary هر کدام چه چیزی را مدیریت می‌کنند؟
3. پیش‌نمایش تغییرات قبل از import چه مشکل محصولی را حل می‌کند؟
4. چرا Testing Library می‌گوید «مثل کاربر تست کن»؟ مثالی از تستی بزن که implementation detail را تست می‌کند.
5. CSS logical properties چه مشکلی را در RTL حل می‌کنند؟

---

## فاز ۴ — ویرایشگر، قلب محصول (~۳ تا ۴ هفته)

**هدف:** ویرایشگر سریع‌ترین و دلپذیرترین بخش اپ باشد. بیشترین رشد فنی تو در همین فاز اتفاق می‌افتد.

**یاد می‌گیری:**

- معماری state: چه چیزی server state است، چه چیزی در URL است و چه چیزی local
- چرخهٔ render در React و profiling با React DevTools
- virtualization و اینکه چرا لازم است (اندازهٔ DOM و هزینهٔ layout)
- الگوی `grid` در WAI-ARIA، roving tabindex و focus management
- autosave با debounce، optimistic update و rollback
- race condition و optimistic concurrency با ستون `version`
- متن دوطرفه: `dir="auto"`، الگوریتم Unicode bidi، و نمایش placeholder داخل متن RTL

**تسک‌ها:**

- [ ] layout ویرایشگر: لیست کلیدها، و یک پنل ویرایش شامل مبدأ، مقصد، توضیح کلید و issueها
- [ ] جستجو و فیلتر (بر اساس وضعیت، داشتن خطا، ترجمه‌نشده) که در URL ذخیره شوند
- [ ] virtualization لیست، با ۱۰٬۰۰۰ کلید seed‌شده برای آزمایش
- [ ] ناوبری کامل با کیبورد:
  - ↑ و ↓ برای حرکت بین ردیف‌ها
  - Enter برای ویرایش و Esc برای خروج
  - میانبر برای «approve و برو به بعدی»
  - صفحه‌ای که همهٔ میانبرها را نشان دهد
- [ ] autosave با debounce و نشانگر وضعیت (saving، saved، failed)
- [ ] optimistic update، با rollback در صورت خطا
- [ ] تشخیص conflict وقتی کس دیگری همزمان همان ترجمه را تغییر داده، و UI برای حل آن
- [ ] اعتبارسنجی زندهٔ placeholder و ICU، با highlight کردن مشکل داخل متن
- [ ] workflow وضعیت بر اساس نقش: submit for review، approve، و reject با کامنت
- [ ] پیش‌نمایش plural برای اعداد مختلف با `Intl.PluralRules`
- [ ] تست برای رفتار کیبورد، autosave، rollback و conflict

**Definition of Done:**

- ۱۰٬۰۰۰ کلید بدون لگ محسوس کار می‌کند، و این ادعا با عدد اندازه‌گیری‌شده ثابت شده است.
- کل ویرایشگر بدون موس قابل استفاده است.
- هیچ ترجمه‌ای بی‌صدا گم نمی‌شود.

**سؤال‌هایی که باید بتوانی جواب بدهی:**

1. وقتی کاربر یک حرف تایپ می‌کند، دقیقاً چه چیزهایی re-render می‌شوند؟ این را چطور اندازه گرفتی؟
2. virtualization چه trade-offهایی دارد؟ (find-in-page، a11y، ردیف‌هایی با ارتفاع متغیر)
3. اگر دو درخواست autosave به ترتیب برعکس برگردند چه اتفاقی می‌افتد؟ چطور جلویش را گرفتی؟
4. roving tabindex چیست و چرا در grid از آن استفاده کردیم؟
5. چرا یک جملهٔ فارسی که `{count}` و یک کلمهٔ انگلیسی دارد ممکن است به‌هم‌ریخته نمایش داده شود؟ راه‌حلت چه بود؟

---

## فاز ۵ — نوار کیفیت production (~۲ هفته)

**هدف:** از «کار می‌کند» به «قابل اعتماد است» برسی.

**یاد می‌گیری:**

- استراتژی تست و اینکه هر لایهٔ تست چه چیزی را پوشش می‌دهد
- Core Web Vitals (LCP، INP و CLS) و اندازه‌گیری واقعی آن‌ها
- bundle analysis و code splitting
- error tracking و observability
- audit دسترسی‌پذیری، هم با ابزار و هم با screen reader واقعی

**تسک‌ها:**

- [ ] تست E2E با Playwright برای جریان حیاتی: ورود، ساخت پروژه، import، ترجمه، approve و export
- [ ] اجرای axe در تست‌های کامپوننت و E2E
- [ ] تست دستی ویرایشگر با screen reader (NVDA یا VoiceOver) و ثبت نتایج
- [ ] Lighthouse CI با budget مشخص در pipeline
- [ ] bundle analyzer، و حذف یا lazy-load کردن دست‌کم یک وابستگی سنگین
- [ ] اندازه‌گیری INP در ویرایشگر و بهبود آن، با ثبت عدد قبل و بعد در `docs/performance.md`
- [ ] Sentry، error boundaryهای معنادار، و صفحه‌های 404 و 500
- [ ] preview deploy برای هر PR
- [ ] بازبینی امنیتی:
  - security headers و یک CSP پایه
  - بررسی دوبارهٔ RLS
  - rate limit روی endpointهای حساس

**Definition of Done:** تست‌های E2E و a11y در CI اجرا می‌شوند، اعداد performance مستند شده‌اند، و خطاها در Sentry دیده می‌شوند.

**سؤال‌هایی که باید بتوانی جواب بدهی:**

1. INP چه چیزی را اندازه می‌گیرد، و در ویرایشگر چه چیزی آن را بد می‌کرد؟
2. چرا همه چیز را با E2E تست نمی‌کنیم؟
3. ابزارهای خودکار a11y چه چیزهایی را نمی‌توانند تشخیص بدهند؟
4. CSP جلوی چه نوع حمله‌ای را می‌گیرد؟
5. اگر فردا کاربری بگوید «ترجمه‌ام ذخیره نشد»، چطور ردش را می‌گیری؟

---

## فاز ۶ — ویژگی‌های متمایزکننده (~۲ تا ۳ هفته؛ یکی یا دو مورد را انتخاب کن)

- [ ] **A. Persian typography linter** (پیشنهاد اول، چون مزیت اختصاصی توست)
  - چه چیزهایی را تشخیص می‌دهد:
    - «ي» و «ك» عربی به‌جای «ی» و «ک» فارسی
    - نیم‌فاصلهٔ جاافتاده در الگوهای رایج
    - ارقام ناهمسان (فارسی و انگلیسی مخلوط)
    - نشانه‌گذاری نادرست («» ، ؛ ؟)
    - فاصلهٔ اضافه
  - برای هر مورد، اصلاح سریع با یک کلیک.
  - یاد می‌گیری: Unicode، regex دقیق، طراحی rule engine قابل گسترش، و Web Worker برای پردازش سنگین.
- [ ] **B. Translation memory**
  - پیشنهاد ترجمه از ترجمه‌های قبلی با fuzzy match (`pg_trgm` در Postgres) و نمایش درصد شباهت.
  - یاد می‌گیری: جستجوی تقریبی، index، و UX پیشنهاد.
- [ ] **C. پیشنهاد AI با بازبینی انسانی**
  - پیش‌نویس ترجمه با LLM از سمت سرور. کلید API هرگز به کلاینت نمی‌رسد.
  - پاسخ به‌صورت streaming، استفاده از glossary در prompt، و نمایش diff بین پیش‌نویس AI و نسخهٔ نهایی.
  - یاد می‌گیری: streaming UI، rate limit، مدیریت هزینه، و UX اعتماد.
- [ ] **D. همکاری realtime**
  - نمایش اینکه چه کسی روی کدام کلید کار می‌کند (presence)، و به‌روزرسانی زنده.
  - یاد می‌گیری: websocket، همگام‌سازی state، و مدیریت conflict.
- [ ] **E. glossary پیشرفته**
  - highlight کردن اصطلاحات در متن مبدأ، و هشدار وقتی ترجمهٔ ثبت‌شده رعایت نشده.

**Definition of Done برای هر ویژگی:** یک ADR، تست، و یک بخش در README.

---

## فاز ۷ — تحویل و ارائه (~۱ هفته)

**هدف:** پروژه در ۳۰ ثانیه قانع‌کننده باشد و بتوانی ۳۰ دقیقه در مصاحبه از آن دفاع کنی.

**تسک‌ها:**

- [ ] **Dogfooding:** رشته‌های UI خود Vajeh را با خود Vajeh مدیریت کن. این داستان خیلی خوبی برای مصاحبه است.
- [ ] حساب demo با دادهٔ نمونه، تا بازدیدکننده بدون ثبت‌نام بتواند امتحانش کند
- [ ] README در قالب case study، شامل:
  - مسئله
  - نمودار معماری
  - تصمیم‌های کلیدی و trade-offها
  - اعداد performance
  - وضعیت a11y
  - آنچه یاد گرفتی و آنچه حالا متفاوت انجام می‌دادی
- [ ] یک GIF یا ویدئوی کوتاه از کار با ویرایشگر فقط با کیبورد
- [ ] ۳ تا ۴ bullet عددی برای رزومه، مثلاً «ویرایشگر virtualized برای ۱۰k کلید با INP زیر X میلی‌ثانیه»
- [ ] تمرین توضیح شفاهی پروژه، یک نسخهٔ ۲ دقیقه‌ای و یک نسخهٔ ۱۰ دقیقه‌ای

**Definition of Done:** یک غریبه با لینک demo در کمتر از یک دقیقه بفهمد این ابزار چیست و بتواند با آن کار کند.

---

## منابع اصلی

برای مطالعه در طول مسیر. Claude Code در هر تسک، بخش دقیقی را که باید بخوانی معرفی می‌کند.

- [react.dev](https://react.dev): به‌خصوص بخش‌های «Thinking in React»، «You Might Not Need an Effect» و «Managing State»
- [Next.js Docs](https://nextjs.org/docs): App Router، rendering و caching
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/): الگوهای Grid، Listbox و Dialog
- [web.dev](https://web.dev): Core Web Vitals و performance
- [MDN](https://developer.mozilla.org): `Intl`، bidi و CSS logical properties
- [Testing Library](https://testing-library.com) و [Playwright](https://playwright.dev)
- مستندات Supabase (یا backend نهایی‌ای که انتخاب کنی) دربارهٔ RLS
