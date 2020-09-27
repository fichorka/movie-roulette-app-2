import React, { useReducer } from 'react'
import { useQuery } from 'react-query'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { fetchMovieList } from './api'
import { MovieDetails } from './features/movie-details'
import { MovieList } from './features/movie-list'
import { UserProfile } from './features/user-profile'
import { rootReducer } from './store'
import { StoreContext } from './store/StoreContext'

export const App: React.FC = () => {
  // create store
  const [state, dispatch] = useReducer(rootReducer, {})

  // movieList query
  const { isLoading, isError, data } = useQuery(
    [{ sortOrder: 'asc' }],
    fetchMovieList,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      enabled: state.curPage === 'movieList'
    }
  )

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      <Router>
        <Switch>
          <Route exact path="/profile">
            <UserProfile />
          </Route>
          <Route path="/:id">
            <MovieDetails />
          </Route>
          <Route path="/">
            <MovieList data={data} isLoading={isLoading} isError={isError} />
          </Route>
        </Switch>
      </Router>
    </StoreContext.Provider>
  )
}
