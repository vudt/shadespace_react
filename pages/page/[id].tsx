import React, { useEffect } from "react";
import type { NextPage } from 'next'
import pageAPI from "../../services/page";
import useFetchData from "../../hooks/fetch-data";
import BreadCrumb from "../../components/partials/breadcrumb";
import PageContent from "../../components/partials/page-content";
import PageInfo from "../../components/partials/page/page-info";
import PageBody from "../../components/partials/page/page-body";
import Loading from '../../components/loading';
import BottomButton from "../../components/partials/bottom-button";
import { PageMeta } from "../../interfaces/page";
import withAuth from "../../HOCs/withAuth";
import MetaTag from "../../components/meta-tag";
import { useRouter } from "next/router";


interface PageProps {
  id: number,
  pageMeta: PageMeta
}

const Page: NextPage<PageProps> = ({id, pageMeta}) => {
  const breadcrumb = [{name: pageMeta.post_title, link: ''}]
  const response = useFetchData<string | ''>(`api/app/get_page_info?pageid=${id}`)
  const router = useRouter()

  useEffect(() => {
    response.executeFetch(`api/app/get_page_info?pageid=${router.query.id}`)
  }, [router.query])

  const DisplayContent = () => {
    if (response.state.isFetching) return <Loading />
    return <PageBody content={response.state.data!} />
  }

  return (
    <>
      <MetaTag title={pageMeta.post_title} description={pageMeta.post_title} />
      <BreadCrumb breadcrumb={breadcrumb} />
      <PageInfo {...pageMeta} />
      <DisplayContent />
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