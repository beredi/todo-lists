import { useState } from "react";
import { TodoListItem } from "./components/TodoList/TodoListItem";
import { AddNewTodoListDialog } from "./components/TodoList/AddNewTodoListDialog";
import { useTodoListFetch } from "../hooks/useTodoListFetch";
import { TodoList } from "../types/todoListTypes";
import { ItemActions } from "../common/ItemActions/ItemActions";
import { useQuery } from "@tanstack/react-query";
import { getLists } from "./api/todoListsApi";

export const TodoLists = () => {
  const [openAddNew, setOpenAddNew] = useState<boolean>(false);
  const { deleteListMutation, desc, setDesc, addListMutation } =
    useTodoListFetch();

  const {
    isLoading,
    isError,
    error,
    data: todoLists,
  } = useQuery({
    queryKey: ["todoLists"],
    queryFn: getLists,
    select: (data) => data.sort((a, b) => (desc ? b.id - a.id : a.id - b.id)),
  });

  const onRemove = (id: number) => {
    deleteListMutation.mutate(id);
  };

  const onAddNew = (newList: TodoList) => {
    addListMutation.mutate(newList);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError && error instanceof Error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-row text-4xl items-center text-cyan-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        <span className="ml-2">Todo lists</span>
        <div className="badge badge-primary badge-lg badge-outline ml-1">
          {todoLists?.length}
        </div>
      </div>
      <ItemActions
        desc={desc}
        handleAddNew={() => setOpenAddNew(true)}
        handleOrder={() => setDesc((prevState) => !prevState)}
      />

      {todoLists?.map((list) => {
        return (
          <TodoListItem todoList={list} key={list.id} onRemove={onRemove} />
        );
      })}
      <AddNewTodoListDialog
        onClose={() => setOpenAddNew(false)}
        isOpen={openAddNew}
        onAddNew={onAddNew}
      />
    </div>
  );
};

export default TodoLists;
