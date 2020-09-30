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
    if (!session.sid && !session.sidIsLoading && isLocalStorageAvailable())
      dispatch(fetchSessionId())
  }, [session.sid])

  useEffect(() => {
    if (
      session.sid &&
      session.isRatedMoviesStale &&
      !session.isRatedMoviesLoading &&
      !session.isRatedMoviesError
    )
      dispatch(fetchRatedMovies(session.sid))
  }, [session.sid, session.isRatedMoviesStale])
}
