class TodoItem {
  constructor(text) {
    this.text = text
  }

  equals(other) {
    return other.text === this.text
  }
}
