/**
 * Adds a new task to the task list.
 *
 * string newTask - The new task to be added.
 * return void No return value.
 */
function addTask() {
    // Get the input value
    const newTaskInput = document.getElementById('newTask');
    let newTask = newTaskInput.value.trim();

    if (newTask !== '') {
      // Retrieve the tasks from localStorage(either there is some data or an empty array)
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      // Add the new task to the array
      tasks.push(newTask);
      // Save the updated tasks back to localStorage
      localStorage.setItem('tasks', JSON.stringify(tasks));
      // Clear the input field
      newTaskInput.value = '';
      // Reload the tasks
      loadTasks();
    }
}


/**
 * Loads tasks and displays them in a list.
 *
 * return undefined - This function does not return a value.
 */
function loadTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear the existing list
    // Retrieve the tasks from localStorage(either there is some data or an empty array)
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Display each task in the list
    tasks.forEach(task => {
      const listItem = document.createElement('li');
      const changeButton = document.createElement('button');
      changeButton.textContent = 'Change Task';
      changeButton.addEventListener('click', () => {
        changeTask(task);
      })
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete Task';
      deleteButton.addEventListener('click', () => {
        deleteTask(task);
      })
      listItem.textContent = task;
      taskList.appendChild(listItem);
      taskList.appendChild(changeButton);
      taskList.appendChild(deleteButton);
    });
}

/**
 * Deletes a task from the tasks list.
 *
 * object task - The task to be deleted.
 * return undefined No return value.
 */
function deleteTask(task) {
    // Retrieve the tasks from localStorage(either there is some data or an empty array)
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Remove the task from the array
    tasks = tasks.filter(t => t !== task);
    // Save the updated tasks back to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // Reload the tasks
    loadTasks();
}

/**
 * Updates a task and saves the updated tasks to localStorage.
 *
 * @param {string} task - The task to be updated.
 * @param {string} changeTask - The new value for the task.
 * @returns {void}
 */
function changeTask(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let changeTask = task;
  tasks.forEach((t, index) => {
    if (t === task) {
      changeTask = window.prompt("Change Task: " + task);
      if (changeTask == null) {
        return task;
      }
      tasks[index] = changeTask;
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}


/**
 * Clear the tasks in localStorage and the task list on the page.
 */
function clearTasks() {
    // Clear the tasks in localStorage
    localStorage.removeItem('tasks');
    // Clear the task list on the page
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
}

// Load tasks when the page loads
window.onload = loadTasks;