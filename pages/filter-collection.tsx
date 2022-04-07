import React from "react";
import type { NextPage } from 'next'
import BreadCrumb from "../components/partials/breadcrumb";
import MetaTag from "../components/meta-tag";
import LoadingRectangle from "../components/partials/skeleton/loading-rectangle";
import BottomButton from "../components/partials/bottom-button";
import useFetchData from "../hooks/fetch-data";
import withAuth from "../HOCs/withAuth";
import SPAlert from "../components/error-message";
import { ICollectionItem } from "../interfaces/page";
import LoopFilterCollection from "../components/partials/loop-filter-collection";


interface PageProps {
  term_id: any,
}

const FilterCollection: NextPage<PageProps> = ({term_id}) => {
  const breadcrumb = [{name: "Free Swatches", link: '/free-swatches'}]
  const response = useFetchData<ICollectionItem[]>(`/api/app/get_tcb_re_group_collection_filter?termid=${term_id}`)
  
  const DisplayContent = () => {
    if (response.state.isFetching || !response.state.data) return <LoadingRectangle count={2} />
    if (response.state.data.length === 0) return <SPAlert text="Collection not found." />
    return <LoopFilterCollection data={response.state.data} />
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

export async function getServerSideProps(context: any) {
  return {
    props: {term_id: context.query.term_id}
  }
}