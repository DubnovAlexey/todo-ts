// ФАЙЛ: taskStorage.ts. НАЗНАЧЕНИЕ: проверка сохранённых задач и уникальные ID.
// РАЗДЕЛЫ: 1. Чтение недоверенного JSON; 2. Создание задачи.
import type {TaskItem} from './types.ts';

// НАЧАЛО ФУНКЦИИ parseTasks
export function parseTasks(raw: string | null): TaskItem[] {
  try {
    const value: unknown = JSON.parse(raw ?? '[]');
    if (!Array.isArray(value)) return [];
    const used = new Set<number>();
    const tasks: TaskItem[] = [];
    for (const entry of value) {
      if (!entry || typeof entry !== 'object' || !Number.isSafeInteger(entry.id) ||
          typeof entry.text !== 'string' || !entry.text.trim() || used.has(entry.id)) continue;
      used.add(entry.id);
      tasks.push({id: entry.id, text: entry.text, done: entry.done === true});
    }
    return tasks;
  } catch { return []; }
}
// КОНЕЦ ФУНКЦИИ parseTasks

// НАЧАЛО ФУНКЦИИ createTask
/** Повторные добавления в одну миллисекунду сохраняют разные ID. */
export function createTask(tasks: readonly TaskItem[], now = Date.now()): TaskItem {
  const ids = new Set(tasks.map(task => task.id));
  let id = Number.isSafeInteger(now) ? now : 0;
  while (ids.has(id)) id = id < Number.MAX_SAFE_INTEGER ? id + 1 : 0;
  return {id, text: 'New task', done: false};
}
// КОНЕЦ ФУНКЦИИ createTask
