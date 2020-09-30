import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { MovieDetails } from './features/movie-details'
import { fetchAllGenres, MovieList, selectGenres } from './features/movie-list'
import { UserProfile } from './features/user-profile'
import { AppDispatch } from './store'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { selectSession } from './features/other'
import { useSession } from './custom-hooks'
import { Navbar } from './Navbar'

export const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const genres = useSelector(selectGenres)
  const session = useSelector(selectSession)

  useEffect(() => {
    // custom Hook for fetching genres initially
    if (!genres.length) dispatch(fetchAllGenres())
  }, [genres])

  useSession(session, dispatch)

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/profile">
          <UserProfile />
        </Route>
        <Route path="/:movieId">
          <MovieDetails />
        </Route>
        <Route path="/">
          <MovieList />
        </Route>
      </Switch>
    </Router>
  )
}
