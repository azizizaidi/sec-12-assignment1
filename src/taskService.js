const { loadTasks, saveTasks } = require("./taskRepository");

const ALLOWED_PRIORITIES = ["low", "medium", "high"];

function normalizePriority(priority) {
	const p = String(priority || "medium").toLowerCase();
	if (!ALLOWED_PRIORITIES.includes(p)) {
		throw new Error('Invalid priority. Use: "low", "medium", "high".');
	}
	return p;
}

function getNextId(tasks) {
	// TODO: return next id number (1,2,3...) based on existing tasks
	// Hint: find max id then +1

	if (tasks.length === 0) {
		return 1;
	}

	let maxId = 0;
	for (let i = 0; i < tasks.length; i++) {
		if (tasks[i].id > maxId) {
			maxId = tasks[i].id;
		}
	}

	return maxId + 1;
}

async function addTask(title, priority) {
	// TODO:
	// 1) load tasks
	// 2) create new task object
	// 3) save updated tasks
	// 4) return the created task

	// Task shape:
	// { id, title, completed, priority, createdAt }

	const tasks = await loadTasks();
	const validPriority = normalizePriority(priority);
	const newTask = {
		id: getNextId(tasks),
		title: title,
		completed: false,
		priority: validPriority,
		createdAt: new Date().toISOString(),
	};

	tasks.push(newTask);
	await saveTasks(tasks);

	return newTask;
}

async function listTasks(filter) {
	// TODO:
	// 1) load tasks
	// 2) apply filtering if needed
	// 3) return filtered list sorted by id

	const tasks = await loadTasks();
	const result = [];

	for (let i = 0; i < tasks.length; i++) {
		const task = tasks[i];
		let addTask = true;

		if (filter.status === "completed" && !task.completed) {
			addTask = false;
		}

		if (filter.status === "pending" && task.completed) {
			addTask = false;
		}

		if (filter.priority && task.priority !== filter.priority) {
			addTask = false;
		}

		if (addTask) {
			result.push(task);
		}
	}

	return result;
}

async function markDone(id) {
	// TODO:
	// 1) load tasks
	// 2) find task by id
	// 3) update completed=true (use map, do not mutate original object)
	// 4) save
	// 5) return updated task

	const tasks = await loadTasks();

	const updatedTasks = tasks.map(function (task) {
		if (task.id === id) {
			return { ...task, completed: true };
		}
		return task;
	});

	await saveTasks(updatedTasks);

	return updatedTasks.find(function (task) {
		return task.id === id;
	});
}

async function deleteTask(id) {
	// TODO:
	// 1) load tasks
	// 2) find task by id (so you can return it)
	// 3) filter it out
	// 4) save
	// 5) return removed task

	const tasks = await loadTasks();
	let taskToDelete = null;

	for (let i = 0; i < tasks.length; i++) {
		if (tasks[i].id === id) {
			taskToDelete = tasks[i];
			break;
		}
	}

	if (taskToDelete === null) {
		throw new Error("Task not found");
	}

	const filteredTasks = [];
	for (let i = 0; i < tasks.length; i++) {
		if (tasks[i].id !== id) {
			filteredTasks.push(tasks[i]);
		}
	}

	await saveTasks(filteredTasks);
	return taskToDelete;
}

module.exports = { addTask, listTasks, markDone, deleteTask };
