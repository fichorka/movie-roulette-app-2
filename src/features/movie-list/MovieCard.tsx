import React from 'react'
import { useSelector } from 'react-redux'
import { selectApiConfig } from '.'

export const MovieCard: React.FC<Props> = ({
  imageUrl,
  title,
  release_date,
  language,
  rating
}: Props) => {
  const { posterSize, baseUrl } = useSelector(selectApiConfig)

  return (
    <div className="card">
      <div className="card__rating">{rating}</div>
      <div className="card__image-container">
        <img
          src={`${baseUrl}${posterSize}${imageUrl}`}
          alt={'Poster image for movie ' + title}
          className="card__poster-image"
        />
      </div>
      <div className="card__label">
        {title} {release_date && release_date.split('-')[0]}
      </div>
      <div className="card__sub-label">Language: {language}</div>
    </div>
  )
}

interface Props {
  imageUrl: string
  title: string
  release_date: string
  language: string
  rating: number
}
