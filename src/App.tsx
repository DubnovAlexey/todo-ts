import './App.css';
import {useEffect, useState} from "react";
import {parseTasks, createTask} from "./taskStorage.ts";
import Task from "./components/Task.tsx";
import type {TaskItem} from "./types.ts";

// Ключ в localStorage с префиксом проекта: на dubnovalexey.github.io у всех проектов общее хранилище
const STORAGE_KEY = 'todo-ts:tasks';

type Filter = 'all' | 'active' | 'done';
const FILTERS: Record<Filter, string> = {all: 'All', active: 'Active', done: 'Done'};

// Читаем задачи из localStorage; если там пусто или испорчено — начинаем с пустого списка
const loadTasks = (): TaskItem[] => {
  try {
    return parseTasks(localStorage.getItem(STORAGE_KEY));
  } catch {
    return [];
  }
};

const App = () => {
  // Состояние со списком задач (при первом рендере — из localStorage)
  const [tasks, setTasks] = useState<TaskItem[]>(loadTasks);
  const [filter, setFilter] = useState<Filter>('all');
  // Только что добавленная задача сразу открывается для ввода текста
  const [editingId, setEditingId] = useState<number | null>(null);

  // Сохраняем задачи при каждом изменении
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); }
    catch { /* Ограниченное хранилище не мешает работе задач в текущей сессии. */ }
  }, [tasks]);

  // Удаление задачи по id (по индексу нельзя: после удаления индексы сдвигаются)
  const deleteTask = (id: number) => {
    setTasks(current => current.filter(t => t.id !== id));
  };

  // Редактирование текста задачи; пустой текст не сохраняем — остаётся прежний
  const editTask = (id: number, text: string) => {
    setEditingId(null);
    const trimmed = text.trim();
    if (!trimmed) return;
    setTasks(current => current.map(t => (t.id === id ? {...t, text: trimmed} : t))); // новая копия, state не мутируем
  };

  // Отметка «сделано» / «не сделано»
  const toggleTask = (id: number) => {
    setTasks(current => current.map(t => (t.id === id ? {...t, done: !t.done} : t)));
  };

  // Добавление новой задачи: она сразу открывается для ввода, а фильтр «Done» её не прячет
  const addTask = () => {
    const task = createTask(tasks);
    setTasks([...tasks, task]);
    setEditingId(task.id);
    if (filter === 'done') setFilter('all');
  };

  const visible = tasks.filter(t => (filter === 'all' ? true : filter === 'done' ? t.done : !t.done));
  const left = tasks.filter(t => !t.done).length;

  // Возвращаем JSX — интерфейс для пользователя
  return (
    <div className="field">
      <h1 className="title">To-do list</h1>

      {/* Кнопка добавления новой задачи */}
      <button
        onClick={addTask}
        className="btn new"
      >Add task
      </button>

      {/* Фильтры и счётчик невыполненных задач */}
      <div className="filters">
        {(Object.keys(FILTERS) as Filter[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`btn filter${filter === f ? ' active' : ''}`}
            aria-pressed={filter === f}
          >{FILTERS[f]}</button>
        ))}
        <span className="counter">{left} left</span>
      </div>

      {/*
        Проходимся по массиву задач и для каждой создаём компонент Task.
        Передаём функции remove, edit и toggle (но не вызываем их — просто передаём ссылку).
      */}
      {visible.map(t => (
        <Task
          key={t.id}          // уникальный и постоянный ключ для React
          task={t}
          remove={deleteTask} // ссылка на функцию удаления
          edit={editTask}     // ссылка на функцию редактирования
          toggle={toggleTask} // ссылка на функцию отметки «сделано»
          startEditing={t.id === editingId}
        />
      ))}

      {/* Пустой список: подсказываем, с чего начать, вместо пустой страницы */}
      {visible.length === 0 && (
        <p className="empty">
          {tasks.length === 0
            ? 'No tasks yet. Press “Add task” and type what needs doing.'
            : `No ${FILTERS[filter].toLowerCase()} tasks.`}
        </p>
      )}

      {/* Ссылка на исходный код проекта */}
      <a
        className="source-link"
        href="https://github.com/DubnovAlexey/todo-ts"
        target="_blank"
        rel="noopener noreferrer"
      >Source code on GitHub</a>
    </div>
  );
};


export default App
