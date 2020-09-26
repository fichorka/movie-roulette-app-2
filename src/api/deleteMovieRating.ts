import { API_BASE_URL, API_KEY } from '../../config'

const urlEndpoint = `${API_BASE_URL}movie/`

;('https://api.themoviedb.org/3/movie/{movie_id}/rating?api_key=ed183a97f2ed86e8d5f403f1d25abc0a')

const deleteMovieRating: DeleteMovieRating = async function ({
  id,
  guest_session_id
}) {
  const requestUrl = `${urlEndpoint}${id}/rating?api_key=${API_KEY}&guest_session_id=${guest_session_id}`
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

interface Props {
  id: string
  guest_session_id: string
}

type DeleteMovieRating = (options: Props) => Promise<boolean>
