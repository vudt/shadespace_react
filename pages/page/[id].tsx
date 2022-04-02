import React, { useEffect, useState } from "react";
import type { NextPage } from 'next'
import pageAPI from "../../services/page";
import useFetchData from "../../hooks/fetch-data";
import BreadCrumb from "../../components/partials/breadcrumb";
import PageContent from "../../components/partials/page-content";
import Loading from '../../components/loading';
import BottomButton from "../../components/partials/bottom-button";
import { PageMeta } from "../../interfaces/page";
import withAuth from "../../HOCs/withAuth";
import MetaTag from "../../components/meta-tag";


interface PageProps {
  id: number,
  pageMeta: PageMeta
}

const Page: NextPage<PageProps> = ({id, pageMeta}) => {

  const url_page_info = `api/app/get_page_info`
  const pageContent = useFetchData(url_page_info, 'FETCH_PAGE', id)
  const breadcrumb = [{name: pageMeta.post_title, link: ''}]
  
  return (
    <>
      <MetaTag title={pageMeta.post_title} description={pageMeta.post_title} />
      <BreadCrumb breadcrumb={breadcrumb} />
      { pageContent.isFetching ? (
        <Loading />
      ) : (
        <PageContent title={pageMeta.post_title} description={pageMeta.post_content} content={pageContent.data} />
      )}
      
      <BottomButton />
    </>
  )
}

export async function getServerSideProps(context: any) {
  const url_api: string = `api/app/get_page_detail/?pageid=${context.params.id}`
  const response = await pageAPI.request(url_api)
  let data: any = null
  if (response.data) {
    data = JSON.parse(response.data)
  }
  return {
    props: {
      id: context.params.id,
      pageMeta: data
    }
  }
}

export default withAuth(Page);