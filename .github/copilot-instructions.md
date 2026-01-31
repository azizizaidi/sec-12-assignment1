<!-- Copilot / AI agent instructions tailored to this Task Tracker CLI -->
# Repo snapshot

- Purpose: small Node.js CLI for simple task tracking using a JSON file store.
- Entry point: `index.js` — parses commands then calls `src/taskService.js`.
- Storage: `data/tasks.json` (file-based, created if missing) via `src/taskRepository.js`.

# Quick orientation (big picture)

- `index.js`: CLI parsing and user-facing messages. Examples in README.md show expected CLI flags and commands.
- `src/taskService.js`: business logic — adding, listing, completing, deleting tasks. Key patterns:
  - Priority normalization in `normalizePriority()` with allowed values `low|medium|high`.
  - ID allocation via `getNextId(tasks)` (find max id + 1).
  - All operations load tasks with `loadTasks()` and save with `saveTasks()` (async/await).
- `src/taskRepository.js`: thin persistence layer using Node `fs.promises`. It creates the `data/` folder and an empty `tasks.json` when missing.

# What an AI agent should prioritize

- Preserve existing CLI behavior and JSON shapes. Task objects follow:
  - `{ id, title, completed, priority, createdAt }` — see `addTask()` in `src/taskService.js`.
- Avoid changing storage strategy. Tests and student expectations rely on file-based persistence in `data/tasks.json`.
- Keep all async APIs using `async/await` and promise-based `fs`. Follow existing error messages/localization in `index.js`.

# Patterns & conventions (project-specific)

- Minimal dependency surface: this repo uses only built-in Node APIs; do not add dependencies without discussion.
- CLI parsing is hand-rolled in `index.js` (flags start with `--`, positional args collected). Match formatting and examples from README.md.
- Error handling: `index.js` prints friendly messages and continues; thrown errors from services are caught at top-level and printed as `Error: <msg>`.
- File writes use `JSON.stringify(tasks, null, 2)` in `src/taskRepository.js` — maintain the pretty JSON format.

# Integration points to be careful about

- `filePath` in `src/taskRepository.js` is path.join(__dirname, "..", "data", "tasks.json"). When modifying file locations, update both repository and README examples.
- `list` filtering is done in `listTasks(filter)` — it accepts `filter.status` values `all|completed|pending` and optional `filter.priority` string.

# Small examples you can use or extend

- Add a task programmatically (mirrors `index.js` behavior):
  - call `await addTask("Buy milk", "high")` — returns the created task with `id` and `createdAt`.
- Mark done: `await markDone(2)` — `markDone` returns the updated task (does not mutate original objects).

# Tests / runs / developer workflows

- Run locally with Node.js: `node index.js <command>` (examples in README.md). Use the workspace root as the CWD so `data/tasks.json` path resolves correctly.
- There are no automated tests in the repo currently; when adding tests, mock or stub `fs.promises` or use a temp folder for `data/` to avoid mutating developer data.

# When editing: checklist for safe changes

- Preserve task JSON shape and file path unless updating README and CLI help strings.
- Keep async/await and the repository abstraction boundary (`loadTasks`/`saveTasks`).
- Update README.md examples if CLI usage or flags change.

# Where to look for examples

- CLI behavior & messages: [index.js](index.js#L1-L200)
- Business logic & allowed priorities: [src/taskService.js](src/taskService.js#L1-L200)
- Persistence and file-init behavior: [src/taskRepository.js](src/taskRepository.js#L1-L200)
- User-facing usage examples: [README.md](README.md#L1-L200)

---
If anything here is unclear or you want the agent to follow stricter rules (e.g., open PR templates, commit message patterns, or run tests), tell me and I'll update this file.
