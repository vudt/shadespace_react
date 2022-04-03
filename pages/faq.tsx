import React from "react";
import type { NextPage } from 'next'
import pageAPI from "../services/page";
import BreadCrumb from "../components/partials/breadcrumb";
import Loading from '../components/loading';
import LoopFaq from "../components/partials/loop-faq";
import BottomButton from "../components/partials/bottom-button";
import PageContent from "../components/partials/page-content";
import useFetchData from "../hooks/fetch-data";
import withAuth from "../HOCs/withAuth";
import MetaTag from "../components/meta-tag";
import {PageMeta, IFaq} from "../interfaces/page";
import SPAlert from "../components/error-message";

interface PageProps {
  page_meta: PageMeta
}

const Faq: NextPage<PageProps> = ({page_meta}) => {
  const breadcrumb = [{name: page_meta.post_title, link: ''}]
  const response = useFetchData('api/app/get_faq_info', 'FETCH_FAQ')

  const DisplayContent = () => {
    if (response.isFetching || !response.data) return <Loading />
    const listFaq: IFaq[] = response.data
    if (listFaq.length === 0) return <SPAlert text="Data not found." />
    return <LoopFaq data={listFaq} />
  }

  return (
    <>
      <MetaTag title={page_meta.post_title} description={page_meta.post_title} />
      <BreadCrumb breadcrumb={breadcrumb} />
      <PageContent title={page_meta.post_title} />
      <DisplayContent />
      <BottomButton />
    </>
  )
}

export async function getServerSideProps(context: any) {
  const url_api = `api/app/get_page_detail/?pageid=1024`
  const response = await pageAPI.request(url_api)
  let data: any = null
  if (response.data) {
    data = JSON.parse(response.data)
  }
  return {
    props: {page_meta: data}
  }
}

export default withAuth(Faq);