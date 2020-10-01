import React from 'react'

export const YoutubeEmbed: React.FC<Props> = ({ videoKey, close }: Props) => {
  return (
    <div className="modal-container">
      <div className="video-container">
        <div
          className="video-close-btn"
          onClick={() => {
            close()
          }}
        >
          X
        </div>
        <iframe
          className="video"
          // width="560"
          // height="315"
          src={`https://www.youtube-nocookie.com/embed/${videoKey}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}

export interface Props {
  videoKey: string
  close: CallableFunction
}
