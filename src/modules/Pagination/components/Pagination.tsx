import React, { MouseEventHandler } from 'react'
import '../styles/Pagination.scss'


type propTypes = {
   transactionsPerPage: number
   totalTransactions: number
   paginate: (arg: number) => void
}

export const Pagination = ({transactionsPerPage, totalTransactions, paginate}: propTypes) => {
   const pageNumbers = []

   for (let i = 1; i <= Math.ceil((totalTransactions / transactionsPerPage)); i++) {
      pageNumbers.push(i)
   }

   const onClick: MouseEventHandler = ({target}: any) => paginate(+target.innerText)

   return (
      <div className="page-numbers-wrapper">
         {pageNumbers?.map(number => (
            <span key={number} className="page-number" onClick={onClick}>{number}</span>
         ))}
      </div>
   )
}