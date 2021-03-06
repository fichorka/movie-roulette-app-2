import { API_BASE_URL, API_KEY } from '../../config'
import { Genre } from './types'

const endpointUrl =
  API_BASE_URL + `genre/movie/list?api_key=${API_KEY}&language=en-US`

const fetchGenres: FetchGenres = async function () {
  return await fetch(endpointUrl)
    .then((res) => res.json())
    .then((data: ApiResponse) => {
      if (!data.genres) throw new Error()
      return data.genres
    })
    .catch(() => {
      throw new Error('Failed to fetch the genre list.')
    })
}

export { fetchGenres }

type FetchGenres = () => Promise<Genre[]>

interface ApiResponse {
  genres: Genre[]
}
