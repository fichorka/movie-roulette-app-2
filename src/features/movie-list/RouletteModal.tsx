import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { refetch, selectGenres, updateGenreSelection } from './movieListSlice'

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
  const genres = useSelector(selectGenres)
  const genresClone = JSON.parse(JSON.stringify(genres))

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal__control">
          <div className="modal__title-bar">Select genres</div>
          <div
            className="modal__close-btn"
            onClick={() => {
              closeModal()
              dispatch(refetch())
            }}
          >
            X
          </div>
        </div>
        <div className="modal__body">
          {genresClone && renderGenres(genresClone, dispatch)}
        </div>
        <div
          className="modal__submit-btn"
          onClick={() => {
            closeModal()
            dispatch(refetch())
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
