import '@babel/polyfill'
import ReactDOM from 'react-dom'
import React from 'react'
import { App } from './App'
import { store } from './store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
