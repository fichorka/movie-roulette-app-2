import React, { useEffect, useState } from 'react'
import { MovieFilters } from './MovieFilters'
import { RouletteModal } from './RouletteModal'
import './movieList.css'
import { MovieCard } from './MovieCard'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchMovies,
  selectGenres,
  selectMovieListSlice,
  selectMovies
} from './movieListSlice'
import { LoadBtn } from '../movie-details/LoadBtn'

const MovieList: React.FC = () => {
  const [ModalVisible, setModalVisible] = useState(false)

  const genres = useSelector(selectGenres)

  const dispatch = useDispatch()

  const movieListSlice = useSelector(selectMovieListSlice)

  const { isLoading, isError, isStale } = movieListSlice

  const movies = useSelector(selectMovies)

  const targetList = movies.length ? movies : [...Array(20)]

  useEffect(() => {
    // customHook for initial fetch
    if (isStale) {
      dispatch(
        fetchMovies({
          ...movieListSlice.queryOptions,
          includeGenres: genres.filter((g) => g.included),
          excludeGenres: genres.filter((g) => g.excluded)
        })
      )
    }
  }, [isStale])

  return (
    <div>
      <MovieFilters />
      <div className="movie-list">
        {targetList &&
          targetList.map((m, i) => <MovieCard key={i} movie={m} />)}
      </div>
      <LoadBtn isLoading={isLoading} isError={isError} />
      {ModalVisible && (
        <RouletteModal
          closeModal={() => {
            setModalVisible(false)
          }}
        />
      )}
      <button
        className="float-btn float-btn--modal"
        onClick={() => setModalVisible(!ModalVisible)}
      ></button>
    </div>
  )
}

export { MovieList }
