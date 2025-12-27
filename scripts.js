const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// 1. Load tasks from LocalStorage on startup
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
renderTasks();

// 2. Function to add a new task
addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (text !== "") {
        tasks.push({ text: text, completed: false });
        input.value = '';
        updateData();
    }
});

// 3. Render the list to the screen
function renderTasks() {
    todoList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task-text ${task.completed ? 'completed' : ''}" onclick="toggleTask(${index})">
                ${task.text}
            </span>
            <button class="edit-btn" onclick="editTask(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteTask(${index})">X</button>
        `;
        todoList.appendChild(li);
    });
}

// 4. Toggle completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    updateData();
}

// 5. Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    updateData();
}

// 6. Edit task
function editTask(index) {
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        updateData();
    }
}

// 7. Save to LocalStorage and Refresh UI
function updateData() {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    renderTasks();
}