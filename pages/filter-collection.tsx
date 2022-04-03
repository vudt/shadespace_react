import React from "react";
import type { NextPage } from 'next'
import BreadCrumb from "../components/partials/breadcrumb";
import MetaTag from "../components/meta-tag";
import Loading from '../components/loading';
import BottomButton from "../components/partials/bottom-button";
import useFetchData from "../hooks/fetch-data";
import { useRouter } from "next/router";
import withAuth from "../HOCs/withAuth";
import SPAlert from "../components/error-message";
import { ICollectionItem } from "../interfaces/page";
import LoopFilterCollection from "../components/partials/loop-filter-collection";

const FilterCollection: NextPage = () => {
  const router = useRouter()
  const breadcrumb = [{name: "Free Swatches", link: '/free-swatches'}]
  const base_URL_API = '/api/app/get_tcb_re_group_collection_filter'
  const response = useFetchData(base_URL_API, 'FILTER_COLLECTION', router.query)

  const DisplayContent = () => {
    if (response.isFetching || !response.data) return <Loading />
    const listCollections: ICollectionItem[] = response.data
    if (listCollections.length === 0) return <SPAlert text="Collection not found." />
    return <LoopFilterCollection data={listCollections} />
  }
  
  return (
    <>
      <MetaTag title="Filter Collection - Shade Space" description="Filter Collection - Shade Space" />
      <BreadCrumb breadcrumb={breadcrumb} />
      <DisplayContent />
      <BottomButton />
    </>
  )
}

export default withAuth(FilterCollection)