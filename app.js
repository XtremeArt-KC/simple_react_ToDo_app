/*selectors*/
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


/*event listeners*/
document.addEventListener("DOMContentLoaded",getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);

/*functions*/

function addTodo(event){
    event.preventDefault();
    
const todoDiv = document.createElement("div");
todoDiv.classList.add('todo');

const newTodo = document.createElement("li"); 
newTodo.innerText = todoInput.value;
newTodo.classList.add('todo-item');
todoDiv.appendChild(newTodo);
save(todoInput.value);
const completed = document.createElement('button');
completed.innerHTML = '✔️';
completed.classList.add("done-btn");
todoDiv.appendChild(completed);

const remove = document.createElement('button');
remove.innerHTML = '✖️';
remove.classList.add("trash-btn");
todoDiv.appendChild(remove);

todoList.appendChild(todoDiv);

todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add('slide');
        remove(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }
    if (item.classList[0] === "done-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
}
}
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value){
            case "all":
            todo.style.display = "flex";
            break;
            case "completed":
            if (todo.classList.contains('done')) {
            todo.style.display = "flex";
        } else{
            todo.style.display = "none";
        }
        break;
                    case "uncompleted":
            if (!todo.classList.contains('completed')) {
            todo.style.display = "flex";
        } else{
            todo.style.display = "none";
        }
        break;
        }
    });
}
function save(todo){
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
todoDiv.classList.add('todo');

const newTodo = document.createElement("li");
newTodo.innerText = todo;
newTodo.classList.add('todo-item');
todoDiv.appendChild(newTodo);

const completed = document.createElement('button');
completed.innerHTML = '✔️';
completed.classList.add("done-btn");
todoDiv.appendChild(completed);

const remove = document.createElement('button');
remove.innerHTML = '✖️';
remove.classList.add("trash-btn");
todoDiv.appendChild(remove);

todoList.appendChild(todoDiv);
    });
}
function remove(todo){
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos", JSON.stringify(todos));
}