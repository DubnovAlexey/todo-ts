import './App.css';
import {useState} from "react";
import Task from "./components/Task.tsx";

const App = () => {
  // Состояние со списком задач
  const [tasks, setTasks] = useState<string[]>([]);

  // Удаление задачи по индексу
  const deleteTask = (index: number) => {
    const newTasks = [...tasks]; // копируем массив (важно не мутировать state напрямую)
    newTasks.splice(index, 1);   // удаляем элемент
    setTasks(newTasks);          // обновляем состояние
  };

  // Редактирование задачи
  const editTask = (index: number, text: string) => {
    const newTasks = [...tasks];
    newTasks[index] = text;      // заменяем старый текст новым
    setTasks(newTasks);
  };

  // Добавление новой задачи
  const addTask = () => {
    setTasks([...tasks, 'New task']); // создаём новую копию массива с добавленной задачей
  };

  // Возвращаем JSX — интерфейс для пользователя
  return (
    <div className="field">
      {/* Кнопка добавления новой задачи */}
      <button
        onClick={addTask}
        className="btn new"
      >Add task
      </button>

      {/*
        Проходимся по массиву задач и для каждой создаём компонент Task.
        Передаём функции remove и edit (но не вызываем их — просто передаём ссылку).
      */}
      {tasks.map((t, i) => (
        <Task
          key={i}            // уникальный ключ для React
          index={i}          // индекс задачи
          remove={deleteTask} // ссылка на функцию удаления
          edit={editTask}     // ссылка на функцию редактирования
        >

          {t}
        </Task>   /*  передаём текст задачи как children
        */
      ))}
    </div>
  );
};


export default App
