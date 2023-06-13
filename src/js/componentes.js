import { todoList } from "..";
import { Todo, ToodList } from "../classes";


//referemcias al html
const divTodoList =  document.querySelector('.todo-list')
const txtinput = document.querySelector('.new-todo')
const btnborrar = document.querySelector('.clear-completed')
const ulFiltros = document.querySelector('.filters')
const anchorFiltro = document.querySelectorAll('.filtro')

export const crearTodoHTML = (todo) =>{
    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed ': ''}" data-id="${todo.id}">
						<div class="view">
							<input class="toggle" type="checkbox" ${(todo.completado) ? 'checked': ''}>
							<label>${todo.tarea}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li>
        `
        const div = document.createElement('div');
        div.innerHTML = htmlTodo
        divTodoList.append(div.firstElementChild)

        return div.firstElementChild;
}
//eventos 
txtinput.addEventListener('keyup', (event) =>{
   if(event.keyCode ===13 && txtinput.value.length > 0 ){

    const nuevoTodos = new Todo(txtinput.value);
    todoList.nuevoTodo(nuevoTodos)
    crearTodoHTML(nuevoTodos)
    txtinput.value = ''
   }
})

divTodoList.addEventListener('click', (event) =>{
  
    const nombreElemento = event.target.localName;
    const todoElement =  event.target.parentElement.parentElement;
    const todoID =  todoElement.getAttribute('data-id');
    if(nombreElemento.includes('input')){
        todoList.marcarCompletado(todoID)
        todoElement.classList.toggle('completed')
    }else if(nombreElemento.includes('button')){
        todoList.eliminarTodo(todoID);
        divTodoList.removeChild(todoElement)
    }
})

btnborrar.addEventListener('click', () =>{
    todoList.eliminarCompletados();
    for(let i =divTodoList.children.length-1; i>=0; i-- ){
        const elementos = divTodoList.children[i];

        if(elementos.classList.contains('completed')){
            divTodoList.removeChild(elementos)
        }
    }
})

ulFiltros.addEventListener('click', (event) =>{
    const filtro = event.target.text
    if(!filtro) {return};

    anchorFiltro.forEach(elem => elem.classList.remove('selected'));

    event.target.classList.add('selected')

    for(const elemento of divTodoList.children){
        elemento.classList.remove('hidden');
        const completado =  elemento.classList.contains('completed')

        switch(filtro){
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
                break
            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
                break
                
        }
    }

})