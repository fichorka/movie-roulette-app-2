import { API_BASE_URL, API_KEY } from '../../config'
import { Genre, MovieListResultObject } from './types'

const urlEndpoint = `${API_BASE_URL}movie/`
const essentialQueryParams = `api_key=${API_KEY}&language=en-US&append_to_response=videos,credits,recommendations`

const fetchMovieDetails: FetchMovieDetails = async function ({ movieId }) {
  const requestUrl = urlEndpoint + `${movieId}` + '?' + essentialQueryParams

  return await fetch(requestUrl).then((res) => res.json())
}

export { fetchMovieDetails }

type FetchMovieDetails = (options: {
  movieId: string | number
}) => Promise<MovieDetailsApi>

export interface MovieDetailsApi {
  backdrop_path?: string | null
  genres?: Genre[]
  homepage?: string | null
  id?: number
  imdb_id?: string | null
  original_language?: string
  original_title?: string
  overview?: string | null
  popularity?: number
  poster_path?: string | null
  production_companies?: { name: string }[]
  release_date?: string
  title?: string
  vote_average?: number
  vote_count?: number
  videos?: VideoResponseApi
  credits: Credits
  recommendations?: { results: MovieListResultObject[] }
}

interface VideoResponseApi {
  results?: Array<{
    key?: string
    site?: string
  }>
}

interface Credits {
  cast: {
    name: string
    character: string
    order: number
  }[]
}
