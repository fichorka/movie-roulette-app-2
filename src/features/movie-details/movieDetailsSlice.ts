import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchMovieDetails, MovieDetailsApi } from '../../api'
import { RootState } from '../../store'

const initialState: MovieDetailsSlice = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false
}

const fetchMovie = createAsyncThunk(
  'movieDetails/fetchMovieDetails',
  async (movieId: string | number) => {
    return await fetchMovieDetails({ movieId })
  }
)

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovie.fulfilled, (state, action) => {
      state.data.push(action.payload)
    })
  }
})

const selectMovie = (state: RootState) => (movieId: number) =>
  state.movieDetails.data.filter((m) => movieId === m.id)[0]

export { selectMovie }

export { fetchMovie }

export const { reducer: movieDetailsReducer } = movieDetailsSlice

interface MovieDetailsSlice {
  data: MovieDetailsApi[]
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
}
