document.addEventListener("DOMContentLoaded", function() {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");
    const clearCompletedButton = document.getElementById("clear-completed");

    // Load todos from local storage
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    // Function to save todos to local storage
    function saveTodos() {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    // Function to render todos
    function renderTodos() {
        todoList.innerHTML = "";
        todos.forEach(function(todo, index) {
            const li = document.createElement("li");
            li.textContent = todo.text;
            li.classList.toggle("completed", todo.completed);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete");
            deleteButton.addEventListener("click", function() {
                todos.splice(index, 1);
                renderTodos();
                saveTodos();
            });

            li.appendChild(deleteButton);
            todoList.appendChild(li);

            li.addEventListener("click", function() {
                todo.completed = !todo.completed;
                renderTodos();
                saveTodos();
            });
        });
    }

    // Add todo
    todoForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const text = todoInput.value.trim();
        if (text !== "") {
            todos.push({ text, completed: false });
            todoInput.value = "";
            renderTodos();
            saveTodos();
        }
    });

    // Clear completed todos
    clearCompletedButton.addEventListener("click", function() {
        todos = todos.filter(todo => !todo.completed);
        renderTodos();
        saveTodos();
    });

    // Initial render
    renderTodos();
});
