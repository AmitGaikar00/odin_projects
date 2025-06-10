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

  return { getTodoList, printTodoList, createTodo, updateTodo, deleteTodo };
}

// ------------------------------------------------

function screenController() {
  let editingId = "";
  // create new todolist for personal
  const personal = TodoController();

  const create_button = document.querySelector(".create_todo");
  const form = document.querySelector("form");
  const overlayDiv = document.querySelector(".overlay");
  const contentDiv = document.querySelector(".content__body");

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

  // added event listeners for toggling form
  create_button.onclick = () => {
    editingId = "";
    form.reset();
    toggleForm();
  };
  overlayDiv.onclick = toggleForm;

  // show and update screen
  const updateScreen = () => {
    // clear screen before rerender
    contentDiv.innerHTML = "";

    personal.getTodoList().forEach((td) => {
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
        personal.deleteTodo(tdData.id);
        updateScreen(); // re-render the screen
      };

      div.querySelector('button[name="edit"]').onclick = (e) => {
        console.log("Edit clicked for ID:", tdData.id);
        editClickedTodo(tdData.id);
        // You can add your edit logic here later
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
        personal.createTodo({ title, description, priority, dueDate });
      } else {
        personal.updateTodo(editingId, {
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
    };
  };

  // edit todo and update screen
  const editClickedTodo = (id) => {
    const title = form.querySelector("input[name=title]");
    const description = form.querySelector("input[name=description]");
    const priority = form.querySelector("select[name=priority]");
    const dueDate = form.querySelector("input[name=duedate]");

    const td = personal
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

  updateScreen();
  createNewTodo();
}

screenController();
