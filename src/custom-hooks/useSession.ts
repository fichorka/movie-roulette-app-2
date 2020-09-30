import { useEffect } from 'react'
import {
  fetchRatedMovies,
  fetchSessionId,
  SessionSlice
} from '../features/other'
import { AppDispatch } from '../store'
import { isLocalStorageAvailable } from '../utils'

export function useSession(session: SessionSlice, dispatch: AppDispatch): void {
  // custom hook for managing guest session and movie rating

  useEffect(() => {
    if (!session.sid && isLocalStorageAvailable()) dispatch(fetchSessionId())
    if (session.sid && !session.isRatedMoviesError)
      dispatch(fetchRatedMovies(session.sid))
  }, [session.sid])
}
