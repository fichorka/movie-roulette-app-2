import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar: React.FC = () => {
  return (
    <nav className="nav-bar">
      <h1 className="nav-title">movie roulette app</h1>
      <Link to="/profile" className="profile-btn">
        <div className="profile-icon"></div>
      </Link>
    </nav>
  )
}
