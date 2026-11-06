/* ---------------------------------------------------
   Компонент Task — отображает одну задачу (один элемент списка)
   --------------------------------------------------- */
import {useRef, useState} from "react";
import type {TaskItem} from "../types.ts";


interface Props {
  task: TaskItem,
  remove: (id: number) => void,
  edit: (id: number, text: string) => void,
  toggle: (id: number) => void
}

const Task = ({task, remove, edit, toggle}: Props) => {
  // Локальное состояние, отвечает за то, редактируем ли мы сейчас задачу
  const [isEditing, setIsEditing] = useState(false);

  // useRef — создаём ссылку на <textarea>, чтобы позже прочитать значение
  const textId = useRef<HTMLTextAreaElement>(null);

  // Обработчик кнопки "Edit" — включает режим редактирования
  const handleClickEdit = () => {
    setIsEditing(true);
  };

  // Обработчик кнопки "Remove" — вызывает функцию удаления из родителя
  const handleClickRemove = () => {
    remove(task.id); // передаём id задачи в функцию deleteTask()
  };

  // Обработчик кнопки "Save" — сохраняет изменения
  const handleClickSave = () => {
    edit(task.id, textId.current?.value ?? task.text); // передаём id и новый текст
    setIsEditing(false); // возвращаемся из режима редактирования
  };

  /*
    Условный рендеринг:
    Если isEditing === true, показываем <textarea> и кнопку "Save".
    Иначе — флажок «сделано», текст задачи и кнопки "Edit" и "Remove".
  */
  if (isEditing) {
    return (
      <div className="box">
        <textarea
          ref={textId}           // сохраняем ссылку на элемент
          aria-label="Task text"
          defaultValue={task.text} // начальное значение — текущий текст задачи
          autoFocus
        ></textarea>
        <button
          onClick={handleClickSave} // вызываем сохранение
          className="btn success"
        >
          Save
        </button>
      </div>
    );
  } else {
    return (
      <div className={`box${task.done ? ' done' : ''}`}>
        <label className="task-text">
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => toggle(task.id)} // отмечаем «сделано» / «не сделано»
          />
          <span>{task.text}</span>
        </label>
        <button
          onClick={handleClickEdit} // включаем режим редактирования
          className="btn light"
        >
          Edit
        </button>
        <button
          onClick={handleClickRemove} // удаляем задачу
          className="btn red"
        >
          Remove
        </button>
      </div>
    );
  }
};

export default Task;
