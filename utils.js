export function parseTaskId(positionals) {
    const taskId = parseInt(positionals[0], 10)
    if (isNaN(taskId)) {
        console.error('Error: Invalid task ID')
        process.exit(1)
    }
    return taskId
}

export function printHelp() {
    console.log(`
Task Manager CLI

Usage:
  cli.mjs <command> [args/options]

Commands:
  add "name" [--description DESC]            Add a new task
  update <taskId> [--name NAME] [--description DESC]  Update task info
  mark-in-progress <taskId>                   Mark task as "in-progress"
  mark-done <taskId>                          Mark task as "done"
  delete <taskId>                             Delete a task
  list [status]                               List tasks (status = all | todo | in-progress | done)

Global Options:
  -h, --help                                  Show this help message
    `)
}
