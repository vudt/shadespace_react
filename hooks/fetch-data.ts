import React, { Reducer, useEffect, useReducer, useState } from "react";
import dataFetchReducer from "../reducers/reducerFilter";
import pageAPI from "../services/page";
import { useToasts } from "react-toast-notifications";



interface State<T> {
  isFetching: boolean,
  data: T | null
  message: string
}


const initialState = {
  isFetching: false,
  data: null,
  message: ''
}

interface ActionTypes<T> {
  type: string,
  payload?: T
}

function useFetchData<T>(url: string, options?: {}) {
  const { addToast } = useToasts();
  const [endPoint, setEndPoint] = useState(url)
  const executeFetch = (url: string) => {setEndPoint(url)}
  const [state, dispatch] = useReducer<Reducer<State<T>, ActionTypes<T>>>(dataFetchReducer, initialState);
  
  useEffect(() => {
    let lock = false
    console.log(endPoint)
    const handleRequest = async() => {
      dispatch({type: 'FETCH_INIT'})
      const response = await pageAPI.request(endPoint, options)
      if (response.data) {
        if (!lock) dispatch({type: 'FETCH_SUCCESS', payload: JSON.parse(response.data)})
      } else {
        if (!lock) {
          console.log(response)
          dispatch({type: 'FETCH_FAILURE', payload: response.description || response.message})
          addToast(response.description || response.message, { appearance: 'error', autoDismiss: false });
        }
      }
    }

    if (endPoint) { 
      handleRequest() 
    }
    
    return () => {
      lock = true
    }
  }, [endPoint])
  

  return {state, executeFetch}
  // return state
}

// function useFetchData(url: string, fetch_type?: string, query?: {}) {
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
//   }, [url])
  
//   return state
// }

export default useFetchData;