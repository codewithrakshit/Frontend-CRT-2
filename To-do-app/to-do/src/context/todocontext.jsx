import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const TodoContext = createContext(null)
const STORAGE_KEY = 'todo-app-items'

function readStoredTodos() {
  try {
    const storedTodos = localStorage.getItem(STORAGE_KEY)
    return storedTodos ? JSON.parse(storedTodos) : []
  } catch {
    return []
  }
}

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState(readStoredTodos)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = (title) => {
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return

    setTodos((currentTodos) => [
      {
        id: crypto.randomUUID(),
        title: trimmedTitle,
        completed: false,
        createdAt: Date.now(),
      },
      ...currentTodos,
    ])
  }

  const toggleTodo = (id) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const deleteTodo = (id) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos((currentTodos) => currentTodos.filter((todo) => !todo.completed))
  }

  const value = useMemo(
    () => ({ todos, addTodo, toggleTodo, deleteTodo, clearCompleted }),
    [todos],
  )

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

// This context intentionally exports its hook alongside the provider for a single public API.
// eslint-disable-next-line react-refresh/only-export-components
export function useTodos() {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useTodos must be used inside a TodoProvider')
  }
  return context
}
