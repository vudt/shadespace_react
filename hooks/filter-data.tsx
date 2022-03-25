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

function useFilterData(url: string, fetch_type: string, query?: {}) {
  const router = useRouter()
  const { addToast } = useToasts();
  const [state, dispatch] = useReducer(dataFetchReducer, initialState)
  useEffect(() => {
    (async () => {
      switch (fetch_type) {
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

async function handleRequest(urlAPI: string, dispatch: any, addToast: any) {
  try {
    dispatch({type: 'FETCH_INIT'})
    const response = await pageAPI.request(urlAPI)
    if (response.data) {
      dispatch({type: 'FETCH_SUCCESS', payload: JSON.parse(response.data)})
    } else {
      dispatch({type: 'FETCH_FAILURE', payload: response.description})
      addToast('There has been a critical error on this website…arn more about troubleshooting WordPress.', { appearance: 'error', autoDismiss: false });
    }
  } catch (error) {
    console.log(error)
  }
}

export default useFilterData;