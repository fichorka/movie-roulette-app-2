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
    if (session.sid && session.isRatedMoviesStale)
      setTimeout(() => {
        // fetch is being delayed here to give server the time to store new rating before returning all rated movies (when responding to user initiated rateMovieOnApi())
        dispatch(fetchRatedMovies(session.sid))
      }, 500)
  }, [session.sid, session.isRatedMoviesStale])
}
