import { NavLink } from 'react-router-dom'

const links = [
  { to: '/rules', label: 'Rules' },
  { to: '/activities', label: 'Raids & Dungeons' },
  { to: '/unlocks', label: 'Unlocks' },
  { to: '/exotics', label: 'Exotics' },
  { to: '/debug', label: 'Debug' }
]

export default function TopNav({ availableMarks = 0 }) {
  return (
    <header className="topbar panel">
      <div className="brand-lockup">
        <span className="brand-mark" aria-hidden="true" />
        <div>
          <p className="brand-kicker">RaD Experience</p>
          <p className="brand-sub">Raid and Dungeon Challenge Tracker</p>
        </div>
      </div>
      <nav className="tabs" aria-label="Primary">
        <div className="marks-pill" aria-label="Available Marks">
          <span className="marks-label">Available Marks</span>
          <strong>{availableMarks}</strong>
        </div>
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