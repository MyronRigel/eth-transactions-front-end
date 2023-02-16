import { Action, State } from './types'
import { Reducer } from 'react'

export const reducer: Reducer<any, any> = (state: State, action: Action) => {
   switch (action.type) {
      case 'fillTransactions': {
         return state = {...state, transactions: action.payload}
      }

      case 'setLoading': {
         return state = {...state, isLoading: action.payload}
      }

      default:
         return state
   }
}