import { useEffect } from 'react'
import {
  fetchRatedMovies,
  fetchSessionId,
  loadSidFromStorage,
  SessionSlice
} from '../features/other'
import { AppDispatch } from '../store'
import { isLocalStorageAvailable } from '../utils'

export function useSession(session: SessionSlice, dispatch: AppDispatch): void {
  // custom hook for managing guest session, movie rating and localStorage

  useEffect(() => {
    if (!session.sid) {
      if (isLocalStorageAvailable()) {
        const sid = localStorage.getItem('sid')
        if (sid) dispatch(loadSidFromStorage(sid))
        else {
          dispatch(fetchSessionId())
        }
      } else {
        if (!session.sid) {
          dispatch(fetchSessionId())
        }
      }
    }

    if (session.sid)
      if (!session.isLocalStorage && isLocalStorageAvailable()) {
        const sid = localStorage.getItem('sid')
        if (!sid) localStorage.setItem('sid', session.sid)
      }
    if (session.isRatedMoviesStale) {
      setTimeout(() => {
        // delay fetch to give server the time to store a new rating before returning all the rated movies (when responding to user initiated rate / deleteRating)
        dispatch(fetchRatedMovies(session.sid))
      }, 500)
    }
  }, [session.sid, session.isRatedMoviesStale])
}
