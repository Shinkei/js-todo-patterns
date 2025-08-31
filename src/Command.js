import { Commands } from './utils/commands.js'
import TodoList from './TodoList.js'
import TodoItem from './TodoItem.js'
import TodoMemento from './TodoMemento.js'

// COMMAND PATTERN IMPLEMENTATION
// ==============================
// Encapsulates requests as objects, allowing for parameterization of clients with different requests,
// queuing of requests, and the possibility of implementing undo/redo operations.

/**
 * COMMAND PATTERN: Base Command class
 * Represents an operation to be performed on the TodoList.
 * Commands encapsulate all information needed to perform an action, making it easier
 * to add new commands and potentially implement undo/redo functionality.
 */
class Command {
  name // The type of command to execute
  args // Arguments needed for command execution

  /**
   * Creates a new command with a name and optional arguments
   * @param {string} name - The command type from Commands enum
   * @param {Array} args - Arguments needed for command execution
   */
  constructor(name, args) {
    this.name = name
    this.args = args
  }

  /**
   * COMMAND PATTERN: Base execute method
   * In a full implementation, each command subclass would override this
   * @throws {Error} Indicates that subclasses should implement this method
   */
  execute() {
    throw new Error('Method "execute()" must be implemented.')
  }
}

/**
 * COMMAND PATTERN: Command executor/invoker
 * Centralizes command execution logic and separates it from the command creation
 */
export const commandExcecutor = {
  /**
   * COMMAND PATTERN: Execute method
   * Processes the command and performs the appropriate action based on command name
   * @param {Command} command - The command to execute
   */
  execute(command) {
    const todoList = TodoList.getInstance()

    switch (command.name) {
      case Commands.ADD:
        const todoInput = globalThis.DOM.todoInput

        const inputText = todoInput.value.trim()
        const todoItem = new TodoItem(inputText)
        const isTodoItemPresent = todoList.find(todoItem)

        if (inputText !== '' && !isTodoItemPresent) {
          todoInput.value = ''
          todoList.add(todoItem)
        }
        break
      case Commands.DELETE:
        const [todoText] = command.args
        const todoItemToDelete = todoList.find(new TodoItem(todoText))
        if (todoItemToDelete) {
          todoList.delete(todoItemToDelete)
        }
        break
      case Commands.UNDO:
        const previousState = TodoMemento.pop()
        if (previousState) {
          todoList.replaceList(previousState)
        }
        break
      default:
        throw new Error(`Unknown command: ${command.name}`)
    }
  },
}
// ==============================

export default Command
