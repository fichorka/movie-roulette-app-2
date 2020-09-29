import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectMovieListQueryOptions, changeSortSetting } from './'

const MovieFilters: React.FC = () => {
  const dispatch = useDispatch()

  const queryOptions = useSelector(selectMovieListQueryOptions)

  return (
    <div className="movie-filters">
      <div className="movie-filters__sort-option">
        <select
          name="sort_order"
          id="sort_order"
          value={queryOptions.sortOrder}
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
