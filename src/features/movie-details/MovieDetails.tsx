import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../store/StoreContext'

const MovieDetails: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext)

  useEffect(() => {
    dispatch({ type: 'navigation', payload: 'movieDetails' })
  }, [state.curPage])

  return (
    <div>
      <Link to="/">Back</Link>
      <h1>MovieDetails page</h1>
    </div>
  )
}

export { MovieDetails }
