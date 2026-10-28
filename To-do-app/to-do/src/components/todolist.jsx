import TodoItem from './todoitem'

export default function TodoList({ todos, onToggle, onUpdate, onDelete }) {
  if (!todos.length) {
    return (
      <div className="empty-state">
        <span className="empty-icon">✦</span>
        <h2>No tasks yet</h2>
        <p>Add your first task above and make today count.</p>
      </div>
    )
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
