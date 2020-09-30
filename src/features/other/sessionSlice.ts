import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  deleteMovieRating,
  fetchNewGuestSessionId,
  fetchRatedMovieList,
  rateMovie,
  RateMovieProps,
  DeleteMovieRatingProps
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
  'session/rateMovie',
  async ({ movieId, sid, rating }: RateMovieProps) => {
    return await rateMovie({ movieId, sid, rating })
  }
)

const deleteMovieRatingOnApi = createAsyncThunk(
  'session/deleteMovieRating',
  async ({ movieId, sid }: DeleteMovieRatingProps) => {
    return await deleteMovieRating({ movieId, sid })
  }
)

const initialState = {
  sid: '',
  ratedMovies: [],
  sidIsError: false,
  isRatedMoviesError: false,
  isRatedMoviesStale: true,
  isLocalStorage: false
}

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    loadSidFromStorage: (state, action) => {
      state.sid = action.payload
      state.sidIsError = false
      state.isLocalStorage = true
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSessionId.fulfilled, (state, action) => {
      state.sid = action.payload
      state.sidIsError = false
    })
    builder.addCase(fetchSessionId.rejected, (state) => {
      state.sidIsError = true
    })
    builder.addCase(fetchRatedMovies.fulfilled, (state, action) => {
      state.ratedMovies = action.payload
      state.isRatedMoviesStale = false
      state.isRatedMoviesError = false
    })
    builder.addCase(fetchRatedMovies.rejected, (state) => {
      state.isRatedMoviesError = true
    })
    builder.addCase(rateMovieOnApi.fulfilled, (state) => {
      state.isRatedMoviesStale = true
    })
    builder.addCase(deleteMovieRatingOnApi.fulfilled, (state) => {
      state.isRatedMoviesStale = true
    })
  }
})

export const selectSession: SelectSession = (state: RootState) => state.session

type SelectSession = (state: RootState) => typeof initialState

export {
  fetchSessionId,
  fetchRatedMovies,
  rateMovieOnApi,
  deleteMovieRatingOnApi
}

export const { loadSidFromStorage } = sessionSlice.actions

export const { reducer: sessionReducer } = sessionSlice

export type SessionSlice = typeof initialState
