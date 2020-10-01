import { API_BASE_URL, API_KEY } from '../../config'

const urlEndpoint = `${API_BASE_URL}movie/`

;('https://api.themoviedb.org/3/movie/{movie_id}/rating?api_key=ed183a97f2ed86e8d5f403f1d25abc0a')

const deleteMovieRating: DeleteMovieRating = async function ({ movieId, sid }) {
  const requestUrl = `${urlEndpoint}${movieId}/rating?api_key=${API_KEY}&guest_session_id=${sid}`
  return await fetch(requestUrl, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    method: 'DELETE'
  })
    .then(() => true)
    .catch(() => false)
}

export { deleteMovieRating }

export interface DeleteMovieRatingProps {
  movieId: string | number
  sid: string
}

type DeleteMovieRating = (options: DeleteMovieRatingProps) => Promise<boolean>
