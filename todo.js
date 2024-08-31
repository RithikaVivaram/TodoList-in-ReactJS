let tasks = [];
let currentUser = null;
let editingIndex = -1;

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  // For simplicity, we'll just check if the username is not empty
  if (username.trim() !== '') {
    currentUser = username;
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('taskManager').style.display = 'block';
    renderTasks();
  } else {
    alert('Please enter a username.');
  }
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskDate = document.getElementById('taskDate').value;
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    if (editingIndex === -1) {
      tasks.push({ text: taskText, date: taskDate, completed: false });
    } else {
      tasks[editingIndex].text = taskText;
      tasks[editingIndex].date = taskDate;
      editingIndex = -1;
    }
    taskInput.value = '';
    renderTasks();
  } else {
    alert('Task text cannot be empty.');
  }
}

function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function editTask(index) {
    editingIndex = index;
    const task = tasks[index];
    document.getElementById('taskInput').value = task.text;
    document.getElementById('taskDate').value = task.date;
  }
  
  function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const taskItem = document.createElement('li');
      taskItem.classList.add('task-item');
      if (task.completed) {
        taskItem.classList.add('completed');
      }
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => toggleTaskCompletion(index));
    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => editTask(index));
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(index));
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(editBtn);
    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);
  });
}

//Uncomment this line if you want to test without a login
 //login();

  

