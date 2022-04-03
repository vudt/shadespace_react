import React from "react";
import type { NextPage } from 'next'
import BreadCrumb from "../components/partials/breadcrumb";
import MetaTag from "../components/meta-tag";
import Loading from '../components/loading';
import BottomButton from "../components/partials/bottom-button";
import { useRouter } from "next/router";
import PageContent from "../components/partials/page-content";
import useFetchData from "../hooks/fetch-data";
import styled from 'styled-components';
import LoopMaterial from "../components/partials/loop-material";
import { TermItem } from "../interfaces/page";
import withAuth from "../HOCs/withAuth";
import SPAlert from "../components/error-message";
import pageAPI from "../services/page";

interface PageProps {
  page_meta: TermItem
}

const FilterMaterial: NextPage<PageProps> = (props) => {
  const router = useRouter()
  const api_filter_material  = '/api/app/get_tcb_re_group_collection_material'
  const response = useFetchData(api_filter_material, 'FILTER_METERIAL', router.query)

  const breadcrumb = [
    {name: "Free Swatches", link: '/free-swatches'},
    {name: props.page_meta?.name, link: ''}
  ]

  const DisplayContent = () => {
    if (response.isFetching || !response.data) return <Loading />
    if (response.data.length === 0) return <SPAlert text="Data not found." />
    return <LoopMaterial data={response.data} />
  }

  return (
    <>
      <MetaTag title={props.page_meta?.name} description={props.page_meta?.name} />
      <BreadCrumb breadcrumb={breadcrumb} />
      <PageContent title={props.page_meta?.name} />
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
      term_id: context.query.term_id,
      page_meta: data
    }
  }
}

export default withAuth(FilterMaterial)