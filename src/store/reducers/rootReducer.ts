import { Reducer } from 'react'
import { Action, State } from '../types'

const rootReducer: Reducer<State, Action> = function (state, action) {
  switch (action.type) {
    case 'navigation':
      return {
        ...state,
        curPage: action.payload
      }
  }
}

export { rootReducer }
