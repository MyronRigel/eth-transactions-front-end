import React from 'react'
import { Transaction } from '../types/Transaction'


type propTypes = {
   transactions: Transaction[]
   isLoading: boolean
}

export const Transactions = ({transactions, isLoading}: propTypes) => {
   if (!transactions.length && !isLoading) return <td><h3>No records</h3></td>

   return (
      <>
         {!isLoading ? transactions?.map(transaction => (
            <tr key={transaction.transaction_id}>
               <td>{transaction.block_number}</td>
               <td>{transaction.transaction_id}</td>
               <td>{transaction.sender_address}</td>
               <td>{transaction.recipient_address}</td>
               <td>{transaction.block_confirmations}</td>
               <td>{transaction.date}</td>
               <td>{transaction.value}</td>
               <td>{transaction.transaction_fee}</td>
            </tr>
         ))
            :
            <tr>
               <td><h3>Loading...</h3></td>
            </tr>
         }
      </>
   )
}
