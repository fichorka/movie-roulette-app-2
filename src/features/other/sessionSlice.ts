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
  // sidIsLoading: false,
  sidIsError: false,
  // isRatedMoviesLoading: false,
  // isRatedMoviesStale: true,
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
      state.sidIsError = false
      // state.isRatedMoviesStale = true
    })
    builder.addCase(fetchSessionId.rejected, (state) => {
      state.sidIsError = true
    })
    builder.addCase(fetchRatedMovies.fulfilled, (state, action) => {
      state.ratedMovies = action.payload
      // state.isRatedMoviesStale = false
    })
    // builder.addCase(fetchRatedMovies.pending, (state) => {
    //   state.isRatedMoviesLoading = true
    //   state.isRatedMoviesError = false
    // })
    builder.addCase(fetchRatedMovies.rejected, (state) => {
      // state.isRatedMoviesLoading = false
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
