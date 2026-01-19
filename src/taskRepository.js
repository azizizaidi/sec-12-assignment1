const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "..", "data", "tasks.json");

async function loadTasks() {
	// TODO:
	// try read file, parse JSON, return array
	// if file not found or invalid -> return []
	return [];
}

async function saveTasks(tasks) {
	// TODO:
	// write tasks to file as JSON
}

module.exports = { loadTasks, saveTasks };
