document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('.input');
    const addButton = document.querySelector('.button');
    const todoList = document.querySelector('.todolist');
    const clearButton = document.querySelector('.clear-button');

   
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => addTodoToList(todo.text, todo.checked));

    
    addButton.addEventListener('click', () => {
        const inputValue = input.value.trim();

        if (inputValue !== '') {
            addTodoToList(inputValue);
            saveTodoToLocalStorage(inputValue);
            input.value = '';
        }
    });

   
    todoList.addEventListener('click', event => {
        if (event.target.classList.contains('delete-button')) {
            const listItem = event.target.parentElement;
            removeTodoFromLocalStorage(listItem);
            listItem.remove();
        }

        if (event.target.tagName === 'SPAN') {
            const listItem = event.target.parentElement;
            listItem.classList.toggle('checked');
            toggleTodoCheckedInLocalStorage(listItem);
        }
    });

    
    clearButton.addEventListener('click', () => {
        todoList.innerHTML = '';
        localStorage.removeItem('todos');
    });

    function addTodoToList(text, checked = false) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${text}</span>
            <button class="delete-button">Delete</button>
        `;
        if (checked) listItem.classList.add('checked');
        todoList.appendChild(listItem);
    }
    function saveTodoToLocalStorage(text) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push({ text, checked: false });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function removeTodoFromLocalStorage(listItem) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        const text = listItem.querySelector('span').textContent;
        const filteredTodos = todos.filter(todo => todo.text !== text);
        localStorage.setItem('todos', JSON.stringify(filteredTodos));
    }

    function toggleTodoCheckedInLocalStorage(listItem) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        const text = listItem.querySelector('span').textContent;
        const todo = todos.find(todo => todo.text === text);
        if (todo) {
            todo.checked = !todo.checked;
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }
});