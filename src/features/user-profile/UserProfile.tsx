import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../store/StoreContext'

const UserProfile: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext)

  useEffect(() => {
    dispatch({ type: 'navigation', payload: 'userProfile' })
  }, [state.curPage])

  return (
    <div>
      <Link to="/">Back</Link>
      <h1>UserProfile page</h1>
    </div>
  )
}

export { UserProfile }
