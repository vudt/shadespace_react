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
  const [config, setConfig] = useState(options)
  const executeFetch = (url: string) => {setEndPoint(url)}
  const [state, dispatch] = useReducer<Reducer<State<T>, ActionTypes<T>>>(dataFetchReducer, initialState);
  
  useEffect(() => {
    let lock = false
    const handleRequest = async() => {
      dispatch({type: 'FETCH_INIT'})
      const response = await pageAPI.request(endPoint, config)
      if (response.data) {
        if (!lock) dispatch({type: 'FETCH_SUCCESS', payload: JSON.parse(response.data)})
      } else {
        if (!lock) {
          dispatch({type: 'FETCH_FAILURE', payload: response.description || response.message})
          addToast(response.description || response.message, { appearance: 'error', autoDismiss: true });
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
  

  return {state, executeFetch, setConfig}
}

export default useFetchData;