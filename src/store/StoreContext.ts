import React, { Dispatch } from 'react'
import { Action, State } from './types'

const StoreContext = React.createContext<{
  state: State
  dispatch: Dispatch<Action>
}>({
  state: {},
  dispatch() {
    return
  }
})

export { StoreContext }
