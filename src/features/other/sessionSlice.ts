import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  fetchNewGuestSessionId,
  fetchRatedMovieList,
  rateMovie
} from '../../api'
import { RootState } from '../../store'

const fetchSessionId = createAsyncThunk('session/fetchId', async () => {
  return await fetchNewGuestSessionId()
})

const fetchRatedMovies = createAsyncThunk(
  'session/fetchRatedMovies',
  async (sid: string) => {
    return await fetchRatedMovieList({ sid })
  }
)

const rateMovieOnApi = createAsyncThunk(
  'session/fetchRatedMovies',
  async ({ movieId, sid, rating }) => {
    return await rateMovie({ movieId, sid, rating })
  }
)

const initialState = {
  sid: '',
  ratedMovies: [],
  sidIsLoading: false,
  sidIsError: false,
  isRatedMoviesLoading: false,
  isRatedMoviesStale: true,
  isRatedMoviesError: false
}

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    movieRated: (state, action) => {
      state.ratedMovies.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSessionId.fulfilled, (state, action) => {
      state.sid = action.payload
      state.sidIsLoading = false
      state.sidIsError = false
    })
    builder.addCase(fetchSessionId.pending, (state) => {
      state.sidIsLoading = true
      state.sidIsError = false
    })
    builder.addCase(fetchSessionId.rejected, (state) => {
      state.sidIsError = true
      state.sidIsLoading = false
    })
    builder.addCase(fetchRatedMovies.fulfilled, (state, action) => {
      state.ratedMovies = action.payload
      state.isRatedMoviesStale = false
      state.isRatedMoviesStale = false
    })
    builder.addCase(rateMovieOnApi.fulfilled, (state) => {
      state.isRatedMoviesStale = true
    })
    builder.addCase(rateMovieOnApi.pending, (state) => {
      state.isRatedMoviesLoading = true
      state.isRatedMoviesError = false
    })
    builder.addCase(rateMovieOnApi.fulfilled, (state) => {
      state.isRatedMoviesLoading = false
      state.isRatedMoviesError = true
    })
  }
})

export const selectSession: SelectSession = (state: RootState) => state.session

type SelectSession = (state: RootState) => typeof initialState

export { fetchSessionId, fetchRatedMovies }

export const { movieRated } = sessionSlice.actions

export const { reducer: sessionReducer } = sessionSlice

export type SessionSlice = typeof initialState
