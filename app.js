globalThis.DOM = {}

const DOM = globalThis.DOM

document.addEventListener('DOMContentLoaded', () => {
  DOM.todoInput = document.getElementById('todo-input')
  DOM.addBtn = document.getElementById('add-btn')
  DOM.todoList = document.getElementById('todo-list')

  DOM.addBtn.addEventListener('click', () => {})

  DOM.todoList.addEventListener('click', event => {})
})
