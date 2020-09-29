import React from 'react'
import { Link } from 'react-router-dom'

const UserProfile: React.FC = () => {
  return (
    <div>
      <Link to="/">Back</Link>
      <h1>UserProfile page</h1>
    </div>
  )
}

export { UserProfile }
