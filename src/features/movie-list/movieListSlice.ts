import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchGenres, fetchMovieList, FetchMovieListProps } from '../../api'
import { Genre, MovieListResultObject } from '../../api/types'
import { RootState } from '../../store'

const initialState: MovieListSlice = {
  data: [],
  isStale: true,
  genres: [],
  apiConfig: {
    posterSize: 'w500',
    backdropSize: 'original',
    baseUrl: 'http://image.tmdb.org/t/p/'
  },
  isLoading: false,
  isError: false,
  isSuccess: false,
  queryOptions: {
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
      state.isStale = true
    },
    tryFetchAgain(state) {
      state.isStale = true
    },
    refetch(state) {
      state.data = []
      state.queryOptions.page = 1
      state.isStale = true
    },
    changeSortSetting(state, action) {
      state.data = []
      state.isStale = true
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
      state.isStale = false
    })
    builder.addCase(fetchMovies.rejected, (state) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      state.isStale = false
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
  changeSortSetting,
  updateGenreSelection,
  tryFetchAgain,
  refetch
} = movieListSlice.actions

// Selectors

const selectMovieListSlice: SelectMovieListSlice = (state) => state.movieList

const selectMovies: SelectMovies = (state) => state.movieList.data

const selectGenres: SelectGenres = (state) => state.movieList.genres

const selectApiConfig: SelectApiConfig = (state) => state.movieList.apiConfig

const selectMovieListQueryOptions: SelectMovieListQueryOptions = (state) =>
  state.movieList.queryOptions

export {
  selectMovies,
  selectGenres,
  selectApiConfig,
  selectMovieListSlice,
  selectMovieListQueryOptions
}

// Reducer

const movieListReducer = movieListSlice.reducer

export { fetchMovies, fetchAllGenres, movieListReducer }

export interface MovieListSlice {
  data: MovieListResultObject[]
  isStale: boolean
  genres: Genre[] | []
  apiConfig: {
    posterSize: string
    backdropSize: string
    baseUrl: string
  }
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  queryOptions: FetchMovieListProps
}

type SelectMovies = (state: RootState) => MovieListResultObject[]

type SelectGenres = (state: RootState) => Genre[] | []

type SelectApiConfig = (state: RootState) => typeof initialState.apiConfig

type SelectMovieListSlice = (state: RootState) => MovieListSlice

type SelectMovieListQueryOptions = (state: RootState) => FetchMovieListProps
