import React, { useEffect, useReducer } from "react";
import dataFetchReducer from "../reducers/reducerFilter";
import pageAPI from "../services/page";
import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";

const initialState = {
  isFetching: false,
  data: null,
  message: ''
}

function useFetchData(url: string, fetch_type: string, query?: {}) {
  const router = useRouter()
  const { addToast } = useToasts();
  const [state, dispatch] = useReducer(dataFetchReducer, initialState)
  useEffect(() => {
    (async () => {
      switch (fetch_type) {
        case 'FETCH_PAGE':
          if (router.query.id) {
            const urlAPI = `${url}?pageid=${router.query.id}`
            handleRequest(urlAPI, dispatch, addToast)
          }
          break;
        case 'FETCH_TERM': 
          if (router.query.term_id) {
            const urlAPI = `${url}?termid=${router.query.term_id}`
            handleRequest(urlAPI, dispatch, addToast)
          }
          break;
        case 'FETCH_MEASURE_INFO':
          handleRequest(url, dispatch, addToast)
          break;
        case 'GET_COLLECTION': 
          if (router.query.id) {
            const urlAPI = `${url}?termid=${router.query.id}`
            handleRequest(urlAPI, dispatch, addToast)
          }
          break;
        case 'GET_WINDOW_TREATMENTS':
          handleRequest(url, dispatch, addToast)
          break;
        case 'FETCH_WINDOW_TREATMENT':
          if (router.query.id) {
            const urlAPI = `${url}?pageid=${router.query.id}`
            handleRequest(urlAPI, dispatch, addToast)
          }
          break;
        case 'FETCH_CUSTOMER_SERVICE':
          handleRequest(url, dispatch, addToast)
          break;
        case 'FETCH_FAQ':
          handleRequest(url, dispatch, addToast)
          break;
        case 'FETCH_SHIPPING_HANDLING':
          handleRequest(url, dispatch, addToast)
          break;
        case 'LIST_COLLECTIONS': 
          handleRequest(url, dispatch, addToast)
          break;
        case 'FILTER_COLLECTION':
          if (router.query.term_id) {
            const urlAPI = `${url}?termid=${router.query.term_id}`
            handleRequest(urlAPI, dispatch, addToast)
          }
          break;
        case 'FILTER_METERIAL':
          if (router.query.collection_id) {
            const urlAPI = `${url}?termid=${router.query.collection_id}`
            handleRequest(urlAPI, dispatch, addToast)
          }
          break;
        default:
          break;
      }
    })();
  }, [query])

  return state
}

async function handleRequest(endpoint: string, dispatch: any, addToast?: any) {
  try {
    dispatch({type: 'FETCH_INIT'})
    console.log('FETCH_INIT')
    const response = await pageAPI.request(endpoint)
    if (response.data) {
      console.log('FETCH_SUCCESS')
      dispatch({type: 'FETCH_SUCCESS', payload: JSON.parse(response.data)})
    } else {
      dispatch({type: 'FETCH_FAILURE', payload: response.description})
      addToast(response.description, { appearance: 'error', autoDismiss: false });
    }
  } catch (error) {
    console.log(error)
  }
}

export default useFetchData;