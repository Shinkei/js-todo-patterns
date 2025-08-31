import { Commands } from './utils/commands.js'
import TodoList from './TodoList.js'
import TodoItem from './TodoItem.js'

class Command {
  name
  args

  constructor(name, args) {
    this.name = name
    this.args = args
  }

  execute() {
    throw new Error('Method "execute()" must be implemented.')
  }
}

export const commandExcecutor = {
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
      default:
        throw new Error(`Unknown command: ${command.name}`)
    }
  },
}

export default Command
