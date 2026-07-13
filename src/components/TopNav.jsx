import { NavLink } from 'react-router-dom'

const links = [
  { to: '/rules', label: 'Rules' },
  { to: '/activities', label: 'Raids & Dungeons' },
  { to: '/unlocks', label: 'Unlocks' },
  { to: '/exotics', label: 'Exotics' }
]

export default function TopNav() {
  return (
    <header className="topbar panel">
      <div className="brand-lockup">
        <span className="brand-mark" aria-hidden="true" />
        <div>
          <p className="brand-kicker">RaD Challenge</p>
          <p className="brand-sub">Destiny-inspired tracker</p>
        </div>
      </div>
      <nav className="tabs" aria-label="Primary">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}