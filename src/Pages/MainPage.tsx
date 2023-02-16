import React, { useReducer } from 'react'
import { SearchBar } from '../modules/SearchBar/components/SearchBar'
import { TransactionsTable } from '../modules/TransactionsTable/components/TransactionsTable'
import { reducer } from '../state/reducer'
import { Context } from '../state/state'


export const MainPage: React.FC = () => {
   const [state, dispatch] = useReducer(reducer, {transactions: [] = []})

   return (
      <Context.Provider value={{state, dispatch}}>
         <div className="container">
            <SearchBar/>
            <TransactionsTable/>
         </div>
      </Context.Provider>
   )
}