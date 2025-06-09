import fs from 'node:fs'
import path from 'node:path'

const tasksFilePath = path.join(process.cwd(), 'tasks.json')

// Helpers
export const loadTasks = () => {
    if (fs.existsSync(tasksFilePath)) {
        const data = fs.readFileSync(tasksFilePath, 'utf-8')
        return JSON.parse(data)
    }
    return []
}

export const saveTasks = (tasks) => {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf-8')
}

const taskIndexChecker = (id, tasks) => {
    const taskIndex = tasks.findIndex((task) => task.id === id)
    if (taskIndex === -1) {
        console.error(`❌ Task with id ${id} not found`)
        process.exit(1)
    }
    return taskIndex
}

// Core functions
export const addTask = (name, description = 'No description provided') => {
    const tasks = loadTasks()

    const newTask = {
        id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
        name,
        description,
        status: 'todo', // todo | in-progress | done
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }

    tasks.push(newTask)
    saveTasks(tasks)

    console.log(`✅ Task added: "${newTask.name}"`)
}

export const updateTask = (id, updates) => {
    const tasks = loadTasks()
    const taskIndex = taskIndexChecker(id, tasks)

    const existingTask = tasks[taskIndex]
    tasks[taskIndex] = {
        ...existingTask,
        ...updates,
        updatedAt: new Date().toISOString(),
    }

    saveTasks(tasks)
    console.log(`✅ Task updated: "${tasks[taskIndex].name}"`)
}

export const deleteTask = (id) => {
    const tasks = loadTasks()
    const taskIndex = taskIndexChecker(id, tasks)

    const deletedTask = tasks.splice(taskIndex, 1)[0]
    saveTasks(tasks)

    console.log(`🗑️  Task deleted: "${deletedTask.name}"`)
}
// Status helpers
export const markTaskInProgress = (id) => {
    updateTask(id, { status: 'in-progress' })
    console.log(`🔄 Task marked as "in-progress"`)
}

export const markTaskDone = (id) => {
    updateTask(id, { status: 'done' })
    console.log(`✅ Task marked as "done"`)
}
