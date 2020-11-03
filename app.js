let plus_button = document.querySelector(".plus-icon");
let addTask = document.querySelector(".fa-plus-square");
let input = document.querySelector(".task-input");
let task_list = document.querySelector(".task-list");

document.addEventListener("DOMContentLoaded", getTodos);

plus_button.addEventListener("click", function (e) {
  e.preventDefault();
});

addTask.addEventListener("click", function (e) {
  e.preventDefault();
  
  // add items to the list
  if (input.value !== undefined && input.value !== "") {
    let new_item = document.createElement("div");
    new_item.className = "newTodo";
    
    //new li element for displaying task name
    newLi = document.createElement("li");
    newLi.className = "taskName";
    newLi.innerText = input.value;
    new_item.appendChild(newLi);
    newLi.classList.add("taskStyle");
    
    // add todo to localStorage
    saveLocalTodos(input.value);
    
    // create done/completed button
    let taskDone = document.createElement("button");
    taskDone.innerHTML = `<i class="fas fa-check-square"></i>`;
    taskDone.className = "done";
    new_item.appendChild(taskDone);
    
    // create button to remove task
    let taskRemove = document.createElement("button");
    taskRemove.innerHTML = `<i class="fas fa-trash">`;
    taskRemove.className = "remove";
    new_item.appendChild(taskRemove);
    task_list.appendChild(new_item);
    input.value = "";
  }
});

// action on completed tasks
task_list.addEventListener("click", function (e) {
  const item = e.target;
  if (item.classList.contains("fa-check-square")) {
    let itemDone = item.parentElement.parentElement;
    itemDone.children[0].classList.add("strikeThrough");
    doneButton = item.parentElement;
    doneButton.remove();
  }
});

// remove tasks
task_list.addEventListener("click", function (e) {
  e.preventDefault();
  const item = e.target;
  if (item.classList.contains("fa-trash")) {
    let itemToBeRemoved = item.parentElement.parentElement;
    removeLocalTodos(itemToBeRemoved);
    itemToBeRemoved.remove();
  }
});

// clear all button(clears all tasks)
let clear_button = document.querySelector(".clear-button");
clear_button.addEventListener("click", function () {
  clearAllLocalTodos();
  task_list.innerText = "";
});

// save to local storage
function saveLocalTodos(todo) {
  // first check if any todo is already present in the local storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    // so till now there is no todo in the localStorage
    // create an empty array to add the todo
    todos = [];
  } else {
    // so if the control has come here it means that there is already a todo in the localStorage
    // so get the the array(i.e. the todos array)
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // add the new todo in the todos array
  todos.push(todo);
  // add it to the localStorage
  localStorage.setItem("todos", JSON.stringify(todos));
}

// upto this though the tasks get saved in the localStorage, it disappears from the page
// we need to fix this
// so we define a function getTodos() and add an appropriate eventlistener
function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {    
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    if (todo !== undefined && todo !== "") {
      let new_item = document.createElement("div");
      new_item.className = "newTodo";
      newLi = document.createElement("li");
      newLi.className = "taskName";
      newLi.innerText = todo;
      new_item.appendChild(newLi);
      newLi.classList.add("taskStyle");
      let taskDone = document.createElement("button");
      taskDone.innerHTML = `<i class="fas fa-check-square"></i>`;
      taskDone.className = "done";
      new_item.appendChild(taskDone);      
      let taskRemove = document.createElement("button");
      taskRemove.innerHTML = `<i class="fas fa-trash">`;
      taskRemove.className = "remove";
      new_item.appendChild(taskRemove);
      task_list.appendChild(new_item);
    }
  });
}

// function to remove the todos from local storage when the corresponding remove button has been clicked
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  
  // first get the index of the todo in the "todos" array
  const todo_name = todo.children[0].innerText;
  todos.splice(todos.indexOf(todo_name), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// remove all items from local when "Clear Task List" button has been clicked
function clearAllLocalTodos() {
  localStorage.clear();
}
