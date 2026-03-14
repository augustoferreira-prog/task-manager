const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("tasklist");
const search = document.getElementById("searchTask");
const priority = document.getElementById("priority");
const counter = document.getElementById("taskCounter");
const toggleTheme = document.getElementById("toggleTheme");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* cargar tareas al iniciar*/

document.addEventListener("DOMContentLoaded", () => {

    renderTasks();
    loadTheme();

});

/*  guardar   */

function saveTasks(){

    localStorage.setItem("tasks", JSON.stringify (tasks));    

}

/*___________renderizar___________*/

function renderTasks(){

        list.innerHTML= "";

        tasks.forEach(task => {

            const li = document.createElement("li");

            li.className = "task";
            
            if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML = ` 
            <span class="task-text">${task.text}</span>

            <span class="badge ${task.priority.tolowerCase()}">
            ${task,priority}
            </span>

            <div class="actions">
                <button class="complete">✔</button>
                <button class="delete">🗑</button>
            </div>
`;

/*     marcar completada     */

li.querySelector(".complete").addEventListener("click", () => {
toggleComplete(task.id);
});

/*----------eliminar--------*/

li.querySelector(".delete").addEventListener("click", () => {
deleteTask(task.id);
});

list.appendChild(li);

});

updateCounter();

}

/*-------------añadir--------*/

form.addEventListener("submit", (e)=>{

    e.preventDefault();

    const text = input.value.trim();

    if(text === "") return;

    const newTask = {

        id: Date.now(),
        text: text,
        priority: priority.value,
        completed: false
    };

    tasks.push(newTask);

    saveTasks;

    renderTasks();

    input.value= "";

});

/*--------completar-------*/

function toggleComplete(id){

    tasks = tasks.map(task => {

        if(task.id === id){
            task.completed = !task.completed;
        }

        return task;
    });

    saveTasks();

    renderTasks();
}

/*--------eliminar--------*/

function deleteTask(id){

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    renderTasks();
}


/*--------------buscador-------------*/

search.addEventListener("keyup", () => {
  
    const text = search.value.tolowerCase();

    document.querySelectorAll(".task").forEach(task => {

        const content = task
        .querySelector(".task-text")
        .textContent
        .tolowerCase;

        task.style.display =
        content.includes(text) ? "flex" : "none";
});

});


/*--------------contador-------------------*/


function updateCounter(){

    const total = tasks.length;

    const completed = tasks.filter(t => t.completed).length;

    counter.textContent =
    `Tareas completadas: ${completed} / ${total}`;

    }



/*--------cargar tema guardado-----------*/

function loadTheme(){

    const toggleTheme = document.getElementById("toggleTheme");
    
    const savedTheme = localStorage.getItem("theme");

    if(savedTheme === "dark"){

    document.body.classList.add("dark");    
    toggleTheme.textContent = "☀️"

    }else{

    document.body.classList.remove("dark");
    toggleTheme.textContent = "🌙"

    }

    }
    

    /*--------cambiar tema-----------*/

    function changeTheme(){
    
    const darkMode = document.body.classList.toggle("dark");

    if(darkMode){

    localStorage.setItem("theme","dark");
    toggleTheme.textContent = "☀️";

    }else{
        
    localStorage.setItem("theme","light");
    toggleTheme.textContent = "🌙";
    
    }

    }

    /*--------evento botn-----------*/

    toggleTheme.addEventListener("click", changeTheme);
    
    document.addEventListener("DOMContentLoaded", loadTheme);


