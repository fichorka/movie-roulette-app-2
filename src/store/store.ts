import { configureStore } from '@reduxjs/toolkit'
import { movieDetailsReducer } from '../features/movie-details/movieDetailsSlice'
import { movieListReducer } from '../features/movie-list'
import { sessionReducer } from '../features/other'

const store = configureStore({
  reducer: {
    movieList: movieListReducer,
    movieDetails: movieDetailsReducer,
    session: sessionReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export { store }
