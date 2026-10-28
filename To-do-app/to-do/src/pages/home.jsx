import { useState } from 'react'
import TodoForm from '../components/todoform'
import TodoList from '../components/todolist'
import { useTodos } from '../context/todocontext'

export default function Home() {
  const { todos, addTodo, toggleTodo, updateTodo, deleteTodo } = useTodos()
  const [filter, setFilter] = useState('all')
  const remainingCount = todos.filter((todo) => !todo.completed).length
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    <main className="page home-page">
      <section className="hero">
        <h1>My Tasks</h1>
        <p className="intro">Keep track of what matters today.</p>
      </section>
      <section className="task-card" aria-labelledby="tasks-heading">
        <TodoForm onAdd={addTodo} />
        <div className="task-toolbar">
          <div className="filters" role="group" aria-label="Task filter">
            {['all', 'active', 'completed'].map((option) => (
              <button
                className={filter === option ? 'filter-button selected' : 'filter-button'}
                key={option}
                type="button"
                onClick={() => setFilter(option)}
              >
                {option[0].toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
          <span className="task-count">{todos.length} {todos.length === 1 ? 'task' : 'tasks'}</span>
        </div>
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />
        <p className="completion-count">{todos.length - remainingCount} completed out of {todos.length}</p>
      </section>
    </main>
  )
}
