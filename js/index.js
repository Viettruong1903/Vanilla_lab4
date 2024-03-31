// index.js
import { getToDoData } from "./models/toDoListModel";
import { toDoListView } from "./views/toDoListView";
// import { addToDo } from "./models/toDoListModel";


async function appInit() {
  getToDoData();
  toDoListView();
}

appInit();

