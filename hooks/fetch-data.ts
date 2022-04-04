import React, { useEffect, useReducer } from "react";
import dataFetchReducer from "../reducers/reducerFilter";
import pageAPI from "../services/page";
import { useToasts } from "react-toast-notifications";

const initialState = {
  isFetching: false,
  data: null,
  message: ''
}

function useFetchData(url: string, fetch_type?: string, query?: {}) {
  const { addToast } = useToasts();
  const [state, dispatch] = useReducer(dataFetchReducer, initialState)
  useEffect(() => {
    (async () => {
      dispatch({type: 'FETCH_INIT'})
      const response = await pageAPI.request(url)
      if (response.data) {
        dispatch({type: 'FETCH_SUCCESS', payload: JSON.parse(response.data)})
      } else {
        dispatch({type: 'FETCH_FAILURE', payload: response.description})
        addToast(response.description, { appearance: 'error', autoDismiss: false });
      }
    })();
  }, [url])
  
  return state
}

// function useFetchData(url: string, fetch_type: string, query?: {}) {
//   const { addToast } = useToasts();
//   const [state, dispatch] = useReducer(dataFetchReducer, initialState)
//   useEffect(() => {
//     (async () => {
//       dispatch({type: 'FETCH_INIT'})
//       const response = await pageAPI.request(url)
//       if (response.data) {
//         dispatch({type: 'FETCH_SUCCESS', payload: JSON.parse(response.data)})
//       } else {
//         dispatch({type: 'FETCH_FAILURE', payload: response.description})
//         addToast(response.description, { appearance: 'error', autoDismiss: false });
//       }
//     })();
//   }, [query])
  
//   return state
// }

export default useFetchData;