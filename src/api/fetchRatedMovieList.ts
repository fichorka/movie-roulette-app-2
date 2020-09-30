import { API_BASE_URL, API_KEY } from '../../config'
import { MovieListResponse, MovieListResultObject } from './types'

const urlPart2 = `/guest_session/{guest_session_id}/rated/movies`

const essentialQueryParams = `?api_key=${API_KEY}language=en-US&include_adult=false&include_video=false`

const fetchRatedMovieList: FetchRatedMovieList = async function ({ sid }) {
  const requestUrl = encodeURI(
    API_BASE_URL + `${sid}${urlPart2}` + essentialQueryParams
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

export { fetchRatedMovieList }

type FetchRatedMovieList = (
  options: FetchRatedMovieListProps
) => Promise<MovieListResultObject[]>

export interface FetchRatedMovieListProps {
  sid: string
}
