# Task Tracker CLI

## Setup
1. Make sure you have Node.js installed
2. Run commands like:

## Commands

### Add a task
```bash
node index.js add "Buy milk" --priority high
node index.js add "Buy eggs" --priority medium
node index.js add "Read book" --priority low
```

### List all tasks
```bash
node index.js list
```

### List completed tasks
```bash
node index.js list --completed
```

### List pending tasks
```bash
node index.js list --pending
```

### Mark task as done
```bash
node index.js done 1   # marks task #1 as completed
node index.js done 2   # marks task #2 as completed
```

### Delete a task
```bash
node index.js delete 1   # deletes task #1
node index.js delete 2   # deletes task #2
```

## Example Workflow
```bash
# Add 3 tasks
node index.js add "Buy milk" --priority high
node index.js add "Buy eggs" --priority medium
node index.js add "Read book" --priority low

# List all tasks
node index.js list
# Output:
# #1 | pending | high | Buy milk
# #2 | pending | medium | Buy eggs
# #3 | pending | low | Read book

# Mark task #2 as done
node index.js done 2

# Delete task #3
node index.js delete 3

# List remaining tasks
node index.js list
# Output:
# #1 | pending | high | Buy milk
# #2 | done | medium | Buy eggs
```
