import React, { useEffect } from "react";
import type { NextPage } from 'next'
import pageAPI from "../../services/page";
import BreadCrumb from "../../components/partials/breadcrumb";
import PageContent from "../../components/partials/page-content";
import Loading from '../../components/loading';
import BottomButton from "../../components/partials/bottom-button";
import GridGalleries from "../../components/partials/grid-galleries";
import { TermMeta, GalleryItem } from "../../interfaces/page";
import MetaTag from "../../components/meta-tag";
import withAuth from "../../HOCs/withAuth";
import useFetchData from "../../hooks/fetch-data";
import SPAlert from "../../components/error-message";
import { useRouter } from "next/router";

interface PageProps {
  id: number,
  pageMeta: TermMeta
}

const SinglePortfolio: NextPage<PageProps> = ({id, pageMeta}) => {
  const breadcrumb = [{name: 'Portfolio', link: '/portfolio'}, {name: pageMeta.name, link: ''}]
  const response = useFetchData<GalleryItem[]>(`api/app/get_portfolio_slide_info?termid=${id}`)
  const router = useRouter()

  useEffect(() => {
    response.executeFetch(`api/app/get_portfolio_slide_info?termid=${router.query.id}`)
  }, [router.query])

  const DisplayContent = () => {
    if (response.state.isFetching || !response.state.data) return <Loading />
    if (response.state.data.length === 0) return <SPAlert text="Data not found." />
    return <GridGalleries data={response.state.data} />
  }

  return (
    <>
      <MetaTag title={pageMeta?.name} description={pageMeta?.name} />
      <BreadCrumb breadcrumb={breadcrumb} />
      <PageContent title={pageMeta?.name} description={pageMeta?.description} />
      <DisplayContent />
      <BottomButton />
    </>
  )
}

export async function getServerSideProps(context: any) {
  const url_api: string = `api/app/get_re_group_collection_term/?termid=${context.params.id}`
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

export default withAuth(SinglePortfolio);