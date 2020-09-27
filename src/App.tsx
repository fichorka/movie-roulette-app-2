import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { MovieDetails } from './features/movie-details'
import { MovieList } from './features/movie-list'
import { UserProfile } from './features/user-profile'

export const App: React.FC = () => {
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
