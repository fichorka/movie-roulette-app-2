import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MovieFilters } from './MovieFilters'
import { RouletteModal } from './RouletteModal'
import './movieList.css'
import { MovieCard } from './MovieCard'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchMovies,
  selectMovieListSlice,
  selectMovies
} from './movieListSlice'

const MovieList: React.FC = () => {
  const [ModalVisible, setModalVisible] = useState(false)

  const dispatch = useDispatch()

  const movieListSlice = useSelector(selectMovieListSlice)

  const movies = useSelector(selectMovies)

  const { isLoading, isError, isSuccess } = movieListSlice

  useEffect(() => {
    // customHook for initial fetch
    if (!movies.length && !movieListSlice.isLoading) {
      dispatch(fetchMovies(movieListSlice.queryOptions))
    }
  }, [movies])

  return (
    <div>
      <div>
        <Link to="/236">Movie details</Link>
      </div>
      <div>
        <Link to="/profile">Movie profile</Link>
      </div>
      <h1>MovieList page</h1>
      <button onClick={() => setModalVisible(!ModalVisible)}>
        Toggle Modal
      </button>
      <MovieFilters />
      <div className="movie-list">
        {movies &&
          movies.map((m) => (
            <MovieCard
              key={m.id}
              title={m.title}
              imageUrl={m.poster_path}
              release_date={m.release_date}
              language={m.original_language}
              rating={m.vote_average}
            />
          ))}
        {isLoading && <div>Loading...</div>}
        {isError && <div>Network error...</div>}
        <button
          onClick={() => {
            if (isSuccess) {
              dispatch({ type: 'movieList/loadMore' })
              dispatch(fetchMovies(movieListSlice.queryOptions))
            }
          }}
        >
          Load more
        </button>
        {ModalVisible && (
          <RouletteModal
            closeModal={() => {
              setModalVisible(false)
            }}
          />
        )}
      </div>
    </div>
  )
}

export { MovieList }
