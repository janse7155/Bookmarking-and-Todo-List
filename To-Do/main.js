const body = document.body;
const input = document.querySelector('input[type=text]');
const overlay = document.querySelector('.overlay');



function showFloater() {
    body.classList.add('show-floater');
}

function closeFloater() {
    if (body.classList.contains('show-floater')) {
        body.classList.remove('show-floater');
    }

}

input.addEventListener('focus', showFloater);
overlay.addEventListener('click', closeFloater);



const todosList = document.querySelector('.todos-list');
const todosForm = document.querySelector('.todo-form');
const todosInput = document.querySelector('input[type=text]');
const todos = JSON.parse(localStorage.getItem('todos')) || [];

fillTodosList(todos);



localStorage.setItem('my_thing', 'something')

function createTodo(e) {
    e.preventDefault();

// add a new todo to the todos
const title = todosInput.value;
const todo = {
    title: title
};
todos.push(todo);
fillTodosList(todos);
storeTodos(todos);
// save todos to localStorage



    todosForm.reset();
}


function fillTodosList(todos = []) {
    const todosHtml = todos.map((todo, i) => {
    return `
    <a class='todo' data-id="${i}">
    <div class="img"></div>
    <div class="title">${todo.title}</div>
    <span id="check" class="glyphicon glyphicon-ok check"></span>
    <span class="glyphicon glyphicon-remove"></span>
    
    </a>
    `;
}).join('');



    todosList.innerHTML = todosHtml;
}


// const span = document.querySelectorAll('span');

// console.log(span);

function checkTodo(e) {
    if (!e.target.matches('.glyphicon-ok')) return;

    console.log("check");
    e.target.classList.add("checked");
    storeTodos(todos)
}

function storeTodos(todos = []) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeTodo(e) {

    if (!e.target.matches('.glyphicon-remove')) return;

    const index = e.target.parentNode.dataset.id;
    todos.splice(index, 1);
    fillTodosList(todos);
    storeTodos(todos);
}






todosForm.addEventListener('submit', createTodo);
todosList.addEventListener('click', removeTodo);
todosList.addEventListener('click', checkTodo);
