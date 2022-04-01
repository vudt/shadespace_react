import React, { useEffect, useReducer, useState } from "react";
import type { NextPage } from 'next'
import BreadCrumb from "../components/partials/breadcrumb";
import MetaTag from "../components/meta-tag";
import Loading from '../components/loading';
import BottomButton from "../components/partials/bottom-button";
import useFetchData from "../hooks/fetch-data";
import { useRouter } from "next/router";
import styled from 'styled-components';
import withAuth from "../HOCs/withAuth";
import SPAlert from "../components/error-message";
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
        <SPAlert text="Collection not found." />
      )}
      <BottomButton />
    </>
  )
}

export default withAuth(FilterCollection)