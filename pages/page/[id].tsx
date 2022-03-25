import React, { useEffect, useState } from "react";
import type { NextPage } from 'next'
import pageAPI from "../../services/page";
import useFetchData from "../../hooks/fetch-data";
import BreadCrumb from "../../components/partials/breadcrumb";
import PageContent from "../../components/partials/page-content";
import Loading from '../../components/loading';
import BottomButton from "../../components/partials/bottom-button";
import { PageMeta } from "../../interfaces/page";
import MetaTag from "../../components/meta-tag";


interface PageProps {
  id: number,
  pageMeta: PageMeta
}

const Page: NextPage<PageProps> = ({id, pageMeta}) => {

  const url_page_info = `api/app/get_page_info`
  const pageContent = useFetchData(url_page_info, 'FETCH_PAGE', id)
  const breadcrumb = [{name: pageMeta.post_title, link: ''}]

  // useEffect(() => {
  //   (async () => {
  //     const url_page_detail = `api/app/get_page_detail/?pageid=${id}`
  //     const res_page_detail = pageAPI.request(url_page_detail)
  //     const url_page_info = `api/app/get_page_info/?pageid=${id}`
  //     const res_page_info = pageAPI.request(url_page_info)
  //     const response = await Promise.all([res_page_detail, res_page_info])
  //     console.log(response)
  //     if (response) {
  //       if (response[0].data) {
  //         setPageMeta(JSON.parse(response[0].data))
  //       }
  //       if (response[1].data) {
  //         setPageContent(JSON.parse(response[1].data))
  //       }
  //     }
  //   })()
  // }, [id])


  if (pageContent.isFetching) {
    return (
      <>
        <MetaTag title={pageMeta.post_title} description={pageMeta.post_title} />
        <Loading />
      </>
    )
  }
  
  return (
    <>
      <MetaTag title={pageMeta.post_title} description={pageMeta.post_title} />
      <BreadCrumb breadcrumb={breadcrumb} />
      <PageContent title={pageMeta.post_title} description={pageMeta.post_content} content={pageContent.data} />
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

export default Page;