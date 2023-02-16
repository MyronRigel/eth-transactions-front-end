export type State = {
   transactions: Array<object>
   isLoading: boolean
}

export type Action = {
   type: string | number
   payload: any
}