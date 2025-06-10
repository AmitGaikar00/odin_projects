function Todo() {
  let id = "";
  let title = "";
  let description = "";
  let priority = "";
  let dueDate = "";
  let isCompleted = false;

  const getTodo = () => {
    return { id, title, description, priority, dueDate, isCompleted };
  };

  const setTodo = (todoData) => {
    id = crypto.randomUUID();
    title = todoData.title;
    description = todoData.description;
    priority = todoData.priority;
    dueDate = todoData.dueDate;
    isCompleted = todoData.isCompleted;
  };

  const putTodo = (todoData) => {
    title = todoData.title;
    description = todoData.description;
    priority = todoData.priority;
    dueDate = todoData.dueDate;
    isCompleted = todoData.isCompleted;
  };

  return { getTodo, setTodo, putTodo };
}

function TodoController() {
  let todoList = [];

  const getTodoList = () => todoList;

  const setTodoList = (newTodoList) => (todoList = newTodoList);

  const printTodoList = () => {
    const printTodoList = todoList.map((td) => td.getTodo());

    console.log(printTodoList);
  };

  const createTodo = (todoData) => {
    let newTodo = Todo();
    newTodo.setTodo(todoData);
    todoList.push(newTodo);

    return newTodo.getTodo().id;
  };

  const updateTodo = (id, todoData) => {
    todoList.forEach((td) => {
      if (td.getTodo().id === id) {
        td.putTodo(todoData);
      }
    });
  };

  const deleteTodo = (id) => {
    todoList = todoList.filter((td) => td.getTodo().id !== id);
  };

  return {
    getTodoList,
    printTodoList,
    createTodo,
    updateTodo,
    deleteTodo,
    setTodoList,
  };
}

// ------------------------------------------------

