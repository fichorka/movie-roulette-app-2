import React from 'react'
import { fetchMovieList } from './api/fetchMovieList'

export const App: React.FC = () => {
  fetchMovieList({}).then((res) => console.log(res))
  return (
    <div>
      <h1>Hello</h1>
    </div>
  )
}
