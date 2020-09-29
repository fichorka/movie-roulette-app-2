import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeGenreFilter,
  selectGenres,
  selectMovieListQueryOptions,
  updateGenreSelection
} from './movieListSlice'

function renderGenres(genres, dispatch) {
  return (
    <>
      {genres.map((g, index) => (
        <div
          key={g.id}
          className={
            g.included
              ? 'modal__item yes'
              : g.excluded
              ? 'modal__item no'
              : 'modal__item'
          }
        >
          <div
            className="modal__item__no"
            onClick={() => {
              genres.splice(index, 1, {
                ...g,
                excluded: !g.excluded,
                included: false
              })
              dispatch(updateGenreSelection(genres))
            }}
          >
            No
          </div>
          <div className="modal__item__name">{g.name}</div>
          <div
            className="modal__item__yes"
            onClick={() => {
              genres.splice(index, 1, {
                ...g,
                included: !g.included,
                excluded: false
              })
              dispatch(updateGenreSelection(genres))
            }}
          >
            Yes
          </div>
        </div>
      ))}
    </>
  )
}

export const RouletteModal: React.FC<Props> = ({ closeModal }: Props) => {
  const dispatch = useDispatch()
  const genres = JSON.parse(JSON.stringify(useSelector(selectGenres)))
  const queryOptions = useSelector(selectMovieListQueryOptions)
  const includedGenres = queryOptions.includeGenres.slice()
  const excludedGenres = queryOptions.excludeGenres.slice()

  genres.map((g) => {
    // transform genres clone with included / excluded indicators
    if (includedGenres.filter((included) => included.id === g.id).length) {
      g.included = true
      g.excluded = false
      return g
    }
    if (excludedGenres.filter((excluded) => excluded.id === g.id).length) {
      g.included = false
      g.excluded = true
      return g
    }
  })

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal__control">
          <div className="modal__title-bar">Select genres</div>
          <div className="modal__close-btn" onClick={() => closeModal()}>
            X
          </div>
        </div>
        <div className="modal__body">
          {genres && renderGenres(genres, dispatch)}
        </div>
        <div
          className="modal__submit-btn"
          onClick={() => {
            dispatch(
              changeGenreFilter({
                includeGenres: genres.filter((g) => g.included),
                excludeGenres: genres.filter((g) => g.excluded)
              })
            )
          }}
        >
          Roll
        </div>
      </div>
    </div>
  )
}

interface Props {
  closeModal: CallableFunction
}
