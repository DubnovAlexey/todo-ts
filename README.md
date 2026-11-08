# To-Do List

[English](#english) · [Русский](#russian) · [עברית](#hebrew)

<a name="english"></a>

## English

A to-do list in React and TypeScript: add, edit, tick off and remove tasks, filter them, and keep them after a page reload.

**Live demo:** https://dubnovalexey.github.io/todo-ts/

### Try it

Add two tasks, edit one and mark it done. Switch between All, Active and Done, then reload to check local persistence.

### Features

- Add a task, edit its text in place, remove it. A new task opens for typing at once; **Enter** saves, **Shift+Enter** starts a new line.
- Tick a task as done; done tasks are crossed out.
- Filters **All / Active / Done** and a counter of tasks left. An empty list or filter shows a short hint instead of a blank page.
- Tasks are saved in `localStorage` under the key `todo-ts:tasks`, so they survive a reload.
- Fits a phone screen.

### Tech stack

React 19 · TypeScript · Vite · GitHub Actions · GitHub Pages

### Implementation notes

- Immutable state updates (`map`, `filter`, spread) instead of changing arrays in place.
- Stable keys (`id`) keep edits and removals associated with the correct task.
- Lazy initial state and `useEffect` to load and save data.
- `useRef` to read a text area, conditional rendering for the edit mode.

### Run locally

```bash
npm install
npm run dev
```

### Checks

Use Node.js 22.12+ or 24+.

```bash
npm test
npm run lint
npm run build
```

Tests cover untrusted saved tasks and unique IDs during rapid additions. If browser storage is unavailable, tasks remain usable for the current session.

### Deploy

Every push to `main` or `master` builds the app and publishes it to GitHub Pages (`.github/workflows/deploy.yml`). One-time setup on GitHub: **Settings → Pages → Source: GitHub Actions**.

### Further development

Proposals below are planned work, not existing features.

- Visual: consistent keyboard focus and a custom task-card favicon.
- Engineering: add component interaction tests for editing, filtering and reload; show when storage cannot save changes.
- Features: introduce due dates and keyboard-accessible reordering, followed by validated JSON import/export.

---

<a name="russian"></a>

## Русский

**Список дел**

Список дел на React и TypeScript: добавляйте, правьте, отмечайте и удаляйте задачи, фильтруйте их. После перезагрузки страницы задачи остаются.

**Демо:** https://dubnovalexey.github.io/todo-ts/

### Попробовать

Добавьте две задачи, исправьте одну и отметьте её выполненной. Переключите All, Active и Done, затем обновите страницу для проверки локального сохранения.

### Возможности

- Добавить задачу, исправить текст на месте, удалить. Новая задача сразу открывается для ввода; **Enter** сохраняет, **Shift+Enter** переносит строку.
- Отметить задачу сделанной — она зачёркивается.
- Фильтры **All / Active / Done** и счётчик оставшихся задач. Пустой список или фильтр показывает короткую подсказку вместо пустой страницы.
- Задачи хранятся в `localStorage` под ключом `todo-ts:tasks` и переживают перезагрузку.
- Помещается на экране телефона.

### Стек

React 19 · TypeScript · Vite · GitHub Actions · GitHub Pages

### Реализация

- Обновлять состояние без изменения исходных массивов (`map`, `filter`, spread).
- Постоянные ключи (`id`) связывают правку и удаление с нужной задачей.
- Ленивое начальное состояние и `useEffect` для загрузки и сохранения данных.
- `useRef` для чтения текстового поля, условный рендеринг для режима правки.

### Как запустить

```bash
npm install
npm run dev
```

### Проверки

Node.js 22.12+ или 24+.

```bash
npm test
npm run lint
npm run build
```

Тесты проверяют недоверенные сохранённые данные и уникальные ID при быстрых добавлениях. При недоступном хранилище задачи продолжают работать в текущей сессии.

### Публикация

Каждый пуш в `main` или `master` собирает приложение и публикует его на GitHub Pages (`.github/workflows/deploy.yml`). Один раз на GitHub: **Settings → Pages → Source: GitHub Actions**.

### Дальнейшее развитие

Ниже перечислены предложения, а не уже реализованные функции.

- Визуал: единый фокус с клавиатуры и собственный favicon карточки задачи.
- Инженерия: тесты взаимодействий при правке, фильтрации и перезагрузке; видимый статус невозможности сохранения.
- Функции: сроки и доступная с клавиатуры перестановка задач, затем импорт и экспорт JSON с валидацией.

---

<a name="hebrew"></a>

<div dir="rtl">

## עברית

**רשימת משימות**

רשימת משימות ב-React וב-TypeScript: מוסיפים, עורכים, מסמנים ומוחקים משימות, מסננים אותן, והן נשמרות גם אחרי רענון הדף.

**הדגמה:** https://dubnovalexey.github.io/todo-ts/

### מה כדאי לנסות

הוסיפו שתי משימות, ערכו אחת וסמנו אותה כבוצעה. עברו בין All, Active ו-Done ורעננו את הדף כדי לבדוק שמירה מקומית.

### יכולות

- הוספת משימה, עריכת הטקסט במקום ומחיקה. משימה חדשה נפתחת מיד להקלדה; **Enter** שומר, **Shift+Enter** מתחיל שורה חדשה.
- סימון משימה כבוצעה — היא מופיעה מחוקה בקו.
- מסננים **All / Active / Done** ומונה של המשימות שנותרו. רשימה או מסנן ריקים מציגים רמז קצר במקום דף ריק.
- המשימות נשמרות ב-`localStorage` תחת המפתח `todo-ts:tasks`.
- מתאים למסך טלפון.

### טכנולוגיות

React 19 · TypeScript · Vite · GitHub Actions · GitHub Pages

### הרצה מקומית

```bash
npm install
npm run dev
```

### בדיקות

Node.js 22.12+ או 24+.

```bash
npm test
npm run lint
npm run build
```

הבדיקות מכסות נתונים שמורים פגומים ומזהים ייחודיים בהוספה מהירה. כשהאחסון אינו זמין, המשימות עדיין פועלות במשך ההפעלה הנוכחית.

### המשך פיתוח

הסעיפים הבאים הם הצעות להמשך, לא יכולות שכבר יושמו.

- עיצוב: סימון מיקוד עקבי במקלדת וסמל לשונית של כרטיס משימה.
- הנדסה: בדיקות אינטראקציה לעריכה, סינון ורענון; הודעה כשאי אפשר לשמור באחסון.
- יכולות: תאריכי יעד וסידור משימות באמצעות המקלדת, ובהמשך יבוא ויצוא JSON עם אימות.

</div>
