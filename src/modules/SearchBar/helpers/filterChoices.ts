export type FilterChoices = {
   value: string
   name: string
}

export const filterChoices: Array<FilterChoices> = [
   {value: 'from', name: 'Sender Address'},
   {value: 'to', name: 'Recipient\'s Address'},
   {value: 'hash', name: 'Transaction ID'},
   {value: 'blockNumber', name: 'Block Number (hex)'},
   {value: 'blockNumberInt', name: 'Block Number (int)'},
]