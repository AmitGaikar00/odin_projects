// createTodo.js
export function createTodo({ title, description, priority, dueDate }) {
  return {
    id: crypto.randomUUID(),
    title,
    description,
    priority,
    dueDate,
  };
}