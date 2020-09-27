import React from 'react'
import { Link } from 'react-router-dom'

const MovieList: React.FC = () => {
  return (
    <div>
      <div>
        <Link to="/236">Movie details</Link>
      </div>
      <div>
        <Link to="/profile">Movie profile</Link>
      </div>
      <h1>MovieList page</h1>
    </div>
  )
}

export { MovieList }
