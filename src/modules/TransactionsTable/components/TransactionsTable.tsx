import React, { useCallback, useContext, useEffect, useState } from 'react'
import axios from 'axios'

import { API_URL } from '../../../config/constants'
import { Transaction } from '../types/Transaction'
import { Transactions } from './Transactions'
import { Pagination } from '../../Pagination/components/Pagination'
import { Context } from '../../../state/state'
import '../styles/TransactionsTable.scss'


export const TransactionsTable: React.FC = () => {
   const [currentPage, setCurrentPage] = useState<number>(1)
   const [transactionsPerPage] = useState<number>(10)

   const {state, dispatch} = useContext<any>(Context)

   useEffect(() => {
      const fetchTransactions = async () => {
         dispatch({type: 'setLoading', payload: true})
         const responseTransactions: Transaction[] = await axios
            .get(`${API_URL}/transactions`)
            .then(data => data.data)

         dispatch({type: 'fillTransactions', payload: responseTransactions})
         dispatch({type: 'setLoading', payload: false})
      }

      fetchTransactions()
   }, [])

   const lastTransactionIndex = currentPage * transactionsPerPage
   const firstTransactionIndex = lastTransactionIndex - transactionsPerPage
   const currentTransaction = state.transactions.slice(firstTransactionIndex, lastTransactionIndex)

   const paginate = useCallback((pageNumber: number): void => setCurrentPage(pageNumber), [])

   return (
      <>
         <table className="table">
            <thead>
            <tr>
               <th>Block Number</th>
               <th>Transaction ID</th>
               <th>Sender address</th>
               <th>Recipient's address</th>
               <th>Block confirmations</th>
               <th>Date</th>
               <th>Value</th>
               <th>Transaction Fee</th>
            </tr>
            </thead>
            <tbody>
            <Transactions transactions={currentTransaction} isLoading={state.isLoading}/>
            </tbody>
         </table>
         {state.isLoading ?
            null :
            <div className="flex-center">
               <Pagination
                  transactionsPerPage={transactionsPerPage}
                  totalTransactions={state.transactions.length}
                  paginate={paginate}
               />
            </div>
         }
      </>
   )
}
