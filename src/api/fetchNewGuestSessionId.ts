import { API_BASE_URL, API_KEY } from '../../config'

const urlEndpoint = `${API_BASE_URL}authentication/guest_session/new?api_key=${API_KEY}`

const fetchNewGuestSessionId: FetchNewGuestSessionId = async function () {
  const requestUrl = urlEndpoint
  return await fetch(requestUrl)
    .then((res) => res.json())
    .then((res: NewGuestSessionResponse) => {
      if (!res.success || !res.guest_session_id) throw new Error()
      return res.guest_session_id
    })
    .catch(() => {
      throw new Error('Failed to fetch a new guest session id.')
    })
}

export { fetchNewGuestSessionId }

type FetchNewGuestSessionId = () => Promise<string>

interface NewGuestSessionResponse {
  success?: boolean
  guest_session_id?: string
}
