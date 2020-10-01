import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MovieDetailsApi } from '../../api'
import {
  deleteMovieRatingOnApi,
  rateMovieOnApi,
  selectOwnMovieRating,
  selectSession
} from '../other'

const Rating: React.FC<{ movie: MovieDetailsApi }> = ({
  movie
}: {
  movie: MovieDetailsApi
}) => {
  const dispatch = useDispatch()
  const ownRating = useSelector(selectOwnMovieRating)(movie?.id)
  const { sid } = useSelector(selectSession)
  return (
    <div className="rating">
      {movie &&
        [...Array(10)].map((star, i) => (
          <span
            key={i}
            className={`rating__star${
              i + 1 <= Math.round(movie.vote_average) ? ' rated' : ''
            } ${i + 1 === ownRating ? ' own-rating' : ''}`}
            onClick={() => {
              if (ownRating === i + 1) {
                dispatch(deleteMovieRatingOnApi({ movieId: movie.id, sid }))
              } else {
                dispatch(
                  rateMovieOnApi({
                    movieId: movie.id,
                    sid,
                    rating: i + 1
                  })
                )
              }
            }}
          >
            <span className="star__symbol">★</span>
            <span className="star__number">{i + 1}</span>
          </span>
        ))}
    </div>
  )
}

export { Rating }
