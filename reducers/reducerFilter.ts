import { StrictMode } from "react"

enum ActionTypes {
  FETCH_INIT = 'FETCH_INIT',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  FETCH_FAILURE = 'FETCH_FAILURE'
}

interface TypeAction<T> {
  type: string,
  payload?: T
}


interface TypeState<T> {
  isFetching: boolean,
  data: T | null
  message: string
}

const initialState = {
  isFetching: false,
  data: null,
  message: ''
} 

const dataFetchReducer = <T extends any>(state: TypeState<T>, action: TypeAction<T>) : TypeState<T> => {
  switch (action.type) {
    case ActionTypes.FETCH_INIT: 
      return {...state, isFetching: true}
    case ActionTypes.FETCH_SUCCESS:
      return {...state, isFetching: false, data: action.payload!}
    case ActionTypes.FETCH_FAILURE:
      // return {...state, isFetching: false, message: action.payload}
      return {...state, data: null, isFetching: false, message: 'There has been a critical error on this website…arn more about troubleshooting WordPress.'}
    default:
      return state
  }
}


// const dataFetchReducer = (state = initialState, action: TypeAction) : TypeState => {
//   switch (action.type) {
//     case ActionTypes.FETCH_INIT: 
//       return {...state, isFetching: true}
//     case ActionTypes.FETCH_SUCCESS:
//       return {...state, isFetching: false, data: action.payload}
//     case ActionTypes.FETCH_FAILURE:
//       // return {...state, isFetching: false, message: action.payload}
//       return {...state, isFetching: false, message: 'There has been a critical error on this website…arn more about troubleshooting WordPress.'}
//     default:
//       return state
//   }
// }

export default dataFetchReducer