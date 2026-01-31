const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "..", "data", "tasks.json");


async function loadTasks() {
	// TODO:
	// try read file, parse JSON, return array
	// if file not found or invalid -> return []

	try {
		const data = await fs.readFile(filePath, "utf-8");
		return JSON.parse(data);
	} catch (err) {
		if (err.code === "ENOENT") {
			await fs.mkdir(path.dirname(filePath), { recursive: true });
			await fs.writeFile(filePath, "[]");
			return [];
		}
		return [];
	}
}

async function saveTasks(tasks) {
	// TODO:
	// write tasks to file as JSON
	
	await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
}

module.exports = { loadTasks, saveTasks };
