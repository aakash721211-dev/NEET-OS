const plannerForm = document.getElementById("plannerForm");

const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("plannerTasks")) || [];

function saveTasks(){

    localStorage.setItem(
        "plannerTasks",
        JSON.stringify(tasks)
    );

}

function renderTasks(){

    if(tasks.length===0){

        taskList.innerHTML="No Tasks Added";

        return;

    }

    taskList.innerHTML="";

    tasks.forEach((task,index)=>{

        taskList.innerHTML += `

        <div class="task-card">

            <div class="task-info">

                <h3>${task.subject}</h3>

                <p>${task.chapter}</p>

                <p>Priority : ${task.priority}</p>

                <p>Study : ${task.hours} Hours</p>

                <p>MCQ : ${task.mcq}</p>

                <p>Due : ${task.dueDate}</p>

            </div>

            <div class="task-actions">

    <button
        class="complete-btn"
        onclick="toggleTask(${index})">

        ${task.completed ? "Completed" : "Pending"}

    </button>

    <button
        class="edit-btn"
        onclick="editTask(${index})">

        Edit

    </button>

    <button
        class="delete-btn"
        onclick="deleteTask(${index})">

        Delete

    </button>

</div>

        </div>

        `;

    });

}

plannerForm.addEventListener("submit",function(e){

    e.preventDefault();

    const task={

        subject:document.getElementById("subject").value,

        chapter:document.getElementById("chapter").value,

        priority:document.getElementById("priority").value,

        hours:document.getElementById("hours").value,

        mcq:document.getElementById("mcq").value,

        dueDate:document.getElementById("dueDate").value,

completed:false

    };

    tasks.push(task);

    saveTasks();

    renderTasks();

    plannerForm.reset();

});

renderTasks();

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();

    renderTasks();

}

function toggleTask(index){

    tasks[index].completed =
    !tasks[index].completed;

    saveTasks();

    renderTasks();

}

function editTask(index){

    document.getElementById("subject").value =
    tasks[index].subject;

    document.getElementById("chapter").value =
    tasks[index].chapter;

    document.getElementById("priority").value =
    tasks[index].priority;

    document.getElementById("hours").value =
    tasks[index].hours;

    document.getElementById("mcq").value =
    tasks[index].mcq;

    document.getElementById("dueDate").value =
    tasks[index].dueDate;

    tasks.splice(index,1);

    saveTasks();

    renderTasks();

}