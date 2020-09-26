import { API_BASE_URL, API_KEY } from '../../config'
import { MovieListResponse, MovieListResultObject } from './types'

const urlEndpoint = `${API_BASE_URL}search/movie?${API_KEY}$language=en-US&include_adult=false`

const fetchMovieSearchList: FetchMovieSearchList = async function ({ title }) {
  const requestUrl = `${urlEndpoint}&query=${title}`
  return await fetch(requestUrl)
    .then((res) => res.json())
    .then((res: MovieListResponse) => {
      if (!res.results) throw new Error()
      return res.results
    })
}

export { fetchMovieSearchList }

interface Props {
  title: string
}

type FetchMovieSearchList = (options: Props) => Promise<MovieListResultObject[]>
