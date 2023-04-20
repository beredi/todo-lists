import { useParams } from "react-router-dom";
import { useTodoListFetch } from "../../../hooks/useTodoListFetch";
import { useQuery } from "@tanstack/react-query";
import { getList } from "../../api/todoListsApi";
import { TodoItem } from "../../../types/todoListTypes";
import { useState } from "react";
import { FilterValue, TodoItemsFilter } from "./TodoItemsFilter";
import { AddNewTodoItemDialog } from "../TodoItem/AddNewTodoItemDialog";
import { ItemActions } from "../../../common/ItemActions/ItemActions";
import { TodoItems } from "../TodoItem/TodoItems";

export const TodoListComponent = () => {
  const { id } = useParams();
  const { updateListMutation, desc, setDesc } = useTodoListFetch();
  const [filter, setFilter] = useState<FilterValue>("all");
  const [openAddNew, setOpenAddNew] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const {
    isLoading,
    isError,
    error,
    data: todoList,
  } = useQuery({
    queryKey: ["todoList", id],
    queryFn: () => getList(parseInt(id!)),
  });

  const onCheck = (itemId: number, checked: boolean) => {
    const newList = { ...todoList };
    const itemIndex = newList.items.findIndex(
      (item: TodoItem) => item.id === itemId
    );
    newList.items[itemIndex].done = checked;
    updateListMutation.mutate(newList);
  };

  const removeItem = (itemId: number) => {
    const newList = { ...todoList };
    newList.items = newList.items.filter(
      (item: TodoItem) => item.id !== itemId
    );
    updateListMutation.mutate(newList);
  };

  const onAddNew = (newItem: TodoItem) => {
    const newList = { ...todoList };
    const items = newList.items;
    items.push(newItem);
    newList.items = items;
    updateListMutation.mutate(newList);
  };

  const itemsToDisplay = () => {
    let items = [];
    if (todoList.items) {
      switch (filter) {
        case "done":
          items = todoList.items.filter((item: TodoItem) => item.done);
          break;
        case "active":
          items = todoList.items.filter((item: TodoItem) => !item.done);
          break;
        default:
          items = todoList.items;
          break;
      }
    }
    if (desc && items.length > 0) {
      return items.sort((a: TodoItem, b: TodoItem) => b.id - a.id);
    } else {
      return items.sort((a: TodoItem, b: TodoItem) => a.id - b.id);
    }
  };

  const doFilter = (
    items: TodoItem[],
    columnExceptions: string[],
    lowercaseSearchValue: string
  ) => {
    return items.filter((todoItem: TodoItem) => {
      return Object.keys(todoItem).some((key) =>
        columnExceptions.includes(key)
          ? false
          : todoItem[key as unknown as keyof TodoItem]
              .toString()
              .toLowerCase()
              .includes(lowercaseSearchValue)
      );
    });
  };

  const filterItems = () => {
    const columnExceptions = ["id", "deadline"];
    const items = itemsToDisplay();
    const lowercaseSearchValue = search.toLowerCase();

    if (lowercaseSearchValue === "") {
      return items;
    } else {
      return doFilter(items, columnExceptions, lowercaseSearchValue);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError && error instanceof Error) {
    return <p>Whoops... {error.message}</p>;
  }

  return todoList ? (
    <div className="container mx-auto">
      <div className="bg-accent p-3 text-white">
        <span className="text-4xl">{todoList.name}</span>
        <TodoItemsFilter
          activeFilter={filter}
          onChange={setFilter}
          search={search}
          setSearch={setSearch}
        />
      </div>
      <ItemActions
        desc={desc}
        handleAddNew={() => setOpenAddNew(true)}
        handleOrder={() => setDesc((prevState) => !prevState)}
      />
      <div className="overflow-x-auto">
        <TodoItems
          removeItem={removeItem}
          onCheck={onCheck}
          todoItems={filterItems()}
        />
      </div>
      <AddNewTodoItemDialog
        isOpen={openAddNew}
        onClose={() => setOpenAddNew(false)}
        onAddNew={onAddNew}
      />
    </div>
  ) : (
    <div className="container mx-auto text-4xl">No Todo list was found!</div>
  );
};
