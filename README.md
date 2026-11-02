# To-Do List

**English** · [עברית](README.he.md) · [Русский](README.ru.md)

A to-do list in React and TypeScript: add, edit, tick off and remove tasks, filter them, and keep them after a page reload.

**Live demo:** https://dubnovalexey.github.io/todo-ts/

## Features

- Add a task, edit its text in place, remove it.
- Tick a task as done; done tasks are crossed out.
- Filters **All / Active / Done** and a counter of tasks left.
- Tasks are saved in `localStorage` under the key `todo-ts:tasks`, so they survive a reload.
- Fits a phone screen.

## Tech stack

React 19 · TypeScript · Vite · GitHub Actions · GitHub Pages

## What I practised

- Immutable state updates (`map`, `filter`, spread) instead of changing arrays in place.
- Stable keys (`id`) for list items, so editing and removing never mix up tasks.
- Lazy initial state and `useEffect` to load and save data.
- `useRef` to read a text area, conditional rendering for the edit mode.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Every push to `master` builds the app and publishes it to GitHub Pages (`.github/workflows/deploy.yml`). One-time setup on GitHub: **Settings → Pages → Source: GitHub Actions**.

## Roadmap

- Drag and drop to reorder tasks.
- Due dates and reminders.
- Unit tests for the list logic (Vitest + Testing Library).
