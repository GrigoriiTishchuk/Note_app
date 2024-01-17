// Adds a new task to the task list.
function addTaskToList() {
  const newTaskInput = document.getElementById('newTask');
  let newTask = newTaskInput.value.trim();

  if (newTask !== '') {
    // Retrieve the tasks from localStorage (either there is some data or an empty array)
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

// Renders a single task item with associated buttons.
function renderTask(task) {
  const listItem = document.createElement('li');
  listItem.textContent = task;

  const changeButton = document.createElement('button');
  changeButton.textContent = 'Change Task';
  changeButton.addEventListener('click', () => changeTask(task));

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete Task';
  deleteButton.addEventListener('click', () => deleteTask(task));

  listItem.appendChild(changeButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

// Loads tasks and displays them in a list.
function loadTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  // Retrieve the tasks from localStorage (either there is some data or an empty array)
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  // Display each task in the list
  tasks.forEach(task => {
      const listItem = renderTask(task);
      taskList.appendChild(listItem);
  });
}

// Deletes a task from the tasks list.
function deleteTask(task) {
  // Retrieve the tasks from localStorage (either there is some data or an empty array)
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  // Remove the task from the array
  tasks = tasks.filter(t => t !== task);
  // Save the updated tasks back to localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));
  // Reload the tasks
  loadTasks();
}

// Updates a task and saves the updated tasks to localStorage.
function changeTask(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const index = tasks.indexOf(task);

  if (index !== -1) {
      const changeTask = window.prompt('Change Task: ' + task, task);
      if (changeTask !== null && changeTask.trim() !== '') {
          tasks[index] = changeTask.trim();
          localStorage.setItem('tasks', JSON.stringify(tasks));
          loadTasks();
      }
  }
}

// Clears the tasks in localStorage and the task list on the page.
function clearTasks() {
  // Clear the tasks in localStorage
  localStorage.removeItem('tasks');
  // Clear the task list on the page
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
}

// Load tasks when the page loads
window.onload = loadTasks;