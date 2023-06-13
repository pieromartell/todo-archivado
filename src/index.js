// import { ToodList } from "./classes/todo-list.class"
// import { Todo } from "./classes/todo.class"

import {ToodList,Todos} from './classes'
import { crearTodoHTML } from './js/componentes';

import './style.css'

export const todoList = new ToodList();

// console.log(todoList.todos)
todoList.todos[0].imprimirClase()

todoList.todos.forEach(todo => crearTodoHTML(todo))




