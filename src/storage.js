import TodoList from './TodoList.js'
import TodoItem from './TodoItem.js'

const todoList = TodoList.getInstance()

export const LocalStorage = {
  load() {
    const storedList = localStorage.getItem('todoList')
    if (storedList) {
      const todoArray = JSON.parse(storedList)
      todoArray.forEach(item => {
        const todoItem = new TodoItem(item.text)
        todoList.add(todoItem)
      })
    }
  },
  save() {
    const todoArray = Array.from(todoList.items)
    localStorage.setItem('todoList', JSON.stringify(todoArray))
  },
}

todoList.addObserver(LocalStorage.save)
