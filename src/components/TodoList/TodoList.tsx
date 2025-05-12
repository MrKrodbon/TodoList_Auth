import { useDispatch, useSelector } from "react-redux";
import { selectTodoList } from "../../redux/todoList/selectors";
import TodoListItem from "../TodoListItem/TodoListItem";
import { Formik, type FormikHelpers } from "formik";
import type { Todo } from "../../types";
import { addTodo } from "../../redux/todoList/slices"; // якщо такого немає — створи компонент або заміни на <button>

const TodoList = () => {
  const todoList = useSelector(selectTodoList);

  return (
    <div>
      <ul className="flex flex-col gap-4">
        {todoList.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
