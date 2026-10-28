import { useEffect, useState } from 'react'
import { TodoProvider } from './context/todocontext'
import About from './pages/about'
import Home from './pages/home'
import NotFound from './pages/notfound'

function getPage() {
  const path = window.location.hash.replace(/^#\/?/, '')
  return path || 'home'
}

export default function App() {
  const [page, setPage] = useState(getPage)

  useEffect(() => {
    const handleHashChange = () => setPage(getPage())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const content = page === 'home' ? <Home /> : page === 'about' ? <About /> : <NotFound />

  return (
    <TodoProvider>
      {content}
    </TodoProvider>
  )
}