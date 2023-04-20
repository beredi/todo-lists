import React from "react";
import ReactDOM from "react-dom/client";
import TodoLists from "./TodoLists/TodoLists";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { About } from "./About/About";
import { Navbar } from "./Navbar/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TodoListComponent } from "./TodoLists/components/TodoList/TodoListComponent";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/*" element={<TodoLists />} />
          <Route path="/about" element={<About />} />
          <Route path="/todo-list/:id" element={<TodoListComponent />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
