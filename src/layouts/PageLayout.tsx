import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export const PageLayout: React.FC<Props> = ({ children, title }: Props) => {
  return (
    <div>
      <div className="page-bar">
        <Link to="/" className="nav-btn">
          {'<'} back
        </Link>
        <h1 className="page-title">{title}</h1>
      </div>
      {children}
    </div>
  )
}

interface Props {
  children: ReactNode
  title: string
}
