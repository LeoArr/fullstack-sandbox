import axios from 'axios';

export const updateTodo = (todo) => {
    return axios.put('http://localhost:3001/todo', todo)
        .then(res => res.data);
}

export const removeTodo = (todoId) => {
    return axios.delete('http://localhost:3001/todo/' + todoId)
        .then(res => res.data);
}

export const addTodo = (listId) => {
    return axios.post('http://localhost:3001/todo-list/' + listId + '/todo')
        .then(res => res.data);
}

export const getPersonalTodos = () => {
    return axios.get('http://localhost:3001/todo-list')
        .then(res => res.data);
}