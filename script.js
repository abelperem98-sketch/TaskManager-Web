
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = 1;

// Agregar una nueva tarea
taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const newTask = {
        id: nextId++,
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    taskInput.value = "";

    renderTasks();
});

// Mostrar las tareas
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task) {
        const li = document.createElement("li");
        li.className = "task-item";

        const content = document.createElement("div");
        content.className = "task-content";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function() {
            toggleTask(task.id);
        });

        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }

        content.appendChild(checkbox);
        content.appendChild(span);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", function() {
            deleteTask(task.id);
        });

        li.appendChild(content);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    updateStatistics();
}

// Marcar una tarea como completada
function toggleTask(id) {
    tasks = tasks.map(function(task) {
        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });

    renderTasks();
}

// Eliminar una tarea
function deleteTask(id) {
    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    renderTasks();
}

// Actualizar estadísticas
function updateStatistics() {
    const total = tasks.length;

    const completed = tasks.filter(function(task) {
        return task.completed;
    }).length;

    const pending = total - completed;

    totalTasks.textContent = total;
    pendingTasks.textContent = pending;
    completedTasks.textContent = completed;

    emptyMessage.style.display = total === 0 ? "block" : "none";

    // Guardar tareas en el navegador
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Mostrar estado inicial
renderTasks();
