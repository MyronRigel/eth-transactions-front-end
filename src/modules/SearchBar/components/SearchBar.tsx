import React, { ChangeEventHandler, MutableRefObject, ReactEventHandler, useContext, useRef, useState } from 'react'
import '../styles/SearchBar.scss'
import { FilterChoices, filterChoices } from '../helpers/filterChoices'
import { Context } from '../../../state/state'
import { Transaction } from '../../TransactionsTable/types/Transaction'
import axios from 'axios'
import { API_URL } from '../../../config/constants'


export const SearchBar: React.FC = () => {
   const [searchValue, setSearchValue] = useState<string>('')
   const [searchBy, setSearchBy] = useState<string>(filterChoices[0].value)
   const {dispatch} = useContext<any>(Context)
   const ref: any = useRef()


   const onChange: ChangeEventHandler<HTMLInputElement> = ({target}: any) => setSearchValue(target.value)
   const onSelect: ReactEventHandler<HTMLSelectElement> = ({target}: any) => setSearchBy(target.value)
   const onClick = async () => {

      if (!searchValue.trim()) {
         ref.current.innerHTML = 'Enter value first'
         return
      } else {
         ref.current.innerHTML = 'Search'
      }

      dispatch({type: 'setLoading', payload: true})
      const responseTransactions: Transaction[] = await axios
         .get(`${API_URL}/transactions/?search_by=${searchBy}&search_value=${searchValue}`)
         .then(data => data.data)

      dispatch({type: 'fillTransactions', payload: responseTransactions})
      dispatch({type: 'setLoading', payload: false})
   }

   return (
      <div className="flex-align-center">
         <div className="search-wrapper">
            <input
               type="text"
               className="search-input"
               placeholder="Search..."
               value={searchValue}
               onChange={onChange}
            />
            <div className="splitter"/>
            <select
               onChange={onSelect}
            >
               {filterChoices.map(({value, name}: FilterChoices) => (
                  <option value={value} key={value}>{name}</option>
               ))}
            </select>
         </div>
         <button
            className="search-button"
            type="button"
            onClick={onClick}
            ref={ref}
         >
            <span>Search</span>
         </button>
      </div>
   )
}