const taskList = $('#works');

const tasks = [
    {
        id:1,
        title: "Task 1", 
        completed: false,
        priority: "high",// low, medium, high
        createdAt: "2024-01-15"
    }
    

]
function addTask(title, priority){
    const newTask = {
        id: tasks.length + 1,
        title: title,
        completed: false,
        priority: priority,
        createdAt: new Date().toISOString().split('T')[0]
    };
    tasks.push(newTask);
}

tasks.forEach(task => {
    let newTask = $(`
    <div class="task" data-id="${task.id}">
        <div class="title">${task.title}</div>
        <p>Priority: ${task.priority}</p>
        <p>Created At: ${task.createdAt}</p>
        <div class="delete"></div>
        <div class="complete"></div>

    </div>
    `);
    console.log(true);
    
    taskList.append(newTask);
})