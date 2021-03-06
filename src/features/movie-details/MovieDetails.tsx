import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectApiConfig, selectGenres } from '../movie-list'
import { fetchMovie, selectMovie } from './movieDetailsSlice'
import './movieDetails.css'
import { YoutubeEmbed } from './YoutubeEmbed'
import { Rating } from './Rating'
import { Cast } from './Cast'
import { Crew } from './Crew'
import { PageLayout } from '../../layouts'

const MovieDetails: React.FC = () => {
  const { movieId }: MovieDetailsParams = useParams()
  const [isError, setIsError] = useState(false)

  const dispatch = useDispatch()
  const movie = useSelector(selectMovie)(parseInt(movieId, 10))
  const { baseUrl, backdropSize } = useSelector(selectApiConfig)

  const [videoVisible, setVideoVisible] = useState(false)

  const [videoKey, setVideoKey] = useState('')

  const genreMap = useSelector(selectGenres)

  const validVideos = movie?.videos?.results?.filter(
    (vid) => vid?.site.toLowerCase() === 'youtube'
  )

  useEffect(() => {
    if (!movie && movieId) {
      dispatch(fetchMovie(movieId))
    }
  }, [!movie, movieId])

  return (
    <PageLayout
      title={movie && movie?.title + ` (${movie?.release_date.split('-')[0]})`}
    >
      <div className="backdrop-container">
        {movie && (
          <img
            onError={() => {
              setIsError(true)
            }}
            style={isError ? { display: 'none' } : {}}
            className="backdrop__image"
            src={`${baseUrl}${backdropSize}/${movie.backdrop_path}`}
          />
        )}
        <div className="image--fader"></div>
        {movie?.overview && (
          <div className="overview overview--wide">{movie.overview}</div>
        )}
      </div>

      {movie?.overview && (
        <div className="overview overview--narrow">{movie.overview}</div>
      )}

      {movie && (
        <>
          <Rating movie={movie} />
          <div className="grid">
            {movie.genres && (
              <div className="grid__item">
                <span className="item__name">Genres</span>
                {movie.genres
                  .map(
                    (g) =>
                      genreMap.filter((genre) => genre.id === g.id)[0]?.name
                  )
                  .join(', ')}
              </div>
            )}
            {movie.original_language && (
              <div className="grid__item">
                <span className="item__name">Language</span>
                {movie.original_language}
              </div>
            )}
            {movie.popularity && (
              <div className="grid__item">
                <span className="item__name">Popularity</span>
                {parseInt('' + movie.popularity, 10)}
              </div>
            )}
            {movie.production_companies && (
              <div className="grid__item">
                <span className="item__name">Production companies</span>
                {movie.production_companies.map((p) => p.name).join(', ')}
              </div>
            )}
            {validVideos && (
              <div className="grid__item">
                <span className="item__name">Videos</span>
                {validVideos.map((vid) => (
                  <span
                    className="item-wrap"
                    onClick={() => {
                      setVideoKey(vid.key)
                      setVideoVisible(true)
                    }}
                    key={vid.key}
                  >
                    {vid.name || 'Video'}
                  </span>
                ))}
              </div>
            )}
          </div>
        </>
      )}
      {videoVisible && (
        <YoutubeEmbed
          videoKey={videoKey}
          close={() => {
            setVideoVisible(false)
          }}
        />
      )}
      {movie?.credits?.cast && <Cast cast={movie.credits.cast} />}
      {movie?.credits?.crew && <Crew crew={movie.credits.crew} />}
    </PageLayout>
  )
}

export { MovieDetails }

interface MovieDetailsParams {
  movieId?: string
}
