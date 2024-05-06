const addTaskForm = document.querySelector('#add-task-form');
const taskInput = document.querySelector('#task-input');
const todoList = document.querySelector('#todo-list');
const finishedList = document.querySelector('#finished-list');

let tasks = [];

function renderTasks() {
	todoList.innerHTML = '';
	finishedList.innerHTML = '';

	tasks.forEach((task, index) => {
		const li = document.createElement('li');
		const span = document.createElement('span');
		const editButton = document.createElement('button');
		const deleteButton = document.createElement('button');
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.checked = task.finished;

		span.textContent = task.text;
		editButton.textContent = 'Edit';
		deleteButton.textContent = 'Delete';

		editButton.addEventListener('click', () => {
			const newText = prompt('Enter new task text:', task.text);
			if (newText !== null) {
				tasks[index].text = newText;
				renderTasks();
			}
		});

		deleteButton.addEventListener('click', () => {
			tasks.splice(index, 1);
			renderTasks();
		});

		checkbox.addEventListener('change', () => {
			tasks[index].finished = checkbox.checked;
			renderTasks();
		});

		li.appendChild(checkbox);
		li.appendChild(span);
		li.appendChild(editButton);
		li.appendChild(deleteButton);

		if (task.finished) {
			finishedList.appendChild(li);
		} else {
			todoList.appendChild(li);
		}
	});
}


addTaskForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const taskText = taskInput.value.trim();
	if (taskText !== '') {
		tasks.push({ text: taskText, finished: false });
		taskInput.value = '';
		renderTasks();
	}
});

renderTasks();