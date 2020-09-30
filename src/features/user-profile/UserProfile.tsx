import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { MovieCard } from '../movie-list/MovieCard'
import { selectSession } from '../other'

const UserProfile: React.FC = () => {
  const { ratedMovies } = useSelector(selectSession)
  return (
    <div>
      <Link to="/">Back</Link>
      <h1>UserProfile page</h1>
      <div>Rated movies</div>
      <div className="movile-list">
        {ratedMovies &&
          ratedMovies.map((m) => (
            <MovieCard
              key={m.id}
              title={m.title}
              imageUrl={m.poster_path}
              release_date={m.release_date}
              language={m.original_language}
              rating={m.vote_average}
            />
          ))}
      </div>
    </div>
  )
}

export { UserProfile }
