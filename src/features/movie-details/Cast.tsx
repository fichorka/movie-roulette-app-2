import React from 'react'
import { Cast as ICast } from '../../api'

export const Cast: React.FC<{ cast: ICast[] }> = ({
  cast
}: {
  cast: ICast[]
}) => {
  return (
    <div className="grid__item">
      <span className="item__name">Cast</span>
      {cast
        .map((p) => `${p.name} ${p.character ? 'as ' + p.character : ''}`)
        .join(', ')}
    </div>
  )
}
