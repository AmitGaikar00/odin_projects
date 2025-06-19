// TodoController.js
import { createTodo } from "./createTodo.js";

export function TodoController() {
  let todoList = [];

  const getTodoList = () => todoList;
  const setTodoList = (list) => (todoList = list);

  const createTodoItem = (data) => {
    const todo = createTodo(data);
    todoList.push(todo);
    return todo.id;
  };

  const updateTodo = (id, data) => {
    const index = todoList.findIndex((td) => td.id === id);
    if (index !== -1) {
      todoList[index] = { ...todoList[index], ...data };
    }
  };

  const deleteTodo = (id) => {
    todoList = todoList.filter((td) => td.id !== id);
  };

  return { getTodoList, setTodoList, createTodoItem, updateTodo, deleteTodo };
}
