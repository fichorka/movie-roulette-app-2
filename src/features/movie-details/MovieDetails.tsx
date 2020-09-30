import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchMovie, selectMovie } from './movieDetailsSlice'

const MovieDetails: React.FC = () => {
  const { movieId }: MovieDetailsParams = useParams()
  const dispatch = useDispatch()
  const movie = useSelector(selectMovie)(parseInt(movieId, 10))

  useEffect(() => {
    if (!movie && movieId) {
      dispatch(fetchMovie(movieId))
    }
  }, [!movie, movieId])

  return (
    <div>
      <Link to="/">Back</Link>
      <h1>MovieDetails page</h1>
      <h1>{movie?.title}</h1>
    </div>
  )
}

export { MovieDetails }

interface MovieDetailsParams {
  movieId?: string
}
