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
	return 1;
}

async function addTask(title, priority) {
	// TODO:
	// 1) load tasks
	// 2) create new task object
	// 3) save updated tasks
	// 4) return the created task

	// Task shape:
	// { id, title, completed, priority, createdAt }
	return null;
}

/**
 * filter = { status: "all"|"completed"|"pending", priority: "low"|"medium"|"high"|null }
 */
async function listTasks(filter) {
	// TODO:
	// 1) load tasks
	// 2) apply filtering if needed
	// 3) return filtered list sorted by id
	return [];
}

async function markDone(id) {
	// TODO:
	// 1) load tasks
	// 2) find task by id
	// 3) update completed=true (use map, do not mutate original object)
	// 4) save
	// 5) return updated task
	return null;
}

async function deleteTask(id) {
	// TODO:
	// 1) load tasks
	// 2) find task by id (so you can return it)
	// 3) filter it out
	// 4) save
	// 5) return removed task
	return null;
}

module.exports = { addTask, listTasks, markDone, deleteTask };
