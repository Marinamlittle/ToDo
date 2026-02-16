import { Todo } from '../todos/models/todo.model';

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        new Todo('Sacar al perro'),
        new Todo('Hacer la compra'),
        new Todo('Ir al gimnasio'),
        new Todo('Recoger la casa'),
        new Todo('Estudiar'),
    ],
    filter: Filters.All,
}


const initStore = () => {
    loadStore();
    console.log('InitStore 🥑');
}

const loadStore = () => {
    if( !localStorage.getItem('state') ) return; // Si no hay nada en el localStorage, salir de la función

    const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem('state') ); // Obtener el estado del localStorage y convertirlo de cadena JSON a objeto
    state.todos = todos; // Asignar los todos del localStorage al estado
    state.filter = filter; // Asignar el filtro del localStorage al estado
}

const saveStateToLocalStorage = () =>{ // Guarda el estado en el localStorage
    localStorage.setItem('state', JSON.stringify(state) ); // Convierte el objeto state a una cadena JSON y lo guarda en el localStorage con la clave 'state'
}


const getTodos = ( filter = Filters.All ) => {
    
    switch( filter ) {
        case Filters.All:
            return [...state.todos];
        
        case Filters.Completed:
            return state.todos.filter( todo => todo.done );

        case Filters.Pending:
            return state.todos.filter( todo => !todo.done );

        default:
            throw new Error(`Option ${ filter } is not valid.`);
    }
}

/**
 * 
 * @param {String} description 
 */
const addTodo = ( description ) => {
    if ( !description ) throw new Error('Description is required');
    state.todos.push( new Todo(description) );

    saveStateToLocalStorage();
}

/**
 * 
 * @param {String} todoId
 */
const toggleTodo = ( todoId ) => {
    
    state.todos = state.todos.map( todo => {
        if( todo.id === todoId ) {
            todo.done = !todo.done;
        }
        return todo;
    });

    saveStateToLocalStorage();
}

const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId  );
    saveStateToLocalStorage();
}

const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => !todo.done );
    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All ) => {
    state.filter = newFilter;
    saveStateToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}


export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}