import { Todo } from "./todo.class";

export class ToodList {
    constructor(){
        // this.todos = [];
        this.cargarLocalStore()
    }

    nuevoTodo(Todo){
        this.todos.push(Todo);
        this.guardarLocalStore();
    }

    eliminarTodo(id){
        this.todos = this.todos.filter(todo => todo.id != id);
        this.guardarLocalStore()
    }

    marcarCompletado(id){
        for(const todo of this.todos){
            console.log(id,todo.id)
            if(todo.id == id){
                todo.completado = !todo.completado
                this.guardarLocalStore()
                break;
            }
        }
    }

    eliminarCompletados(){
        this.todos = this.todos.filter(todo => !todo.completado);
        this.guardarLocalStore()
    }


     guardarLocalStore(){
        localStorage.setItem('todo',JSON.stringify( this.todos));
    }

    cargarLocalStore(){
        this.todos = (localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : []
        this.todos = this.todos.map(obj => Todo.fromJson(obj))
    }
}