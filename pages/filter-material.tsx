import React from "react";
import type { NextPage } from 'next'
import BreadCrumb from "../components/partials/breadcrumb";
import MetaTag from "../components/meta-tag";
import Loading from '../components/loading';
import BottomButton from "../components/partials/bottom-button";
import PageContent from "../components/partials/page-content";
import useFetchData from "../hooks/fetch-data";
import LoopMaterial from "../components/partials/loop-material";
import { TermItem } from "../interfaces/page";
import { MaterialInfo, SampleItem } from "../interfaces/material";
import withAuth from "../HOCs/withAuth";
import SPAlert from "../components/error-message";
import pageAPI from "../services/page";

interface MaterialData {
  info: MaterialInfo,
  swatches: SampleItem[]
}

interface PageProps {
  collection_id: number
  page_meta: TermItem
}

const FilterMaterial: NextPage<PageProps> = ({collection_id, page_meta}) => {
  
  const breadcrumb = [
    {name: "Free Swatches", link: '/free-swatches'},
    {name: page_meta?.name, link: ''}
  ]

  const response = useFetchData<MaterialData[]>(`/api/app/get_tcb_re_group_collection_material?termid=${collection_id}`)

  const DisplayContent = () => {
    if (response.state.isFetching || !response.state.data) return <Loading />
    if (response.state.data.length === 0) return <SPAlert text="Data not found." />
    return <LoopMaterial data={response.state.data} />
  }

  return (
    <>
      <MetaTag title={page_meta?.name} description={page_meta?.name} />
      <BreadCrumb breadcrumb={breadcrumb} />
      <PageContent title={page_meta?.name} />
      <DisplayContent />
      <BottomButton />
    </>
  )
}

export async function getServerSideProps(context: any) {
  const url_api: string = `/api/app/get_re_group_collection_term?termid=${context.query.term_id}`
  const response = await pageAPI.request(url_api)
  let data: any = null
  if (response.data) {
    data = JSON.parse(response.data)
  }
  return {
    props: {
      collection_id: context.query.collection_id,
      page_meta: data
    }
  }
}

export default withAuth(FilterMaterial)