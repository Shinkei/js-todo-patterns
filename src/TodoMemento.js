import TodoList from './TodoList.js'

const TodoMemento = {
  history: [],
  push(state) {
    if (state) {
      this.history.push(new Set([...state]))
    }
  },
  pop() {
    if (this.history.length > 1) {
      this.history.pop() // Remove current state
      return this.history.pop()
    }
  },
}

const todoItem = TodoList.getInstance()
TodoList.getInstance().addObserver(state => {
  TodoMemento.push(todoItem.items)
})

export default TodoMemento
