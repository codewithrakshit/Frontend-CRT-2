import { useState } from 'react'

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)

  const saveEdit = () => {
    if (title.trim()) {
      onUpdate(todo.id, title)
      setIsEditing(false)
    }
  }

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
      {isEditing ? (
        <input
          className="edit-input"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') saveEdit()
            if (event.key === 'Escape') setIsEditing(false)
          }}
          autoFocus
          aria-label={`Edit ${todo.title}`}
        />
      ) : (
        <span className="todo-title">{todo.title}</span>
      )}
      <button
        className="edit-button"
        type="button"
        onClick={() => (isEditing ? saveEdit() : setIsEditing(true))}
      >
        {isEditing ? 'Save' : 'Edit'}
      </button>
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
