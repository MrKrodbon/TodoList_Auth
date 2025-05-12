import { useSelector } from "react-redux";
import { selectTodoList } from "../../redux/todoList/selectors";
import TodoListItem from "../TodoListItem/TodoListItem";

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
