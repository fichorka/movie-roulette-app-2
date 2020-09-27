import '@babel/polyfill'
import ReactDOM from 'react-dom'
import React from 'react'
import { App } from './App'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      staleTime: 10000
    }
  }
})

ReactDOM.render(
  <ReactQueryCacheProvider queryCache={queryCache}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </ReactQueryCacheProvider>,

  document.getElementById('root')
)
