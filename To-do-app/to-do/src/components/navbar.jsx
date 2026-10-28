export default function Navbar({ currentPage, onNavigate }) {
  return (
    <header className="navbar">
      <a className="brand" href="#/" onClick={() => onNavigate('home')}>
        <span className="brand-mark">✓</span>
        <span>Taskflow</span>
      </a>
      <nav aria-label="Main navigation">
        <a
          className={currentPage === 'home' ? 'active' : ''}
          href="#/"
          onClick={() => onNavigate('home')}
        >
          My tasks
        </a>
        <a
          className={currentPage === 'about' ? 'active' : ''}
          href="#/about"
          onClick={() => onNavigate('about')}
        >
          About
        </a>
      </nav>
    </header>
  )
}
