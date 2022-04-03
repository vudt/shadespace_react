import React from "react";
import type { NextPage } from 'next'
import pageAPI from "../services/page";
import BreadCrumb from "../components/partials/breadcrumb";
import PageContent from "../components/partials/page-content";
import Loading from '../components/loading';
import MetaTag from "../components/meta-tag";
import LoopShipping from "../components/partials/loop-shipping";
import { IContentShipping } from "../interfaces/page";
import BottomButton from "../components/partials/bottom-button";
import { PageMeta } from "../interfaces/page";
import useFetchData from "../hooks/fetch-data";


interface PageProps {
  page_meta: PageMeta
}

const ShippingHandling: NextPage<PageProps> = ({page_meta}) => {

  const breadcrumb = [{name: page_meta.post_title, link: ''}]
  const response = useFetchData('api/app/get_shipping_handling_info/?pageid=1009', 'FETCH_SHIPPING_HANDLING')

  const DisplayContent = () => {
    if (response.isFetching || !response.data) return <Loading />
    const data: IContentShipping[] = response.data
    if (data.length === 0) return null
    return <LoopShipping data={data} />

  }
    
  return (
    <>
      <MetaTag title={page_meta.post_title} description={page_meta.post_title} />
      <BreadCrumb breadcrumb={breadcrumb} />
      <PageContent title={page_meta.post_title} description={page_meta.post_content}  />
      <DisplayContent />
      <BottomButton />
    </>
  )
}

export async function getServerSideProps(context: any) {
  const url_api: string = `api/app/get_page_detail/?pageid=1009`
  const response = await pageAPI.request(url_api)
  let data: any = null
  if (response.data) {
    data = JSON.parse(response.data)
  }
  return {
    props: {
      page_meta: data
    }
  }
}


export default ShippingHandling;