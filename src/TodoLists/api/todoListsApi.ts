import axios from "axios";
import { TodoList } from "../../types/todoListTypes";

const todoListsApi = axios.create({
  baseURL: "https://643e8ea0c72fda4a0bfa1805.mockapi.io/api/",
});

export const getLists = async () => {
  const response = await todoListsApi.get("/todo_lists");

  return response.data as TodoList[];
};

export const getList = async (id: number) => {
  const response = await todoListsApi.get(`/todo_lists/${id}`);

  return response.data;
};

export const addList = async (todoList: TodoList) => {
  return await todoListsApi.post("/todo_lists", todoList);
};

export const updateList = async (todoList: TodoList) => {
  return await todoListsApi.put(`/todo_lists/${todoList.id}`, todoList);
};

export const deleteList = async (id: number) => {
  return await todoListsApi.delete(`/todo_lists/${id}`);
};
