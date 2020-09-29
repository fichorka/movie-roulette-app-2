import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { MovieDetails } from './features/movie-details'
import { fetchAllGenres, MovieList, selectGenres } from './features/movie-list'
import { UserProfile } from './features/user-profile'
import { AppDispatch } from './store'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'

export const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const genres = useSelector(selectGenres)

  useEffect(() => {
    // custom Hook for fetching genres initially
    if (!genres.length) dispatch(fetchAllGenres())
  }, [genres])

  return (
    <Router>
      <Switch>
        <Route exact path="/profile">
          <UserProfile />
        </Route>
        <Route path="/:id">
          <MovieDetails />
        </Route>
        <Route path="/">
          <MovieList />
        </Route>
      </Switch>
    </Router>
  )
}
