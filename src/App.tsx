import './App.css';
import {useEffect, useState} from "react";
import Task from "./components/Task.tsx";
import type {TaskItem} from "./types.ts";

// Ключ в localStorage с префиксом проекта: на dubnovalexey.github.io у всех проектов общее хранилище
const STORAGE_KEY = 'todo-ts:tasks';

type Filter = 'all' | 'active' | 'done';
const FILTERS: Record<Filter, string> = {all: 'All', active: 'Active', done: 'Done'};

// Читаем задачи из localStorage; если там пусто или испорчено — начинаем с пустого списка
const loadTasks = (): TaskItem[] => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

const App = () => {
  // Состояние со списком задач (при первом рендере — из localStorage)
  const [tasks, setTasks] = useState<TaskItem[]>(loadTasks);
  const [filter, setFilter] = useState<Filter>('all');

  // Сохраняем задачи при каждом изменении
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Удаление задачи по id (по индексу нельзя: после удаления индексы сдвигаются)
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Редактирование текста задачи; пустой текст не сохраняем — остаётся прежний
  const editTask = (id: number, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTasks(tasks.map(t => (t.id === id ? {...t, text: trimmed} : t))); // новая копия, state не мутируем
  };

  // Отметка «сделано» / «не сделано»
  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => (t.id === id ? {...t, done: !t.done} : t)));
  };

  // Добавление новой задачи
  const addTask = () => {
    setTasks([...tasks, {id: Date.now(), text: 'New task', done: false}]);
  };

  const visible = tasks.filter(t => (filter === 'all' ? true : filter === 'done' ? t.done : !t.done));
  const left = tasks.filter(t => !t.done).length;

  // Возвращаем JSX — интерфейс для пользователя
  return (
    <div className="field">
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
        />
      ))}
    </div>
  );
};


export default App
