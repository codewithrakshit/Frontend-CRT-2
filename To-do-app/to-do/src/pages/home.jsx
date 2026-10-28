import TodoForm from '../components/todoform'
import TodoList from '../components/todolist'
import { useTodos } from '../context/todocontext'

export default function Home() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodos()
  const remainingCount = todos.filter((todo) => !todo.completed).length
  const completedCount = todos.length - remainingCount

  return (
    <main className="page home-page">
      <section className="hero">
        <p className="eyebrow">YOUR PRODUCTIVITY SPACE</p>
        <h1>Small steps.<br /><em>Big progress.</em></h1>
        <p className="intro">Keep your day clear, focused, and moving forward.</p>
      </section>
      <section className="task-card" aria-labelledby="tasks-heading">
        <div className="card-heading">
          <div>
            <h2 id="tasks-heading">Today&apos;s tasks</h2>
            <p>{remainingCount ? `${remainingCount} ${remainingCount === 1 ? 'task' : 'tasks'} left` : 'All caught up'}</p>
          </div>
          {completedCount > 0 && (
            <button className="clear-button" type="button" onClick={clearCompleted}>
              Clear completed
            </button>
          )}
        </div>
        <TodoForm onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </section>
    </main>
  )
}
