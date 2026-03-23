window.onload = function () {

  /* ===== ELEMENTOS ===== */
  const btn = document.getElementById("btn")
  const form = document.getElementById("taskForm")
  const input = document.getElementById("taskInput")
  const list = document.getElementById("taskList")
  const search = document.getElementById("search")

  const totalTasks = document.getElementById("totalTasks")
  const highTasks = document.getElementById("highTasks")
  const mediumTasks = document.getElementById("mediumTasks")
  const lowTasks = document.getElementById("lowTasks")

  /* ===== ESTADO ===== */
  let tasks = JSON.parse(localStorage.getItem("tasks")) || []

  /* ===== MODO OSCURO ===== */
  function toggleTheme() {
    document.documentElement.classList.toggle("dark")

    const isDark = document.documentElement.classList.contains("dark")

    localStorage.setItem("theme", isDark ? "dark" : "light")
    btn.textContent = isDark ? "☀️" : "🌙"
  }

  btn.onclick = toggleTheme

  function loadTheme() {
    const savedTheme = localStorage.getItem("theme")

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark")
      btn.textContent = "☀️"
    }
  }

  /* ===== STORAGE ===== */
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }

  /* ===== STATS ===== */
  function updateStats() {

    totalTasks.textContent = tasks.length

    const high = tasks.filter(t => t.priority === "high").length
    const medium = tasks.filter(t => t.priority === "medium").length
    const low = tasks.filter(t => t.priority === "low").length

    highTasks.textContent = high
    mediumTasks.textContent = medium
    lowTasks.textContent = low
  }

  /* ===== RENDER ===== */
  function createTaskElement(task, index) {

    const li = document.createElement("li")

    li.className = `
    flex justify-between items-center 
    bg-white dark:bg-gray-800 
    text-gray-800 dark:text-white
    p-4 rounded-xl shadow mb-3 transition
    `

    li.innerHTML = `
    <div>
      <p class="font-semibold">${task.text}</p>
      <small class="text-gray-500 dark:text-gray-400">${task.category}</small>
    </div>

    <span class="px-2 py-1 rounded text-white ${
      task.priority === "high" ? "bg-red-500" :
      task.priority === "medium" ? "bg-yellow-400 text-black" :
      "bg-green-500"
    }">
      ${task.priority}
    </span>

    <button data-id="${index}"
    class="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600 transition">
      ✕
    </button>
    `

    return li
  }

  function renderTasks(taskArray = tasks) {

    list.innerHTML = ""

    taskArray.forEach((task) => {
      const index = tasks.indexOf(task)
      list.appendChild(createTaskElement(task, index))
    })

    updateStats()
  }

  /* ===== AÑADIR ===== */
  form.onsubmit = function (e) {
    e.preventDefault()

    const newTask = {
      text: input.value.trim(),
      category: document.getElementById("category").value,
      priority: document.getElementById("priority").value
    }

    if (!newTask.text) return

    tasks.push(newTask)

    saveTasks()
    renderTasks()

    input.value = ""
  }

  /* ===== ELIMINAR ===== */
  list.onclick = function (e) {

    if (e.target.tagName === "BUTTON") {

      const id = e.target.dataset.id

      tasks.splice(id, 1)

      saveTasks()
      renderTasks()
    }
  }

  /* ===== BUSCADOR PRO ===== */
  search.oninput = function () {

    const text = search.value.toLowerCase()

    const filtered = tasks.filter(task =>
      task.text.toLowerCase().includes(text) ||
      task.category.toLowerCase().includes(text) ||
      task.priority.toLowerCase().includes(text)
    )

    renderTasks(filtered)
  }

  /* ===== INIT ===== */
  loadTheme()
  renderTasks()

}