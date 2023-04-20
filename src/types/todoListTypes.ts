export type TodoList = {
  id: number;
  name: string;
  items: TodoItem[];
};

export type TodoItem = {
  id: number;
  name: string;
  content: string;
  deadline: string;
  done: boolean;
};
