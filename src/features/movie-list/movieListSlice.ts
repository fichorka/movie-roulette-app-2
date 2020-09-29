import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchGenres, fetchMovieList, FetchMovieListProps } from '../../api'
import { Genre, MovieListResultObject } from '../../api/types'
import { RootState } from '../../store'

const initialState: MovieListSlice = {
  data: [],
  genres: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  queryOptions: {
    includeGenres: [],
    excludeGenres: [],
    sortBy: 'popularity',
    sortOrder: 'desc',
    page: 1
  }
}

// Async thunks

const fetchMovies = createAsyncThunk(
  'movieList/fetchMovieList',
  async (queryOptions: FetchMovieListProps) => {
    return await fetchMovieList(queryOptions)
  }
)

const fetchAllGenres = createAsyncThunk(
  'movieList/fetchAllGenres',
  async () => {
    return await fetchGenres()
  }
)

const movieListSlice = createSlice({
  name: 'movieList',
  initialState: initialState,
  reducers: {
    loadMore(state) {
      state.queryOptions.page++
    },
    changeGenreFilter(state, action) {
      state.data = []
      state.queryOptions.includeGenres = action.payload.includeGenres
      state.queryOptions.excludeGenres = action.payload.excludeGenres
    },
    changeSortSetting(state, action) {
      state.data = []
      state.queryOptions.page = 1
      state.queryOptions.sortBy =
        action.payload.sortBy || state.queryOptions.sortBy
      state.queryOptions.sortOrder =
        action.payload.sortOrder || state.queryOptions.sortOrder
    },
    updateGenreSelection(state, action) {
      state.genres = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.data.push(...action.payload)
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
    })
    builder.addCase(fetchMovies.rejected, (state) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
    })
    builder.addCase(fetchMovies.pending, (state) => {
      state.isLoading = true
      state.isError = false
      state.isSuccess = false
    })
    builder.addCase(fetchAllGenres.fulfilled, (state, action) => {
      state.genres = action.payload
    })
  }
})

// Actions

export const {
  loadMore,
  changeGenreFilter,
  changeSortSetting,
  updateGenreSelection
} = movieListSlice.actions

// Selectors

const selectMovieListSlice: SelectMovieListSlice = (state) => state.movieList

const selectMovies: SelectMovies = (state) => state.movieList.data

const selectGenres: SelectGenres = (state) => state.movieList.genres

const selectMovieListQueryOptions: SelectMovieListQueryOptions = (state) =>
  state.movieList.queryOptions

export {
  selectMovies,
  selectGenres,
  selectMovieListSlice,
  selectMovieListQueryOptions
}

// Reducer

const movieListReducer = movieListSlice.reducer

export { fetchMovies, fetchAllGenres, movieListReducer }

export interface MovieListSlice {
  data: MovieListResultObject[]
  genres: Genre[] | []
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  queryOptions: FetchMovieListProps
}

type SelectMovies = (state: RootState) => MovieListResultObject[]

type SelectGenres = (state: RootState) => Genre[] | []

type SelectMovieListSlice = (state: RootState) => MovieListSlice

type SelectMovieListQueryOptions = (state: RootState) => FetchMovieListProps
