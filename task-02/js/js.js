const taskList = $('#works');
let tasks = JSON.parse(localStorage.getItem('tasks'));


function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(title, priority) {
    const newTask = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        title: title,
        completed: false,
        priority: priority,
        createdAt: new Date().toISOString().split('T')[0]
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function renderTasks() {
    taskList.empty();
    tasks.forEach(task => {
        let newTask = $(`
            <div class="task" data-id="${task.id}" >
                <div class="title">${task.title}</div>
                <p>Priority: ${task.priority}</p>
                <p>Status: ${task.completed ? 'Completed' : 'Not completed'}</p>
                <p>Created At: ${task.createdAt}</p>
                <div class="delete button" onclick="deleteTask(${task.id})"></div>
                <div class="complete button" onclick="completeTask(${task.id})"></div>
            </div>
        `);
        taskList.append(newTask);

    });
    taskList.append(`
        <div id="addTask" onclick="handleAddTask()"><span>Add Task</span></div>
        <select id="searchPriority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>
        <div class="search">Search</div>
    `);
    getTasksByStatus() 
    
}


function handleAddTask() {
    let body = $('body');
    let addTaskDiv = `
        <div class="addTaskModal">
            <div class="addTaskContent">
                <h2>Add New Task</h2>
                <input type="text" id="taskTitle" placeholder="Task Title" required>
                <select id="taskPriority">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <button id="saveTask" onclick="saveTask()">Save Task</button>
                <button id="cancelTask" onclick="deleteHandleAddTask()">Cancel</button>
            </div>
        </div>
    `;
    body.append(addTaskDiv);
}
function deleteHandleAddTask() {
    $('.addTaskModal').remove();
}
function saveTask() {
    let title = $('#taskTitle').val();
    let priority = $('#taskPriority').val();
    if (title) {
        addTask(title, priority);
        deleteHandleAddTask();
    } else {
        alert("Please enter a task title.");
    }
}
function completeTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}
function getTasksByPriority(priority) {
    return tasks.filter(task => task.priority === priority);
}

function getTasksByStatus() {
    $('.search').on('click', function () {
        const selectedPriority = $('#searchPriority').val();
        taskList.empty();
        
        
        tasks.forEach(task => {
            console.log(task.priority , selectedPriority);
            if (task.priority == selectedPriority) {
                console.log(task);
                
                let newTask = $(`
                    
                    <div class="task" data-id="${task.id}" >
                        <div class="title">${task.title}</div>
                        <p>Priority: ${task.priority}</p>
                        <p>Status: ${task.completed ? 'Completed' : 'Not completed'}</p>
                        <p>Created At: ${task.createdAt}</p>
                        <div class="delete button" onclick="deleteTask(${task.id})"></div>
                        <div class="complete button" onclick="completeTask(${task.id})"></div>
                    </div>
                `);
                taskList.append(newTask);

            }
        })
        taskList.append(`
            <div id="addTask" onclick="handleAddTask()"><span>Add Task</span></div>
            <select id="searchPriority">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <div class="search">Search</div>
        `);
        getTasksByStatus()
    });
}

renderTasks();