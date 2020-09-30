import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectMovieListQueryOptions, changeSortSetting } from './'

const MovieFilters: React.FC = () => {
  const dispatch = useDispatch()

  const { sortOrder, sortBy } = useSelector(selectMovieListQueryOptions)

  return (
    <div className="movie-filters">
      <div className="movie-filters__sort-option">
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
            ['vote_count', 'Cote count'],
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
      </div>
    </div>
  )
}

export { MovieFilters }
