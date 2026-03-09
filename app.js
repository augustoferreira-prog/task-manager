// Seleccion de elementos
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(taskText => createTaskElement(taskText));

function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return;

        createTaskElement(text);
        tasks.push(text);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = "";
    }

function createTaskElement(text) {
    const li = document.createElement("li");
    li.innerText = text;  
       
    
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Eliminar";
    deleteBtn.classList.add("delete-btn");
    
    deleteBtn.onclick = function() {

      li.remove();

      task = taskfilter(t => t !== text);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") addTask();

});