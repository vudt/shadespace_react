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
import { GridItem, TermItem, PageMeta } from "../interfaces/page";
import pageAPI from "../services/page";

interface PageProps {
  page_meta: TermItem
}

const FilterMaterial: NextPage<PageProps> = (props) => {
  const router = useRouter()
  const api_filter_material  = '/api/app/get_tcb_re_group_collection_material'
  const materials = useFetchData(api_filter_material, 'FILTER_METERIAL', router.query)
  // const api_get_term = '/api/app/get_re_group_collection_term'
  // const term = useFetchData(api_get_term, 'FETCH_TERM', router.query)

  const breadcrumb = [
    {name: "Free Swatches", link: '/free-swatches'},
    {name: props.page_meta?.name, link: ''}
  ]

  if (!materials.data) {
    return (
      <>
        <MetaTag title={props.page_meta?.name} description={props.page_meta?.name} />
        <Loading />
      </>
    )
  }

  return (
    <>
      <MetaTag title={props.page_meta?.name} description={props.page_meta?.name} />
      <BreadCrumb breadcrumb={breadcrumb} />
      <PageContent title={props.page_meta?.name} />
      {materials.data.length > 0 ? (
        <LoopMaterial data={materials.data} />
      ) : (
        <VAlert>Material not found.</VAlert>
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

export default FilterMaterial