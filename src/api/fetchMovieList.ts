import { API_BASE_URL, API_KEY } from '../../config'

const urlEndpoint = API_BASE_URL + `discover/movie?api_key=${API_KEY}`

const essentialQueryParams =
  'language=en-US&include_adult=false&include_video=false'

const fetchMovieList: FetchMovieList = async function ({
  includeGenres = [],
  withoutGenres = [],
  sortBy = 'popularity',
  sortOrder = 'desc',
  page = 1
}) {
  console.log(urlEndpoint)
  const requestUrl =
    urlEndpoint +
    '&' +
    essentialQueryParams +
    (includeGenres.length ? `&with_genres=${includeGenres.join(',')}` : '') +
    (withoutGenres.length ? `&without_genres=${withoutGenres.join(',')}` : '') +
    `&sort_by=${sortBy}.${sortOrder}` +
    `&page=${page}`
  return await fetch(requestUrl)
    .then((res) => res.json())
    .then((res: ApiResponse) => {
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
  withoutGenres,
  sortBy,
  sortOrder
}: Props) => Promise<MovieListResultObject[]>

interface Props {
  includeGenres?: number[]
  withoutGenres?: number[]
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

interface ApiResponse {
  page: number
  total_results: number
  total_pages: number
  results: any[]
}

interface MovieListResultObject {
  id: number
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  genre_ids: number[]
  original_title: string
  original_language: string
  title: string
  popularity: number
  vote_count: number
  vote_average: number
}
