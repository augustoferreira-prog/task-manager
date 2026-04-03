window.onload = function () {

  /* ===== ELEMENTOS ===== */
  const btn = document.getElementById("btn")
  const form = document.getElementById("taskForm")
  const input = document.getElementById("taskInput")
  const list = document.getElementById("taskList")
  const search = document.getElementById("search")

  const totalTasks = document.getElementById("totalTasks")
  const completedTasks = document.getElementById("completedTasks")
  const pendingTasks = document.getElementById("pendingTasks")

  const progressBar = document.getElementById("progressBar")
  const progressText = document.getElementById("progressText")

  const completeAll = document.getElementById("completeAll")
  const deleteAll = document.getElementById("deleteAll")

  const filterAll = document.getElementById("filterAll")
  const filterCompleted = document.getElementById("filterCompleted")
  const filterPending = document.getElementById("filterPending")

  /* ===== ESTADO ===== */
  let tasks = JSON.parse(localStorage.getItem("tasks")) || []

  /* ===== MODO OSCURO ===== */
  btn.onclick = () => document.documentElement.classList.toggle("dark")

  /* ===== FOOTER ===== */
  document.getElementById("year").textContent = new Date().getFullYear()

  /* ===== STORAGE ===== */
  function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }

  /* ===== STATS ===== */
  function updateStats() {

    totalTasks.textContent = tasks.length

    const completed = tasks.filter(t => t.completed).length
    const pending = tasks.length - completed

    completedTasks.textContent = completed
    pendingTasks.textContent = pending

    const percent = tasks.length ? Math.round((completed / tasks.length) * 100) : 0

    progressBar.style.width = percent + "%"
    progressText.textContent = percent + "%"
  }

  /* ===== CREAR TAREA (CON PRIORIDAD) ===== */
  function createTask(task, index) {

    const li = document.createElement("li")

    li.className = `
    bg-white dark:bg-gray-800 
    p-4 rounded mb-3 flex justify-between items-center shadow
    `

    const priorityColor =
      task.priority === "high" ? "bg-red-500" :
      task.priority === "medium" ? "bg-yellow-400 text-black" :
      "bg-green-500"

    li.innerHTML = `
      <div class="flex items-center gap-3">

        <input type="checkbox" data-id="${index}" ${task.completed ? "checked" : ""}>

        <div>
          <p class="font-semibold ${task.completed ? "line-through opacity-50" : ""}">
            ${task.text}
          </p>

          <div class="flex gap-2 mt-1">

            <span class="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700">
              ${task.category}
            </span>

            <span class="text-xs px-2 py-1 rounded text-white ${priorityColor}">
              ${task.priority}
            </span>

          </div>
        </div>

      </div>

      <button data-id="${index}" 
      class="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600">
        ✕
      </button>
    `

    return li
  }

  /* ===== RENDER ===== */
  function render(arr = tasks) {

    list.innerHTML = ""

    arr.forEach(task => {
      const i = tasks.indexOf(task)
      list.appendChild(createTask(task, i))
    })

    updateStats()
  }

  /* ===== AÑADIR ===== */
  form.onsubmit = e => {
    e.preventDefault()

    tasks.push({
      text: input.value,
      category: document.getElementById("category").value,
      priority: document.getElementById("priority").value,
      completed: false
    })

    save()
    render()
    input.value = ""
  }

  /* ===== EVENTOS LISTA ===== */
  list.onclick = e => {

    if (e.target.type === "checkbox") {
      tasks[e.target.dataset.id].completed = e.target.checked
    }

    if (e.target.tagName === "BUTTON") {
      tasks.splice(e.target.dataset.id, 1)
    }

    save()
    render()
  }

  /* ===== BOTONES ===== */
  completeAll.onclick = () => {
    tasks.forEach(t => t.completed = true)
    save()
    render()
  }

  deleteAll.onclick = () => {
    tasks = []
    save()
    render()
  }

  /* ===== FILTROS ===== */
  filterAll.onclick = () => render(tasks)

  filterCompleted.onclick = () =>
    render(tasks.filter(t => t.completed))

  filterPending.onclick = () =>
    render(tasks.filter(t => !t.completed))

  /* ===== BUSCADOR ===== */
  search.oninput = () => {
    const t = search.value.toLowerCase()

    render(tasks.filter(task =>
      task.text.toLowerCase().includes(t) ||
      task.category.toLowerCase().includes(t) ||
      task.priority.toLowerCase().includes(t)
    ))
  }

  /* ===== INIT ===== */
  render()

}