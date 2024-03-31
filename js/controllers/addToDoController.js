import { addToDo } from "../models/toDoListModel";

let dialog;
let createButton;
let exitButton;
let form;

export function addToDoController(todo) {
  dialog = document.querySelector('#create-to-do');
  exitButton = dialog.querySelector('#exit');
  createButton = dialog.querySelector('#submit');
  dialog.showModal();
  form = dialog.querySelector('form');
  configureListeners();
  configUi(todo); // Call configUi function with todo parameter
}

function configUi(todo) {
  if (todo) {
    dialog.querySelector('#todo').value = todo.todo;
    dialog.querySelector('#category').value = todo.category;
    dialog.querySelector('#status').value = todo.status;
  }
}

function configureListeners() {
  exitButton.addEventListener('click', onCloseDialog);
  createButton.addEventListener('click', onCreateToDo);
}

function onCloseDialog(e) {
  dialog.close();
}

function onCreateToDo(e) {
  e.preventDefault();
  const category = form.querySelector('#category').value.trim();
  const status = form.querySelector('#status').value.trim();
  const todo = form.querySelector('#todo').value.trim();

  const newToDo = {
    category,
    status,
    todo
  };

  addToDo(newToDo);
  onCloseDialog();
}
