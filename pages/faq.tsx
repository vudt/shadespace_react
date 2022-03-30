import React, { useEffect, useState } from "react";
import Head from 'next/head';
import type { NextPage } from 'next'
import pageAPI from "../services/page";
import BreadCrumb from "../components/partials/breadcrumb";
import Loading from '../components/loading';
import LoopFaq from "../components/partials/loop-faq";
import BottomButton from "../components/partials/bottom-button";
import PageContent from "../components/partials/page-content";
import withAuth from "../HOCs/withAuth";
import { PageMeta, IFaq} from "../interfaces/page";


interface PageProps {
  id: number,
  page_meta: PageMeta
}

const Faq: NextPage<PageProps> = ({id, page_meta}) => {
  const [listFaq, setListFaq] = useState<IFaq[]>([])
  const breadcrumb = [
    {name: 'Home', link: '/mobile'},
    {name: page_meta.post_title, link: ''}
  ]

  useEffect(() => {
    (async () => {
      const fetchUrl: string = `api/app/get_faq_info`
      const response = await pageAPI.request(fetchUrl)
      if (response.data) {
        setListFaq(JSON.parse(response.data))
      }
    })()
  }, [id])

  

  if (listFaq.length == 0) {
    return (
      <>
        <Head>
          <title>{page_meta.post_title} - Shade Space</title>
          <meta name="description" content={page_meta.post_title} />
        </Head>
        <Loading />
        <BreadCrumb breadcrumb={breadcrumb} />
        <PageContent title={page_meta.post_title} />
      </>
    )
  }
  
  return (
    <>
      <Head>
        <title>{page_meta.post_title} - Shade Space</title>
        <meta name="description" content={page_meta.post_title} />
      </Head>
      <BreadCrumb breadcrumb={breadcrumb} />
      <PageContent title={page_meta.post_title} />
      <LoopFaq data={listFaq} />
      <BottomButton />
    </>
  )
}

export async function getServerSideProps(context: any) {
  const url_api: string = `api/app/get_page_detail/?pageid=1024`
  const response = await pageAPI.request(url_api)
  let data: any = null
  if (response.data) {
    data = JSON.parse(response.data)
  }
  return {
    props: {
      id: 0,
      page_meta: data
    }
  }
}

export default withAuth(Faq);