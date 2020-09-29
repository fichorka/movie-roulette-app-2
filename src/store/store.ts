import { configureStore } from '@reduxjs/toolkit'
import { movieListReducer } from '../features/movie-list'

const store = configureStore({
  reducer: {
    movieList: movieListReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export { store }
