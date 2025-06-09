# 📝 Task Manager CLI

A simple command-line tool to manage your personal tasks using Node.js.

---

## 🚀 Usage

```bash
task-cli <command> [args/options]
```

---

### ⚠ Important note

You can use cli-tool like this

```bash
node ./index.js add name
```

But if you want to use it like a proper cli tool you need to do the following

Add this in package.json file

```json
// adding bin to recognize the CLI command
    "bin": {
        // you can change task-cli to anything
        "task-cli": "./index.js"
    },
    // this is for using esmodule instead of commonjs
    "type": "module"
```

Then run `npm link` to link the project globally

---

### Available Commands

| Command                     | Description                                                                    |
| --------------------------- | ------------------------------------------------------------------------------ |
| `add "name"`                | Add a new task with a given name                                               |
| `update <taskId>`           | Update an existing task                                                        |
| `mark-in-progress <taskId>` | Mark task as "in-progress"                                                     |
| `mark-done <taskId>`        | Mark task as "done"                                                            |
| `delete <taskId>`           | Delete a task                                                                  |
| `list [status]`             | List tasks, optionally filter by status (`all`, `todo`, `in-progress`, `done`) |
| `-h`, `--help`              | Show help menu                                                                 |

---

## 🛠️ Command Examples

### Add a Task

```bash
task-cli add "Buy groceries" --description "Milk, bread, eggs"
```

### Update a Task

```bash
task-cli update 1 --name "Buy almond milk" --description "Almond milk, bread"
```

### Mark Task as In Progress

```bash
task-cli mark-in-progress 1
```

### Mark Task as Done

```bash
task-cli mark-done 1
```

### Delete a Task

```bash
task-cli delete 1
```

### List Tasks

```bash
task-cli list
task-cli list done
```

---

## 📂 Data Storage

All tasks are stored in a simple `tasks.json` file in your current working directory.

Each task has:

-   `id` (number)
-   `name` (string)
-   `description` (string)
-   `status` (`todo` | `in-progress` | `done`)
-   `createdAt` (timestamp)
-   `updatedAt` (timestamp)

---
