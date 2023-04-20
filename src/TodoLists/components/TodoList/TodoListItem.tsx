import { TodoList } from "../../../types/todoListTypes";
import React from "react";
import { Link } from "react-router-dom";
import { RemoveButton } from "../../../common/buttons/RemoveButton";

interface TodoListItemProps {
  todoList: TodoList;
  onRemove: (id: number) => void;
}

export const TodoListItem = ({ todoList, onRemove }: TodoListItemProps) => {
  const itemsCount = todoList.items.length;
  const itemsDoneCount = todoList.items.filter((item) => item.done).length;
  const radialValue =
    itemsCount > 0 ? Math.round((100 * itemsDoneCount) / itemsCount) : 100;
  const radialStyle = {
    "--value": radialValue,
    "--size": "4rem",
  } as React.CSSProperties;

  const radialColor = () => {
    return itemsDoneCount === itemsCount ? " text-success" : " text-primary";
  };

  return (
    <div className="border p-3 my-2 flex flex-row justify-between items-center">
      <div>
        <div
          className={"radial-progress mr-5" + radialColor()}
          style={radialStyle}
        >
          {radialValue}%
        </div>
        <Link
          to={`/todo-list/${todoList.id}`}
          relative="path"
          className="text-primary hover:text-success underline hover:no-underline"
        >
          {todoList.name}
        </Link>
      </div>
      <div>
        <span className="text-primary px-1">Items: {itemsCount}</span>
        <span className="text-red-500 px-1">
          Active: {itemsCount - itemsDoneCount}
        </span>
        <span className="text-success px-1">Done: {itemsDoneCount}</span>
      </div>
      <div>
        <RemoveButton onRemove={() => onRemove(todoList.id)} />
      </div>
    </div>
  );
};
