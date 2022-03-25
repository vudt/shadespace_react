import React, { useEffect, useReducer, useState } from "react";
import type { NextPage } from 'next'
import BreadCrumb from "../components/partials/breadcrumb";
import MetaTag from "../components/meta-tag";
import Loading from '../components/loading';
import BottomButton from "../components/partials/bottom-button";
import useFetchData from "../hooks/fetch-data";
import { useRouter } from "next/router";
import styled from 'styled-components';
import LoopFilterCollection from "../components/partials/loop-filter-collection";

const FilterCollection: NextPage = () => {
  const router = useRouter()
  const breadcrumb = [{name: "Free Swatches", link: '/free-swatches'}]
  const base_URL_API = '/api/app/get_tcb_re_group_collection_filter'
  const collections = useFetchData(base_URL_API, 'FILTER_COLLECTION', router.query)

  if (!collections.data) {
    return (
      <>
        <MetaTag title="Filter Collection - Shade Space" description="Filter Collection - Shade Space" />
        <Loading />
      </>
    )
  }
  
  return (
    <>
      <MetaTag title="Filter Collection - Shade Space" description="Filter Collection - Shade Space" />
      <BreadCrumb breadcrumb={breadcrumb} />
      {collections.data.length > 0 ? (
        <LoopFilterCollection data={collections.data} />
      ) : (
        <VAlert>Collection not found.</VAlert>
      )}
      <BottomButton />
    </>
  )
}

const VAlert = styled.div `
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  width: 95%;
  margin: 4% auto;
  padding-top: 10px;
  padding-bottom: 10px;
`

export default FilterCollection