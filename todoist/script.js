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

const personal = TodoController();

personal.printTodoList();

personal.createTodo({
  title: "amit",
  description:
    "lorem sdlgjg aldj sglfgj dlfj gdfl gdfljg ldjfgl dkjlfgj dljfg ",
  priority: "low",
  dueDate: new Date().getTime(),
  isCompleted: false,
});

personal.createTodo({
  title: "parth",
  description:
    "lorem sdlgjg aldj sglfgj dlfj gdfl gdfljg ldjfgl dkjlfgj dljfg ",
  priority: "high",
  dueDate: new Date().getTime(),
  isCompleted: false,
});

personal.createTodo({
  title: "parth",
  description:
    "lorem sdlgjg aldj sglfgj dlfj gdfl gdfljg ldjfgl dkjlfgj dljfg ",
  priority: "medium",
  dueDate: new Date().getTime(),
  isCompleted: false,
});

personal.printTodoList();

// ------------------------------------------------

const create_button = document.querySelector(".create_todo");
const form = document.querySelector("form");
const overlayDiv = document.querySelector(".overlay");

function toggleForm() {
  form.classList.toggle("active");
  overlayDiv.classList.toggle("active");
}
create_button.onclick = toggleForm;
overlayDiv.onclick = toggleForm;

// shows todos
const contentDiv = document.querySelector(".content__body");

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

  div.innerHTML = `
      <div class="todo__heading">
           <input type="checkbox" name="iscompleted" id="" />
           <h3>${tdData.title}</h3>
      </div>
            <p>${tdData.description}</p>
            <h5>${tdData.dueDate}</h5>

      <div class="todo_button">
            <button name="edit ">Edit</button>
            <button name="delete" onClick=${console.log("hi")}>Delete</button>
      </div>`;

  contentDiv.appendChild(div);
});
