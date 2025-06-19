// screenController.js
import { TodoController } from "./TodoController.js";
import { debouncedSave } from "./debounce.js";

export function screenController() {
  const todoControllers = { Personal: TodoController() };
  let currentCategory = "Personal";
  let editingId = "";

  const form = document.querySelector("form");
  const overlayDiv = document.querySelector(".overlay");
  const contentDiv = document.querySelector(".content__body");
  const sidebarListNav = document.querySelector(".sidebar nav ul");
  const createButton = document.querySelector(".create_todo");
  const createListButton = document.querySelector(".create-list");
  const heading = document.querySelector(".content__heading h1");

  createButton.onclick = () => {
    editingId = "";
    form.reset();
    toggleForm();
  };

  overlayDiv.onclick = toggleForm;
  createListButton.onclick = createNewList;

  function loadFromStorage() {
    const data = JSON.parse(localStorage.getItem("allTodoLists")) || {};
    for (const name in data) {
      const controller = TodoController();
      controller.setTodoList(data[name]);
      todoControllers[name] = controller;
      if (name !== "Personal") addListToSidebar(name);
    }
  }

  function saveToStorage() {
    const all = {};
    for (const name in todoControllers) {
      all[name] = todoControllers[name].getTodoList();
    }
    localStorage.setItem("allTodoLists", JSON.stringify(all));
  }

  function addListToSidebar(name) {
    const li = document.createElement("li");
    li.dataset.name = name;
    li.innerHTML = `
      <span>${name}</span>
      <button class="delete-list">X</button>
    `;
    sidebarListNav.appendChild(li);
    addClickEventsToListItem(li);
  }

  function createNewList() {
    const name = prompt("Enter list name:");
    if (!name || todoControllers[name]) {
      alert("Invalid or duplicate name.");
      return;
    }
    todoControllers[name] = TodoController();
    addListToSidebar(name);
    debouncedSave(saveToStorage);
  }

  function addClickEventsToListItem(li) {
    li.querySelector("span").onclick = () => {
      currentCategory = li.dataset.name;
      sidebarListNav
        .querySelectorAll("li")
        .forEach((el) => el.classList.remove("active"));
      li.classList.add("active");
      heading.textContent = currentCategory;
      updateScreen();
    };

    li.querySelector(".delete-list").onclick = (e) => {
      e.stopPropagation();
      const name = li.dataset.name;
      if (confirm(`Delete list "${name}"?`)) {
        delete todoControllers[name];
        li.remove();
        currentCategory = "Personal";
        sidebarListNav
          .querySelector('li[data-name="Personal"]')
          .classList.add("active");
        updateScreen();
        debouncedSave(saveToStorage);
      }
    };
  }

  function toggleForm() {
    form.querySelector("button[name=submit]").textContent = editingId
      ? "Update"
      : "Create";
    form.classList.toggle("active");
    overlayDiv.classList.toggle("active");
  }

  function updateScreen() {
    contentDiv.innerHTML = "";
    todoControllers[currentCategory].getTodoList().forEach((td) => {
      const div = document.createElement("div");
      div.className = "todo";
      div.dataset.id = td.id;
      div.style.backgroundColor =
        td.priority === "low"
          ? "#90EE90"
          : td.priority === "medium"
          ? "#ADD8E6"
          : "#ffdfdf";

      div.innerHTML = `
        <div class="todo__heading"><h3>${td.title}</h3></div>
        <p>${td.description}</p>
        <h5>${td.dueDate}</h5>
        <div class="todo_button">
          <button name="edit" data-id="${td.id}">Edit</button>
          <button name="delete" data-id="${td.id}">Delete</button>
        </div>
      `;
      contentDiv.appendChild(div);
    });
  }

  contentDiv.onclick = (e) => {
    const btn = e.target;
    const id = btn.dataset.id;
    if (!id) return;

    if (btn.name === "delete") {
      todoControllers[currentCategory].deleteTodo(id);
      updateScreen();
      debouncedSave(saveToStorage);
    } else if (btn.name === "edit") {
      const todo = todoControllers[currentCategory]
        .getTodoList()
        .find((td) => td.id === id);
      form.title.value = todo.title;
      form.description.value = todo.description;
      form.priority.value = todo.priority;
      form.duedate.value = todo.dueDate;
      editingId = id;
      toggleForm();
    }
  };

  form.onsubmit = (e) => {
    e.preventDefault();
    const data = {
      title: form.title.value,
      description: form.description.value,
      priority: form.priority.value,
      dueDate: form.duedate.value,
    };

    if (editingId) {
      todoControllers[currentCategory].updateTodo(editingId, data);
      editingId = "";
    } else {
      todoControllers[currentCategory].createTodoItem(data);
    }

    form.reset();
    toggleForm();
    updateScreen();
    debouncedSave(saveToStorage);
  };

  addClickEventsToListItem(
    sidebarListNav.querySelector('li[data-name="Personal"]')
  );
  loadFromStorage();
  updateScreen();
}
