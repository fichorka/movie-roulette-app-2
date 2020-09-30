import { API_BASE_URL, API_KEY } from '../../config'
import { Genre, MovieListResponse, MovieListResultObject } from './types'

const urlEndpoint = API_BASE_URL + `discover/movie?api_key=${API_KEY}`

const essentialQueryParams =
  'language=en-US&include_adult=false&include_video=false'

const fetchMovieList: FetchMovieList = async function ({
  includeGenres,
  excludeGenres,
  sortBy,
  sortOrder,
  page
}) {
  console.log(urlEndpoint)
  const requestUrl = encodeURI(
    urlEndpoint +
      '&' +
      essentialQueryParams +
      (includeGenres.length
        ? `&with_genres=${includeGenres.map((g) => g.id).join(',')}`
        : '') +
      (excludeGenres.length
        ? `&without_genres=${excludeGenres.map((g) => g.id).join(',')}`
        : '') +
      `&sort_by=${sortBy}.${sortOrder}` +
      `&page=${page}`
  )

  return await fetch(requestUrl)
    .then((res) => res.json())
    .then((res: MovieListResponse) => {
      if (!res.results) throw new Error()
      return res.results
    })
    .catch(() => {
      throw new Error('Failed to fetch a movie list.')
    })
}

export { fetchMovieList }

type FetchMovieList = ({
  includeGenres,
  excludeGenres,
  sortBy,
  sortOrder
}: FetchMovieListProps) => Promise<MovieListResultObject[]>

export interface FetchMovieListProps {
  includeGenres?: Genre[]
  excludeGenres?: Genre[]
  sortBy?:
    | 'popularity'
    | 'vote_average'
    | 'release_date'
    | 'rating'
    | 'vote_count'
    | 'original_title'
  sortOrder?: 'asc' | 'desc'
  page?: number
}
