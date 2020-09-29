export interface MovieListResultObject {
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

interface Genre {
  id: number
  name: string
  included: boolean
  excluded: boolean
}

export interface MovieListResponse {
  page: number
  total_results: number
  total_pages: number
  results: MovieListResultObject[]
}

export { MovieListResultObject, Genre }