function screenController() {
  const todoControllers = {
    Personal: TodoController(),
  };
  let currentCategory = "Personal";
  let editingId = "";

  // divs and buttons
  const create_button = document.querySelector(".create_todo");
  const form = document.querySelector("form");
  const overlayDiv = document.querySelector(".overlay");
  const contentDiv = document.querySelector(".content__body");
  const createListButton = document.querySelector(".create-list");
  const sidebarListNav = document.querySelector(".sidebar nav ul");
  const todoListHeading = document.querySelector(".content__heading h1");

  // added event listeners for toggling form
  create_button.onclick = () => {
    editingId = "";
    form.reset();
    toggleForm();
  };
  overlayDiv.onclick = toggleForm;
  createListButton.onclick = createnewList;

  function loadAllListsFromStorage() {
    const savedLists = JSON.parse(localStorage.getItem("allTodoLists")) || {};

    for (let name in savedLists) {
      const controller = TodoController();
      savedLists[name].forEach((td) => {
        const todo = Todo();
        todo.setTodo(td);
        controller.setTodoList([...controller.getTodoList(), todo]);
      });

      todoControllers[name] = controller;

      if (name !== "Personal") {
        const li = document.createElement("li");
        // li.textContent = name;
        li.innerHTML = `
                      <span>${name}</span>
                      <button class="delete-list">X</button>
                       `;

        li.dataset.name = name;
        sidebarListNav.appendChild(li);
        addClickEventListenerToList(li);
      }
    }
  }

  function saveAllListsToStorage() {
    const allData = {};

    for (let name in todoControllers) {
      allData[name] = todoControllers[name]
        .getTodoList()
        .map((td) => td.getTodo());
    }

    localStorage.setItem("allTodoLists", JSON.stringify(allData));
  }

  // form toggle function
  function toggleForm() {
    const form_button = form.querySelector("button[name=submit]");

    if (editingId === "") {
      form_button.innerHTML = "Create";
    } else {
      form_button.innerHTML = "Update";
    }
    form.classList.toggle("active");
    overlayDiv.classList.toggle("active");
  }

  function createnewList() {
    const newListName = prompt("Enter list name");

    if (!newListName) {
      return;
    }

    if (todoControllers[newListName]) {
      alert("List already exists");
      return;
    }

    // create new list in controller
    todoControllers[newListName] = TodoController();

    // add new list to nav li
    const li = document.createElement("li");
    // li.innerHTML = newListName;
    li.dataset.name = newListName;
    li.innerHTML = `
    <span>${newListName}</span>
    <button class="delete-list">X</button>
  `;

    addClickEventListenerToList(li);
    sidebarListNav.appendChild(li);
    // add new list to local storage
    saveAllListsToStorage();
  }

  function addClickEventListenerToList(li) {
    const span = li.querySelector("span");
    const deleteBtn = li.querySelector("button.delete-list");

    // Switch list when span (name) is clicked
    span.onclick = () => {
      currentCategory = li.dataset.name;

      sidebarListNav.querySelectorAll("li").forEach((li) => {
        li.classList.remove("active");
      });

      li.classList.add("active");
      updateScreen();
      todoListHeading.textContent = currentCategory;
    };

    // Delete list when delete button is clicked
    if (deleteBtn) {
      deleteBtn.onclick = (e) => {
        e.stopPropagation(); // prevent triggering span click
        const listName = li.dataset.name;

        if (confirm(`Are you sure you want to delete list "${listName}"?`)) {
          delete todoControllers[listName];
          li.remove();

          // Set currentCategory to Personal and update screen
          currentCategory = "Personal";
          sidebarListNav
            .querySelector('li[data-name="Personal"]')
            .classList.add("active");

          updateScreen();
          saveAllListsToStorage();
        }
      };
    }
  }

  // show and update screen
  const updateScreen = () => {
    // clear screen before rerender
    contentDiv.innerHTML = "";

    todoControllers[currentCategory].getTodoList().forEach((td) => {
      const tdData = td.getTodo();
      const div = document.createElement("div");
      div.classList.add("todo");

      let todoBg = "white";

      if (tdData.priority === "low") {
        todoBg = "#90EE90";
      } else if (tdData.priority === "medium") {
        todoBg = "#ADD8E6";
      } else {
        todoBg = "#ffdfdf";
      }

      div.style.backgroundColor = todoBg;
      div.dataset.id = tdData.id;
      div.innerHTML = `
      <div class="todo__heading">
           ${
             tdData.isCompleted
               ? '<input type="checkbox" name="iscompleted" id="" checked  />'
               : '<input type="checkbox" name="iscompleted" id="" />'
           }
           <h3>${tdData.title}</h3>
      </div>
            <p>${tdData.description}</p>
            <h5>${tdData.dueDate}</h5>

      <div class="todo_button">
            <button name="edit" data-id=${tdData.id}>Edit</button>
            <button name="delete" data-id=${tdData.id}>Delete</button>
      </div>`;

      // Add event listeners to the edit and delete buttons
      div.querySelector('button[name="delete"]').onclick = (e) => {
        todoControllers[currentCategory].deleteTodo(tdData.id);
        updateScreen(); // re-render the screen

        // after deleting todo, save to local storage
        saveAllListsToStorage();
      };

      div.querySelector('button[name="edit"]').onclick = (e) => {
        console.log("Edit clicked for ID:", tdData.id);
        editClickedTodo(tdData.id);
        // You can add your edit logic here later
        saveAllListsToStorage();
      };

      // add event listener to checkbox
      div.querySelector('input[name="iscompleted"]').onchange = (e) => {
        console.log("Checkbox changed for ID:", e.target.checked);
        todoControllers[currentCategory].updateTodo(tdData.id, {
          ...tdData,
          isCompleted: e.target.checked,
        });

        saveAllListsToStorage();
      };

      contentDiv.appendChild(div);
    });
  };

  // create new todo and add to personal
  const createNewTodo = () => {
    form.onsubmit = (e) => {
      e.preventDefault();
      const title = form.querySelector("input[name=title]").value;
      const description = form.querySelector("input[name=description]").value;
      const priority = form.querySelector("select[name=priority]").value;
      const dueDate = form.querySelector("input[name=duedate]").value;

      console.log({ title, description, priority, dueDate });

      if (editingId === "") {
        todoControllers[currentCategory].createTodo({
          title,
          description,
          priority,
          dueDate,
        });
      } else {
        todoControllers[currentCategory].updateTodo(editingId, {
          title,
          description,
          priority,
          dueDate,
        });

        // reset edit id
        editingId = "";
      }

      form.reset();
      toggleForm();

      updateScreen();

      // after creating and updting todo, save to local storage

      saveAllListsToStorage();
    };
  };

  // edit todo and update screen
  const editClickedTodo = (id) => {
    const title = form.querySelector("input[name=title]");
    const description = form.querySelector("input[name=description]");
    const priority = form.querySelector("select[name=priority]");
    const dueDate = form.querySelector("input[name=duedate]");

    const td = todoControllers[currentCategory]
      .getTodoList()
      .find((ele) => ele.getTodo().id === id)
      .getTodo();

    title.value = td.title;
    description.value = td.description;
    priority.value = td.priority;
    dueDate.value = td.dueDate;

    editingId = id;
    toggleForm();
  };

  // add active li to personal default list
  addClickEventListenerToList(
    sidebarListNav.querySelector('li[data-name="Personal"]')
  );

  loadAllListsFromStorage();
  updateScreen();
  createNewTodo();
}

screenController();
