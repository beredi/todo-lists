import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addList, deleteList, updateList } from "../TodoLists/api/todoListsApi";
import { useState } from "react";

export const useTodoListFetch = () => {
  const queryClient = useQueryClient();
  const [desc, setDesc] = useState<boolean>(false);

  const deleteListMutation = useMutation({
    mutationFn: deleteList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todoLists"] });
    },
  });

  const addListMutation = useMutation({
    mutationFn: addList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todoLists"] });
    },
  });

  const updateListMutation = useMutation({
    mutationFn: updateList,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["todoList", data.data.id] });
    },
  });

  return {
    queryClient,
    deleteListMutation,
    desc,
    setDesc,
    addListMutation,
    updateListMutation,
  };
};
