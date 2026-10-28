export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <button
        className="check-button"
        type="button"
        aria-label={todo.completed ? `Mark ${todo.title} incomplete` : `Complete ${todo.title}`}
        aria-pressed={todo.completed}
        onClick={() => onToggle(todo.id)}
      >
        {todo.completed ? '✓' : ''}
      </button>
      <span className="todo-title">{todo.title}</span>
      <button
        className="delete-button"
        type="button"
        aria-label={`Delete ${todo.title}`}
        onClick={() => onDelete(todo.id)}
      >
        ×
      </button>
    </li>
  )
}
