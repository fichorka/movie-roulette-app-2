import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { MovieCard } from '../movie-list/MovieCard'
import { selectSession } from '../other'
import './userProfile.css'

const UserProfile: React.FC = () => {
  const { ratedMovies } = useSelector(selectSession)
  return (
    <div>
      <Link to="/" className="nav-btn">
        {'<'} back
      </Link>
      <h1 className="page-title">My movies</h1>
      <div className="page-meta">
        {ratedMovies.length ? ratedMovies.length : 'No'}{' '}
        {ratedMovies.length === 1 ? 'movie' : 'movies'} rated{' '}
        {!ratedMovies.length && 'yet'}
      </div>
      <div className="movie-list">
        {ratedMovies &&
          ratedMovies.map((m) => <MovieCard key={m.id} movie={m} />)}
      </div>
    </div>
  )
}

export { UserProfile }
