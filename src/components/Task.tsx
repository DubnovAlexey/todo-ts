/* ---------------------------------------------------
   Компонент Task — отображает одну задачу (один элемент списка)
   --------------------------------------------------- */
import {useRef, useState} from "react";


interface Props {
  children: string,
  index: number,
  remove: (index: number) => void,
  edit:(index: number, text: string) => void
}

const Task = ({children, index, remove, edit}: Props) => {
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
    remove(index); // передаём индекс задачи в функцию deleteTask()
  };

  // Обработчик кнопки "Save" — сохраняет изменения
  const handleClickSave = () => {
    edit(index, textId.current!.value); // передаём индекс и новый текст
    setIsEditing(false); // возвращаемся из режима редактирования
  };

  /*
    Условный рендеринг:
    Если isEditing === true, показываем <textarea> и кнопку "Save".
    Иначе — просто текст задачи и кнопки "Edit" и "Remove".
  */
  if (isEditing) {
    return (
      <div className="box">
        <textarea
          ref={textId}           // сохраняем ссылку на элемент
          defaultValue={children} // начальное значение — текущий текст задачи
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
      <div className="box">
        <div>{children}</div>
        {/* отображаем текст задачи */}
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