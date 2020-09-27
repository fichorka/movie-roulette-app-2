import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../store/StoreContext'

const MovieList: React.FC<Props> = ({ isLoading, isError, data }: Props) => {
  const { state, dispatch } = useContext(StoreContext)
  useEffect(() => {
    dispatch({ type: 'navigation', payload: 'movieList' })
  }, [state.curPage])

  return (
    <div>
      <div>
        <Link to="/236">Movie details</Link>
      </div>
      <div>
        <Link to="/profile">Movie profile</Link>
      </div>
      <h1>MovieList page</h1>
      {isError && <div>Network error...</div>}
      {isLoading && <div>Loadding...</div>}
      {data && data.map((movie) => <div key={movie.id}>{movie.title}</div>)}
    </div>
  )
}

export { MovieList }

interface Props {
  isLoading: boolean
  isError: boolean
  data: any[]
}
