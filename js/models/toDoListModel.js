import {ref, set, get, push, child, remove, update} from 'firebase/database';
import {db} from '../lib/firebase/config/firebaseInit';
import { createStore, removeFromStore, updateStore, } from './store';


let observers = [];

export function subscribe(fn) {
  observers.push(fn);
  console.log(observers);
}

export function notify(data) {
  observers.forEach((observer) => observer(data))
}

export async function getToDoData() {
  const dbRef = ref(db, 'todosDB');
  const response = await get(dbRef);
  let payload = await response.val();
  payload = Object.entries(payload);

  let toDoItems = payload.map((item) => {
    return {...item[1], uid: item[0]}
  })
  if (await createStore(toDoItems)) {
    notify(toDoItems);
  }
}

export function deleteToDo(uid) {
  const dbRef = ref(db, `todosDB/${uid}`);
  set(dbRef, null)
  const store = removeFromStore(uid)
  notify(store);
}

export function updateToDo(updatedTodo) {
  let payload = updatedTodo
  const dbRef = ref(db, `todosDB/${payload.uid}`)
  update(dbRef, payload)
  const store = updateStore(payload)
  notify(store)
}

export async function addToDo(newToDo) {
  try {
    const dbRef = push(ref(db, 'todosDB')); // Generate a new unique key for the todo
    await set(dbRef, newToDo); // Set the new todo under the generated key
    const todoSnapshot = await get(dbRef); // Retrieve the todo with its unique key
    const todoData = todoSnapshot.val(); // Extract the todo data
    const todoWithUid = { ...todoData, uid: dbRef.key }; // Add the generated key as uid to the todo
    const store = await createStore([todoWithUid]); // Add the new todo to the store
    notify(store); // Notify observers about the change
  } catch (error) {
    console.error("Error adding new todo:", error);
    // Optionally, handle the error (e.g., display an error message to the user)
  }
}



