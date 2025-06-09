#!/usr/bin/env node
import { parseArgs } from 'node:util'
import {
    loadTasks,
    deleteTask,
    updateTask,
    addTask,
    markTaskDone,
    markTaskInProgress,
} from './task-manger.js'
import { parseTaskId, printHelp } from './utils.js'

const args = process.argv.slice(2)

if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
    printHelp()
    process.exit(0)
}

const [command, ...commandArgs] = args

// Main CLI
switch (command) {
    case 'add': {
        const { values, positionals } = parseArgs({
            args: commandArgs,
            options: {
                description: {
                    type: 'string',
                    short: 'd',
                    default: 'No description provided',
                },
            },
            allowPositionals: true,
        })
        const name = positionals[0]
        if (!name) {
            console.error('Error: Task name is required')
            process.exit(1)
        }
        addTask(name, values.description)
        break
    }

    case 'update': {
        const { values, positionals } = parseArgs({
            args: commandArgs,
            options: {
                name: { type: 'string', short: 'n' },
                description: { type: 'string', short: 'd' },
            },
            allowPositionals: true,
        })
        const taskId = parseTaskId(positionals)

        const updates = {}
        if (values.name) updates.name = values.name
        if (values.description) updates.description = values.description

        if (Object.keys(updates).length === 0) {
            console.error('Error: No updates provided')
            process.exit(1)
        }

        updateTask(taskId, updates)
        break
    }

    case 'mark-in-progress': {
        const { positionals } = parseArgs({
            args: commandArgs,
            allowPositionals: true,
        })
        const taskId = parseTaskId(positionals)
        markTaskInProgress(taskId)
        break
    }

    case 'mark-done': {
        const { positionals } = parseArgs({
            args: commandArgs,
            allowPositionals: true,
        })
        const taskId = parseTaskId(positionals)
        markTaskDone(taskId)
        break
    }

    case 'delete': {
        const { positionals } = parseArgs({
            args: commandArgs,
            allowPositionals: true,
        })
        const taskId = parseTaskId(positionals)
        deleteTask(taskId)
        break
    }

    case 'list': {
        const { positionals } = parseArgs({
            args: commandArgs,
            allowPositionals: true,
        })
        const statusFilter = (positionals[0] || 'all').toLowerCase()
        const validStatuses = ['all', 'todo', 'in-progress', 'done']

        if (!validStatuses.includes(statusFilter)) {
            console.error(
                `Error: Invalid status filter "${statusFilter}". Valid values: ${validStatuses.join(
                    ', '
                )}`
            )
            process.exit(1)
        }

        const tasks = loadTasks().filter((task) => {
            if (statusFilter === 'all') return true
            return task.status === statusFilter
        })

        console.log(
            `\nListing tasks${
                statusFilter !== 'all' ? ` (status: ${statusFilter})` : ''
            }:\n`
        )
        tasks.forEach((task) => {
            console.log(`{
  id: ${task.id}
  name: ${task.name}
  description: ${task.description}
  status: ${task.status}
  createdAt: ${task.createdAt}
  updatedAt: ${task.updatedAt}
}`)
        })
        console.log(`\nTotal tasks: ${tasks.length}\n`)
        break
    }

    default: {
        console.error(`Error: Unknown command "${command}"`)
        printHelp()
        process.exit(1)
    }
}
