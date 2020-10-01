import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PageLayout } from '../../layouts'
import { MovieCard } from '../movie-list/MovieCard'
import { selectSession } from '../other'

const UserProfile: React.FC = () => {
  const { ratedMovies } = useSelector(selectSession)
  return (
    <PageLayout title="My movies">
      <div className="page-meta">
        {ratedMovies.length ? ratedMovies.length : 'No'}{' '}
        {ratedMovies.length === 1 ? 'movie' : 'movies'} rated{' '}
        {!ratedMovies.length && 'yet'}
      </div>
      <div className="movie-list">
        {ratedMovies &&
          ratedMovies.map((m) => <MovieCard key={m.id} movie={m} />)}
      </div>
    </PageLayout>
  )
}

export { UserProfile }
