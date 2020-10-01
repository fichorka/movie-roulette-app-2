import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectApiConfig } from '.'
import { MovieListResultObject } from '../../api/types'

export const MovieCard: React.FC<Props> = ({ movie }: Props) => {
  const { baseUrl, posterSize } = useSelector(selectApiConfig)

  return (
    <Link to={movie ? `/${movie.id}` : ''} className="card">
      <div className="card__rating">{movie?.vote_average}</div>
      <div className="card__image-container">
        {movie && (
          <img
            src={`${baseUrl}${posterSize}/${movie.poster_path}`}
            alt={'Poster image for movie ' + movie.title}
            className="card__poster-image"
          />
        )}
        <div className="image--fader"></div>
      </div>
      <div className="card__label">
        {movie &&
          movie.title +
            (movie.release_date && ` (${movie?.release_date.split('-')[0]})`)}
      </div>
      <div className="card__sub-label">
        {movie && 'Language: ' + movie.original_language}
      </div>
    </Link>
  )
}

interface Props {
  movie: MovieListResultObject
}
