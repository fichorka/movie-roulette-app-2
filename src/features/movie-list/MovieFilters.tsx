import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectMovieListQueryOptions, changeSortSetting } from './'
import { changeGenreFilter } from './movieListSlice'

const MovieFilters: React.FC = () => {
  const dispatch = useDispatch()
  const { includeGenres, excludeGenres } = useSelector(
    selectMovieListQueryOptions
  )

  const { sortOrder, sortBy } = useSelector(selectMovieListQueryOptions)

  return (
    <div className="movie-filters">
      <select
        className="sort-order-option"
        name="sort_order"
        id="sort_order"
        value={sortBy}
        onChange={(evt) => {
          dispatch(changeSortSetting({ sortBy: evt.target.value }))
        }}
      >
        {[
          ['popularity', 'Popularity'],
          ['vote_average', 'Rating'],
          ['release_date', 'Release date'],
          ['vote_count', 'Vote count'],
          ['original_title', 'Title']
        ].map((filter) => (
          <option key={filter[0]} value={filter[0]}>
            {filter[1]}
          </option>
        ))}
      </select>
      <select
        className="sort-order-option"
        name="sort_order"
        id="sort_order"
        value={sortOrder}
        onChange={(evt) => {
          dispatch(changeSortSetting({ sortOrder: evt.target.value }))
        }}
      >
        <option value="asc">ascending</option>
        <option value="desc">descending</option>
      </select>
      {includeGenres.map((genre, i) => (
        <div
          key={genre.id}
          className="sort-order-option included"
          onClick={() => {
            const genresClone = includeGenres.slice()
            genresClone.splice(i, 1)
            dispatch(
              changeGenreFilter({
                includeGenres: genresClone
              })
            )
          }}
        >
          {genre.name} x
        </div>
      ))}
      {excludeGenres.map((genre, i) => (
        <div
          key={genre.id}
          className="sort-order-option excluded"
          onClick={() => {
            const genresClone = excludeGenres.slice()
            genresClone.splice(i, 1)
            dispatch(
              changeGenreFilter({
                excludeGenres: genresClone
              })
            )
          }}
        >
          {genre.name} x
        </div>
      ))}
    </div>
  )
}

export { MovieFilters }
