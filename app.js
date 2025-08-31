import Command, { commandExcecutor } from './src/Command.js'
import { LocalStorage } from './src/storage.js'
import TodoList from './src/TodoList.js'
import { Commands } from './src/utils/commands.js'

globalThis.DOM = {}

const DOM = globalThis.DOM

document.addEventListener('DOMContentLoaded', () => {
  DOM.todoInput = document.getElementById('todo-input')
  DOM.addBtn = document.getElementById('add-btn')
  DOM.todoList = document.getElementById('todo-list')

  DOM.addBtn.addEventListener('click', () => {
    const command = new Command(Commands.ADD)
    commandExcecutor.execute(command)
  })

  DOM.todoList.addEventListener('click', event => {
    const itemToDelete = event.target.parentNode.dataset.text
    const command = new Command(Commands.DELETE, [itemToDelete])
    commandExcecutor.execute(command)
  })

  TodoList.getInstance().addObserver(renderList)
  LocalStorage.load()
})

document.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    const command = new Command(Commands.ADD)
    commandExcecutor.execute(command)
  }
})

function renderList() {
  DOM.todoList.innerHTML = ''
  const todoList = TodoList.getInstance()
  todoList.items.forEach(item => {
    const listItem = document.createElement('li')
    listItem.classList.add('todo-item')
    listItem.innerHTML = `${item.text} <button class="delete-btn">❌</button>`
    listItem.dataset.text = item.text
    DOM.todoList.appendChild(listItem)
  })
}
