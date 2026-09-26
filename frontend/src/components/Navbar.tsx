import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">

      <div className="navbar-brand">

        <div className="brand-icon">
          📚
        </div>

        <div className="brand-text">

          <h2>
            Daftar Pekerjaan Rumah Farel
          </h2>

          <span className="brand-subtitle">
            Management Tugas
          </span>

        </div>

      </div>

      <div className="navbar-menu">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'nav-link active'
              : 'nav-link'
          }
        >
          🏠 Dashboard
        </NavLink>

        <NavLink
          to="/tugas"
          className={({ isActive }) =>
            isActive
              ? 'nav-link active'
              : 'nav-link'
          }
        >
          📋 Tugas
        </NavLink>

        <NavLink
          to="/profil"
          className={({ isActive }) =>
            isActive
              ? 'nav-link active'
              : 'nav-link'
          }
        >
          👤 Profil
        </NavLink>

      </div>

    </nav>
  )
}

export default Navbar