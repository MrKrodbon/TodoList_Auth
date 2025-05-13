import type { ToDoListProps } from "../../types";
import ToDoListItem from "../ToDoListItem/ToDoListItem";

const ToDoList = ({ todos }: ToDoListProps) => {
  return (
    <div>
      <ul className="flex flex-col gap-4">
        {todos.map((todo) => (
          <ToDoListItem
            key={todo.id}
            title={todo.title}
            description={todo.description}
            id={todo.id}
            isCompleted={todo.isCompleted}
          />
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
