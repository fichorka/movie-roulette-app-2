import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectMovieListQueryOptions, changeSortSetting } from './'
import { refetch, selectGenres, updateGenreSelection } from './movieListSlice'

const MovieFilters: React.FC = () => {
  const dispatch = useDispatch()
  const genres = useSelector(selectGenres)

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
      {genres
        .filter((genre) => genre.included || genre.excluded)
        .map((g) => (
          <div
            key={g.id}
            className={`sort-order-option ${
              g.included ? 'included' : 'excluded'
            }`}
            onClick={() => {
              const genresClone = genres.map((g2) => {
                if (g2.id === g.id) {
                  return {
                    ...g2,
                    included: false,
                    excluded: false
                  }
                }
                return g2
              })
              dispatch(updateGenreSelection(genresClone))
              dispatch(refetch())
            }}
          >
            {g.name} x
          </div>
        ))}
    </div>
  )
}

export { MovieFilters }
