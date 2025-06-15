let tasks = [];

    // Load from localStorage
    function loadTasks() {
      const data = localStorage.getItem("todoTasks");
      if (data) {
        tasks = JSON.parse(data);
      }
    }

    function saveTasks() {
      localStorage.setItem("todoTasks", JSON.stringify(tasks));
    }

    function renderTasks() {
      const taskList = document.getElementById("taskList");
      const filter = document.getElementById("filterSelect").value;
      taskList.innerHTML = "";

      const filteredTasks = tasks.filter(task => {
        return filter === "All" || task.priority === filter;
      });

      filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");

        const leftDiv = document.createElement("div");
        leftDiv.className = "task-left";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.onchange = () => {
          toggleComplete(index);
        };

        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task.text;
        if (task.completed) span.classList.add("completed");

        const prioritySpan = document.createElement("span");
        prioritySpan.className = "priority " + (task.priority === "High" ? "high" : "low");
        prioritySpan.textContent = task.priority;

        leftDiv.appendChild(checkbox);
        leftDiv.appendChild(span);
        leftDiv.appendChild(prioritySpan);

        const actions = document.createElement("div");
        actions.className = "actions";

        const editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editTask(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteTask(index);

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(leftDiv);
        li.appendChild(actions);
        taskList.appendChild(li);
      });
    }

    function addTask() {
      const taskInput = document.getElementById("taskInput");
      const priorityInput = document.getElementById("priorityInput");
      const text = taskInput.value.trim();
      const priority = priorityInput.value;

      if (text === "") {
        alert("Task cannot be empty!");
        return;
      }

      tasks.push({ text, priority, completed: false });
      saveTasks();
      taskInput.value = "";
      renderTasks();
    }

    function editTask(index) {
      const newText = prompt("Edit your task:", tasks[index].text);
      if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
      }
    }

    function deleteTask(index) {
      if (confirm("Are you sure you want to delete this task?")) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      }
    }

    function toggleComplete(index) {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    }

    // Initial load
    loadTasks();
    renderTasks();