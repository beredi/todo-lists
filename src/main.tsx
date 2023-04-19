import React from "react";
import ReactDOM from "react-dom/client";
import TodoLists from "./TodoLists/TodoLists";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { About } from "./About/About";
import { Navbar } from "./Navbar/Navbar";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/*" element={<TodoLists />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
