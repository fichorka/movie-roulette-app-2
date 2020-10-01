import React from 'react'
import { useDispatch } from 'react-redux'
import { loadMore, tryFetchAgain } from '../movie-list'

export const LoadBtn: React.FC<Props> = ({ isLoading, isError }: Props) => {
  const dispatch = useDispatch()
  return (
    <button
      className="float-btn"
      disabled={isLoading}
      onClick={() => {
        if (!isLoading) {
          if (isError) dispatch(tryFetchAgain())
          else dispatch(loadMore())
        }
      }}
    >
      {isLoading ? 'Loading' : isError ? 'Try again' : 'Load'}
    </button>
  )
}

interface Props {
  isLoading: boolean
  isError: boolean
}
