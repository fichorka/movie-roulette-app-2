import React from 'react'
import { Crew as ICrew } from '../../api'

export const Crew: React.FC<{ crew: ICrew[] }> = ({
  crew
}: {
  crew: ICrew[]
}) => {
  return (
    <div className="grid__item">
      <span className="item__name">Crew</span>
      {crew.map((p) => `${p.name}${p.job ? ' - ' + p.job : ''}`).join(', ')}
    </div>
  )
}
