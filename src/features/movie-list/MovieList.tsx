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

  const { isLoading, isError, isSuccess, isStale } = movieListSlice

  const movies = useSelector(selectMovies)

  const targetList = movies.length ? movies : [...Array(20)]

  useEffect(() => {
    // customHook for initial fetch
    if (isStale) {
      dispatch(fetchMovies(movieListSlice.queryOptions))
    }
  }, [isStale])

  return (
    <div>
      <button
        className="float-btn float-btn--modal"
        onClick={() => setModalVisible(!ModalVisible)}
      ></button>
      <MovieFilters />
      <div className="movie-list">
        {targetList &&
          targetList.map((m, i) => <MovieCard key={i} movie={m} />)}
      </div>
      <button
        className="float-btn"
        disabled={isLoading}
        onClick={() => {
          if (!isLoading) {
            dispatch({ type: 'movieList/loadMore' })
            // dispatch(fetchMovies(movieListSlice.queryOptions))
          }
        }}
      >
        {isLoading ? 'Loading' : isError ? 'Try again' : 'Load'}
      </button>
      {ModalVisible && (
        <RouletteModal
          closeModal={() => {
            setModalVisible(false)
          }}
        />
      )}
    </div>
  )
}

export { MovieList }
